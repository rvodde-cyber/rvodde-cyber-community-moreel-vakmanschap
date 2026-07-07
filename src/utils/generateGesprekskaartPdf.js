import { jsPDF } from "jspdf";
import {
  ATTRIBUTION_COLOR,
  COMPLEXITY_COLOR,
  getComplexityKey,
} from "../data/gesprekskaarten/constants";
import { getGesprekskaartStrings } from "../data/gesprekskaarten/i18n";

const TEXT_PRIMARY = "#1a2744";

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ];
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function downloadGesprekskaartPdf(card, t, taal = "nl") {
  const gk = getGesprekskaartStrings(taal);
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const categorieKleur = card.kleur ?? "#5f5e5a";
  const complexityKey = card.complexiteit ?? getComplexityKey(card.moeilijkheid);
  const complexityLabel = gk.complexiteitLabels?.[complexityKey] ?? complexityKey;

  // 1. Categorie (categoriekleur)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...hexToRgb(categorieKleur));
  doc.text(card.categorie, margin, y);
  y += 8;

  // 2. Complexiteitsbadge
  const badgeH = 8;
  doc.setFillColor(...hexToRgb(COMPLEXITY_COLOR));
  doc.rect(margin, y, 2.5, badgeH, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...hexToRgb(COMPLEXITY_COLOR));
  doc.text(complexityLabel, margin + 5, y + 5.5);
  y += badgeH + 8;

  // 3. Titel
  const titel = card.titel || card.vraag;
  doc.setFont("times", "bold");
  doc.setFontSize(18);
  doc.setTextColor(...hexToRgb(TEXT_PRIMARY));
  const titelLines = doc.splitTextToSize(titel, contentWidth);
  doc.text(titelLines, margin, y);
  y += titelLines.length * 8 + 6;

  // 4. Casustekst
  if (card.verhaal) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(...hexToRgb(TEXT_PRIMARY));
    const verhaalLines = doc.splitTextToSize(card.verhaal, contentWidth);
    doc.text(verhaalLines, margin, y, { lineHeightFactor: 1.45 });
    y += verhaalLines.length * 5.5 + 8;
  } else {
    doc.setFont("times", "italic");
    doc.setFontSize(20);
    const questionLines = doc.splitTextToSize(`\u201C${card.vraag}\u201D`, contentWidth * 0.92);
    doc.text(questionLines, margin, y, { lineHeightFactor: 1.35 });
    y += questionLines.length * 9 + 8;
  }

  // 5. Vraag-overlay (vaste reflectievragen)
  const vragen = [card.vraag1, card.vraag2].filter(Boolean);
  if (vragen.length === 0) {
    vragen.push(t.gesprekskaart.instructie);
  }

  doc.setFillColor(245, 242, 236);
  const fqLines = vragen.flatMap((vraag, index) =>
    doc.splitTextToSize(`${index + 1}. ${vraag}`, contentWidth - 10)
  );
  const fqBoxH = fqLines.length * 5.5 + 12;
  doc.roundedRect(margin, y, contentWidth, fqBoxH, 2, 2, "F");
  doc.setFillColor(...hexToRgb(categorieKleur));
  doc.rect(margin, y, 2.5, fqBoxH, "F");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(...hexToRgb(TEXT_PRIMARY));
  doc.text(fqLines, margin + 6, y + 8, { lineHeightFactor: 1.4 });
  y += fqBoxH + 8;

  // 6. Firefly-prompt (indien van toepassing)
  if (card.fireflyPrompt) {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(130, 128, 122);
    const promptLines = doc.splitTextToSize(`Firefly: ${card.fireflyPrompt}`, contentWidth);
    if (y + promptLines.length * 4 > pageHeight - margin - 70) {
      doc.addPage();
      y = margin;
    }
    doc.text(promptLines, margin, y, { lineHeightFactor: 1.35 });
    y += promptLines.length * 4 + 6;
  }

  // 7. Ruimte voor afbeelding
  const imgH = Math.max(55, pageHeight - y - margin - 18);
  if (y + imgH > pageHeight - margin - 12) {
    doc.addPage();
    y = margin;
  }

  if (card.afbeelding) {
    try {
      doc.addImage(card.afbeelding, "JPEG", margin, y, contentWidth, imgH);
    } catch {
      drawImagePlaceholder(doc, margin, y, contentWidth, imgH);
    }
  } else {
    drawImagePlaceholder(doc, margin, y, contentWidth, imgH);
  }
  y += imgH + 6;

  // 8. Bronvermelding
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  doc.setTextColor(...hexToRgb(ATTRIBUTION_COLOR));
  doc.text(gk.complexiteitAttributie, margin, pageHeight - margin);

  const label = slugify(card.titel || card.vraag || card.id);
  const filename = `gesprekskaart-${slugify(card.stapNaam ?? "kaart")}-${label}.pdf`;
  doc.save(filename);
}

function drawImagePlaceholder(doc, x, y, w, h) {
  doc.setDrawColor(216, 211, 201);
  doc.setLineWidth(0.5);
  doc.setFillColor(248, 248, 246);
  doc.roundedRect(x, y, w, h, 3, 3, "FD");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(130, 128, 122);
  doc.text("Afbeelding", x + w / 2, y + h / 2, { align: "center" });
}
