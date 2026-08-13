// PDF-samenvatting (briefing §8.3).
//
// Aanpak: de tekst wordt native door jsPDF gezet — dus echte, scherpe letters in
// plaats van een schermafbeelding — en alleen het klavertje gaat als afbeelding
// mee. Die afbeelding komt uit <CloverPrintView>, die dezelfde geometrie en
// eindscores gebruikt als het scherm maar zonder animatie en zonder blur.

import { jsPDF } from "jspdf";
import { brand, CONTACT_INFO } from "../config/brand";
import { pdf as pdfCopy, cta as ctaCopy } from "../config/copy";
import { hexToRgb, printLeafColor } from "./colors";

const PAGE = { width: 210, height: 297 };
const MARGIN = 18;
const CONTENT_WIDTH = PAGE.width - MARGIN * 2;

const INK = "#1C1917";
const INK_SOFT = "#57534E";
const INK_MUTED = "#78716C";
const HAIRLINE = "#E7E5E4";

/**
 * Zet een SVG-element om naar een PNG-data-URL.
 * Bewust zonder html2canvas: de SVG bevat geen externe verwijzingen, dus een
 * serialisatie naar data-URL plus canvas is voldoende én een stuk lichter.
 *
 * @param {SVGSVGElement} svgElement
 * @param {number} scale oversampling voor printkwaliteit
 */
