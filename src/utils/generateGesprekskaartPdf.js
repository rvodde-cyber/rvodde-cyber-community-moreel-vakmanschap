import { jsPDF } from "jspdf";

const BRAND_COLOR = "#534ab7";
const TEXT_PRIMARY = "#1a2744";
const TEXT_SECONDARY = "#5f5e5a";

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

export function downloadGesprekskaartPdf(card, t) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...hexToRgb(BRAND_COLOR));
  doc.text(t.gesprekskaart.pdfHeader, pageWidth / 2, y, { align: "center" });
  y += 10;

  const stapLabel = `${t.gesprekskaart.stapLabel} ${card.stapNummer} — ${card.stapNaam}`;
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...hexToRgb(card.kleur));
  doc.text(stapLabel, margin, y);
  y += 7;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...hexToRgb(TEXT_SECONDARY));
  doc.text(card.categorie, margin, y);
  y += 10;

  const titel = card.titel || card.vraag;
  doc.setFont("times", "bold");
  doc.setFontSize(18);
  doc.setTextColor(...hexToRgb(TEXT_PRIMARY));
  const titelLines = doc.splitTextToSize(titel, contentWidth);
  doc.text(titelLines, margin, y);
  y += titelLines.length * 8 + 4;

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

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...hexToRgb(BRAND_COLOR));
  doc.text(t.gesprekskaart.reflectieLabel || "Reflectie", margin, y);
  y += 7;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(...hexToRgb(TEXT_PRIMARY));

  const vragen = [card.vraag1, card.vraag2].filter(Boolean);
  if (vragen.length === 0) {
    vragen.push(t.gesprekskaart.instructie);
  }

  vragen.forEach((vraag, index) => {
    const lines = doc.splitTextToSize(`${index + 1}. ${vraag}`, contentWidth);
    if (y + lines.length * 5.5 > pageHeight - margin - 10) {
      doc.addPage();
      y = margin;
    }
    doc.text(lines, margin, y, { lineHeightFactor: 1.4 });
    y += lines.length * 5.5 + 4;
  });

  doc.setFontSize(9);
  doc.setTextColor(130, 128, 122);
  doc.text(t.gesprekskaart.pdfFooter, pageWidth / 2, pageHeight - margin, { align: "center" });

  const label = slugify(card.titel || card.vraag || card.id);
  const filename = `gesprekskaart-${slugify(card.stapNaam)}-${label}.pdf`;
  doc.save(filename);
}
