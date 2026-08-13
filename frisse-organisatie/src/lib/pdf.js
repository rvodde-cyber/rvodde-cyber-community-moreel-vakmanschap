// PDF-samenvatting (briefing §8.3).
//
// Aanpak: de tekst wordt native door jsPDF gezet — dus echte, scherpe letters in
// plaats van een schermafbeelding — en alleen het klavertje gaat als afbeelding
// mee. Die afbeelding komt uit <CloverPrintView>, die dezelfde geometrie en
// eindscores gebruikt als het scherm maar zonder animatie en zonder blur.

import { jsPDF } from "jspdf";
import { brand } from "../config/brand";
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
 * @param {object} params
 * @param {SVGSVGElement} params.svgElement de gerenderde <CloverPrintView>
 * @param {ReturnType<import("./scoring").buildResult>} params.result
 * @param {string} [params.sessionCode]
 */
export async function generateSummaryPdf({ svgElement, result, sessionCode = "" }) {
  const doc = new jsPDF({ unit: "mm", format: "a4", compress: true });
  const clover = await svgToPngDataUrl(svgElement);

  let y = drawHeader(doc, result);

  // Klavertje — schaal op breedte, met een bovengrens zodat de tekst eronder past.
  const imageWidth = Math.min(112, CONTENT_WIDTH);
  const imageHeight = (clover.height / clover.width) * imageWidth;
  doc.addImage(
    clover.dataUrl,
    "PNG",
    (PAGE.width - imageWidth) / 2,
    y,
    imageWidth,
    imageHeight,
    undefined,
    "FAST"
  );
  y += imageHeight + 6;

  y = drawConclusion(doc, result, y);
  y = drawLeaves(doc, result, y);
  drawNextStep(doc, result, y);
  drawFooter(doc, sessionCode);

  doc.save(fileName(sessionCode));
}

function drawHeader(doc, result) {
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

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...rgb(INK_MUTED));
  doc.text(pdfCopy.subtitle, MARGIN, 21);

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

function drawConclusion(doc, result, startY) {
  let y = sectionHeading(doc, pdfCopy.conclusionHeading, startY);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...rgb(INK));
  y = paragraph(doc, result.conclusion.title, y, 5.6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.6);
  doc.setTextColor(...rgb(INK_SOFT));
  y = paragraph(doc, result.conclusion.body, y + 1.4, 4.4);

  return y + 3;
}

function drawLeaves(doc, result, startY) {
  let y = sectionHeading(doc, pdfCopy.leavesHeading, startY);

  result.perLeaf.forEach((leaf, index) => {
    doc.setFillColor(...rgb(printLeafColor(leaf.color, index, leaf.vitality)));
    doc.setDrawColor(...rgb(INK_MUTED));
    doc.setLineWidth(0.2);
    doc.circle(MARGIN + 1.6, y - 1.1, 1.6, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...rgb(INK));
    doc.text(leaf.label, MARGIN + 6, y);

    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.setTextColor(...rgb(INK_MUTED));
    doc.text(`— ${leaf.qualitative}`, MARGIN + 6 + doc.getTextWidth(leaf.label) + 2, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.2);
    doc.setTextColor(...rgb(INK_SOFT));
    y = paragraph(doc, leaf.note, y + 4.2, 4.1, MARGIN + 6, CONTENT_WIDTH - 6);
    y += 3.4;
  });

  return y;
}

function drawNextStep(doc, result, startY) {
  const y = sectionHeading(doc, pdfCopy.nextStepHeading, startY);
  const highlighted = result.perLeaf.filter((leaf) => leaf.highlighted);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.6);
  doc.setTextColor(...rgb(INK_SOFT));

  if (!highlighted.length) {
    paragraph(doc, ctaCopy.broadBody, y, 4.4);
    return;
  }

  let cursor = y;
  highlighted.forEach((leaf) => {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...rgb(INK));
    cursor = paragraph(doc, leaf.instrument.name, cursor, 4.4);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...rgb(INK_SOFT));
    cursor = paragraph(doc, leaf.instrument.promise, cursor + 0.6, 4.2) + 2;
  });
}

function drawFooter(doc, sessionCode) {
  const baseline = PAGE.height - 14;

  doc.setDrawColor(...rgb(HAIRLINE));
  doc.setLineWidth(0.3);
  doc.line(MARGIN, baseline - 8, PAGE.width - MARGIN, baseline - 8);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.8);
  doc.setTextColor(...rgb(INK_MUTED));

  const left = [formatDate(new Date()), sessionCode.trim()].filter(Boolean).join(" · ");
  doc.text(left, MARGIN, baseline - 3.5);

  const contact = [brand.organisation, brand.contactEmail].filter(Boolean).join(" · ");
  if (contact) {
    doc.text(contact, PAGE.width - MARGIN, baseline - 3.5, { align: "right" });
  }

  const disclaimer = doc.splitTextToSize(pdfCopy.disclaimer, CONTENT_WIDTH);
  doc.text(disclaimer, MARGIN, baseline + 1.5);
}

function sectionHeading(doc, text, y) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.6);
  doc.setTextColor(...rgb(INK_MUTED));
  doc.text(text.toUpperCase(), MARGIN, y, { charSpace: 0.35 });
  return y + 5.4;
}

function paragraph(doc, text, y, lineHeight, x = MARGIN, width = CONTENT_WIDTH) {
  const lines = doc.splitTextToSize(text, width);
  doc.text(lines, x, y);
  return y + lines.length * lineHeight;
}

function formatDate(date) {
  return new Intl.DateTimeFormat("nl-NL", { dateStyle: "long" }).format(date);
}

export function fileName(sessionCode) {
  const slug = slugify(sessionCode) || isoDate(new Date());
  return `${brand.fileNamePrefix}-${slug}.pdf`;
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