export async function svgToPngDataUrl(svgElement, scale = 3) {
  const clone = svgElement.cloneNode(true);
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  const source = new XMLSerializer().serializeToString(clone);
  const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(source)}`;

  const image = await loadImage(url);
  const width = Number(svgElement.getAttribute("width")) || svgElement.clientWidth || 952;
  const height = Number(svgElement.getAttribute("height")) || svgElement.clientHeight || 712;

  const canvas = document.createElement("canvas");
  canvas.width = Math.round(width * scale);
  canvas.height = Math.round(height * scale);
  const context = canvas.getContext("2d");
  context.fillStyle = "#FFFFFF";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  return { dataUrl: canvas.toDataURL("image/png"), width, height };
}

/**
 * Bouwt de A4-samenvatting en start de download.
 *
 * Individueel en team gebruiken dezelfde opmaak; alleen het label in de kopregel
 * en de bestandsnaam verschillen (briefing §8.3).
 *
 * @param {object} params
 * @param {SVGSVGElement} params.svgElement de gerenderde <CloverPrintView>
 * @param {ReturnType<import("./scoring").buildResult>} params.result
 * @param {"individual" | "team"} [params.variant]
 * @param {string} [params.companyName]
 * @param {number} [params.participantCount] aantal invullers bij een teamresultaat
 */
export async function generateSummaryPdf({
  svgElement,
  result,
  variant = "individual",
  companyName = "",
  participantCount = 1,
}) {
  const doc = new jsPDF({ unit: "mm", format: "a4", compress: true });
  const clover = await svgToPngDataUrl(svgElement);

  const headerBottom = drawHeader(doc, result, variant, participantCount);
  const footerTop = PAGE.height - 30;

  // Eerst de tekst opmeten, dan pas het beeld schalen. Zo vult de pagina zich
  // netjes en kan de tekst nooit over de voettekst heen lopen — ook niet bij de
  // langere conclusievarianten of bij twee uitgelichte bladeren.
  const blocks = buildBlocks(doc, result);
  const textHeight = blocks.reduce((total, block) => total + block.spaceBefore + block.height, 0);

  const aspect = clover.width / clover.height;
  const available = footerTop - headerBottom - textHeight - IMAGE_GAP;
  const imageHeight = Math.max(52, Math.min(available, MAX_IMAGE_HEIGHT, CONTENT_WIDTH / aspect));
  const imageWidth = imageHeight * aspect;

  doc.addImage(
    clover.dataUrl,
    "PNG",
    (PAGE.width - imageWidth) / 2,
    headerBottom,
    imageWidth,
    imageHeight,
    undefined,
    "FAST"
  );

  let y = headerBottom + imageHeight + IMAGE_GAP;
  for (const block of blocks) {
    y += block.spaceBefore;
    block.draw(y);
    y += block.height;
  }

  drawFooter(doc, companyName);
  doc.save(fileName(variant, companyName));
}

const IMAGE_GAP = 8;
const MAX_IMAGE_HEIGHT = 92;

/**
 * Bouwt de tekstblokken van de pagina met hun hoogte, zonder al te tekenen.
 * @returns {{height: number, spaceBefore: number, draw: (y: number) => void}[]}
 */
function buildBlocks(doc, result) {
  const blocks = [];
  const push = (block) => blocks.push({ spaceBefore: 0, ...block });

  push(heading(doc, pdfCopy.conclusionHeading, 0));
  push(text(doc, result.conclusion.title, { font: "bold", size: 13.5, lineHeight: 6, color: INK }));
  push(text(doc, result.conclusion.body, { size: 10, lineHeight: 4.7, color: INK_SOFT, spaceBefore: 2 }));

  push(heading(doc, pdfCopy.leavesHeading, 7));
  result.perLeaf.forEach((leaf, index) => {
    push(leafBlock(doc, leaf, index));
  });

  push(heading(doc, pdfCopy.nextStepHeading, 7));
  const highlighted = result.perLeaf.filter((leaf) => leaf.highlighted);
  if (!highlighted.length) {
    push(text(doc, ctaCopy.broadBody, { size: 10, lineHeight: 4.7, color: INK_SOFT }));
  } else {
    highlighted.forEach((leaf, index) => {
      push(text(doc, leaf.instrument.name, {
        font: "bold",
        size: 10,
        lineHeight: 4.7,
        color: INK,
        spaceBefore: index === 0 ? 0 : 3,
      }));
      push(text(doc, leaf.instrument.promise, { size: 10, lineHeight: 4.7, color: INK_SOFT, spaceBefore: 1 }));
    });
  }

  return blocks;
}

function heading(doc, label, spaceBefore) {
  return {
    spaceBefore,
    height: 5.6,
    draw: (y) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.8);
      doc.setTextColor(...rgb(INK_MUTED));
      doc.text(label.toUpperCase(), MARGIN, y, { charSpace: 0.35 });
    },
  };
}

function text(doc, content, { font = "normal", size, lineHeight, color, spaceBefore = 0, x = MARGIN, width = CONTENT_WIDTH }) {
  doc.setFont("helvetica", font);
  doc.setFontSize(size);
  const lines = doc.splitTextToSize(content, width);
  return {
    spaceBefore,
    height: lines.length * lineHeight,
    draw: (y) => {
      doc.setFont("helvetica", font);
      doc.setFontSize(size);
      doc.setTextColor(...rgb(color));
      doc.text(lines, x, y);
    },
  };
}

/** Eén blad: gekleurde stip, naam, kwalitatieve duiding en toelichting. */
function leafBlock(doc, leaf, index) {
  const noteX = MARGIN + 6;
  const noteWidth = CONTENT_WIDTH - 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.6);
  const noteLines = doc.splitTextToSize(leaf.note, noteWidth);

  // Breedte van de naam meten in het lettertype waarin hij ook getekend wordt,
  // anders schuift de kwalitatieve duiding eroverheen.
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.2);
  const labelWidth = doc.getTextWidth(leaf.label);

  return {
    spaceBefore: index === 0 ? 0 : 3.6,
    height: 4.6 + noteLines.length * 4.5,
    draw: (y) => {
      doc.setFillColor(...rgb(printLeafColor(leaf.color, index, leaf.vitality)));
      doc.setDrawColor(...rgb(INK_MUTED));
      doc.setLineWidth(0.2);
      doc.circle(MARGIN + 1.7, y - 1.1, 1.7, "FD");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10.2);
      doc.setTextColor(...rgb(INK));
      doc.text(leaf.label, noteX, y);

      doc.setFont("helvetica", "italic");
      doc.setFontSize(9.4);
      doc.setTextColor(...rgb(INK_MUTED));
      doc.text(`— ${leaf.qualitative}`, noteX + labelWidth + 2.2, y);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.6);
      doc.setTextColor(...rgb(INK_SOFT));
      doc.text(noteLines, noteX, y + 4.6);
    },
  };
}

function drawHeader(doc, result, variant, participantCount) {
  // Placeholder voor asset 6 uit §8.2, native getekend: een licht vlak met de
  // vier bladkleuren als streep. Vervangbaar door het Firefly-beeld.
  doc.setFillColor(...rgb("#F5F5F4"));
  doc.rect(0, 0, PAGE.width, 26, "F");

  const stripeWidth = PAGE.width / result.perLeaf.length;
  result.perLeaf.forEach((leaf, index) => {
    doc.setFillColor(...rgb(printLeafColor(leaf.color, index, leaf.vitality)));
    doc.rect(index * stripeWidth, 0, stripeWidth, 2.4, "F");
  });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(19);
  doc.setTextColor(...rgb(INK));
  doc.text(pdfCopy.title, MARGIN, 15);

  // Expliciet labelen, zodat een individuele uitdraai nooit voor het
  // teamresultaat wordt aangezien of andersom.
  const subtitle =
    variant === "team" ? pdfCopy.teamSubtitle(participantCount) : pdfCopy.individualSubtitle;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...rgb(INK_MUTED));
  doc.text(subtitle, MARGIN, 21);

  drawCloverMark(doc, PAGE.width - MARGIN - 9, 13, result);

  return 34;
}

/** Klein merk-teken rechtsboven: vier gekleurde blaadjes. */
function drawCloverMark(doc, cx, cy, result) {
  const radius = 3.1;
  const offset = 3;
  const positions = [
    [-offset, -offset],
    [offset, -offset],
    [offset, offset],
    [-offset, offset],
  ];
  result.perLeaf.forEach((leaf, index) => {
    doc.setFillColor(...rgb(printLeafColor(leaf.color, index, leaf.vitality)));
    doc.circle(cx + positions[index][0], cy + positions[index][1], radius, "F");
  });
}

function drawFooter(doc, companyName) {
  const baseline = PAGE.height - 14;

  doc.setDrawColor(...rgb(HAIRLINE));
  doc.setLineWidth(0.3);
  doc.line(MARGIN, baseline - 8, PAGE.width - MARGIN, baseline - 8);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.8);
  doc.setTextColor(...rgb(INK_MUTED));

  const left = [formatDate(new Date()), companyName.trim()].filter(Boolean).join(" · ");
  doc.text(left, MARGIN, baseline - 3.5);

  const contact = [CONTACT_INFO.organisation, CONTACT_INFO.email || CONTACT_INFO.url]
    .filter(Boolean)
    .join(" · ");
  doc.text(contact || CONTACT_INFO.placeholder, PAGE.width - MARGIN, baseline - 3.5, {
    align: "right",
  });

  const disclaimer = doc.splitTextToSize(pdfCopy.disclaimer, CONTENT_WIDTH);
  doc.text(disclaimer, MARGIN, baseline + 1.5);
}

function formatDate(date) {
  return new Intl.DateTimeFormat("nl-NL", { dateStyle: "long" }).format(date);
}

export function fileName(variant, companyName) {
  const kind = variant === "team" ? "teamresultaat" : "eigen-resultaat";
  const slug = slugify(companyName) || isoDate(new Date());
  return `${brand.fileNamePrefix}-${kind}-${slug}.pdf`;
}

function slugify(value) {
  return (value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

function rgb(hex) {
  const { r, g, b } = hexToRgb(hex);
  return [r, g, b];
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Kon het klavertje niet omzetten naar een afbeelding."));
    image.src = src;
  });
}
