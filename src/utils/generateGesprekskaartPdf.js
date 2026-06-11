import { jsPDF } from "jspdf";

const BRAND_COLOR = "#534ab7";
const TEXT_PRIMARY = "#1a2744";
const TEXT_SECONDARY = "#5f5e5a";

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16)
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

export function downloadGesprekskaartPdf(card, t) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 24;
  const contentWidth = pageWidth - margin * 2;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...hexToRgb(BRAND_COLOR));
  doc.text(t.gesprekskaart.pdfHeader, pageWidth / 2, margin, { align: "center" });

  const stapLabel = `${t.gesprekskaart.stapLabel} ${card.stapNummer} — ${card.stapNaam}`;
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...hexToRgb(card.kleur));
  doc.text(stapLabel, margin, margin + 14);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(...hexToRgb(TEXT_SECONDARY));
  doc.text(card.categorie, margin, margin + 22);

  const questionText = `\u201C${card.vraag}\u201D`;
  doc.setFont("times", "italic");
  doc.setFontSize(24);
  doc.setTextColor(...hexToRgb(TEXT_PRIMARY));

  const questionLines = doc.splitTextToSize(questionText, contentWidth * 0.88);
  const lineHeight = 11;
  const questionBlockHeight = questionLines.length * lineHeight;
  const questionY = pageHeight / 2 - questionBlockHeight / 2;

  doc.text(questionLines, pageWidth / 2, questionY, { align: "center", lineHeightFactor: 1.35 });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(...hexToRgb(TEXT_SECONDARY));
  const instructieLines = doc.splitTextToSize(t.gesprekskaart.instructie, contentWidth * 0.82);
  const instructieY = questionY + questionBlockHeight + 18;
  doc.text(instructieLines, pageWidth / 2, instructieY, { align: "center", lineHeightFactor: 1.4 });

  doc.setFontSize(9);
  doc.setTextColor(130, 128, 122);
  doc.text(t.gesprekskaart.pdfFooter, pageWidth / 2, pageHeight - margin, { align: "center" });

  const filename = `gesprekskaart-${slugify(card.stapNaam)}-${slugify(card.categorie)}.pdf`;
  doc.save(filename);
}
