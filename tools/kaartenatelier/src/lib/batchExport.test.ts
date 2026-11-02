import { describe, expect, it } from "vitest";
import { buildCardDocx } from "./buildCardDocx";
import { collectExportFiles } from "./exportBundle";
import { countSectionsInDocumentXml, readDocxDocumentXml } from "./docxXml";
import type { KaartPakket, KaartPakketKaart } from "./types";

import { MIN_JPEG } from "./testFixtures";

function makeCard(i: number, extra?: Partial<KaartPakketKaart>): KaartPakketKaart {
  return {
    nummer: `T${i}`,
    bestandsnaam: `T${i}.docx`,
    titel_nl: `Titel ${i}`,
    verhaal_nl: ["Alinea één.", "Alinea twee.", "Alinea drie."],
    complexiteit: "meso",
    firefly_prompt_en: `Scene ${i} office`,
    ...extra,
  };
}

function pakket15(): KaartPakket {
  return {
    schema: "kaartenatelier/1",
    categorie: { naam_nl: "Test", sector_kleur: "#E0A01A" },
    batch: { id: "b1", beeldmaker: "Tester" },
    kaarten: Array.from({ length: 15 }, (_, i) => makeCard(i + 1)),
  };
}

describe("page count status A/D", () => {
  it("zonder foto: 2 secties (prompt pagina 2)", async () => {
    const p = pakket15();
    const blob = await buildCardDocx(p, p.kaarten[0]);
    const xml = await readDocxDocumentXml(await blob.arrayBuffer());
    expect(countSectionsInDocumentXml(xml)).toBe(2);
    expect(xml).toContain("Firefly-prompt");
  });

  it("met foto: 1 sectie", async () => {
    const p = pakket15();
    const blob = await buildCardDocx(p, p.kaarten[0], MIN_JPEG);
    const xml = await readDocxDocumentXml(await blob.arrayBuffer());
    expect(countSectionsInDocumentXml(xml)).toBe(1);
  });
});

describe("batch export 10A + 5D", () => {
  it("telt status A en D in export", async () => {
    const p = pakket15();
    const photos: Record<string, { jpeg: Uint8Array; fileName: string; confirmed: boolean }> = {};
    for (let i = 1; i <= 10; i++) {
      photos[`T${i}`] = { jpeg: MIN_JPEG, fileName: `T${i}.jpg`, confirmed: true };
    }
    const { plans, files } = await collectExportFiles({
      pakket: p,
      photos,
      cardWarnings: {},
      allowAanpassen: new Set(),
    });
    const docxFiles = files.filter(
      (f) => f.relativePath.endsWith(".docx") && p.kaarten.some((c) => c.bestandsnaam === f.relativePath)
    );
    expect(docxFiles.length).toBe(15);
    const aCount = plans.filter((x) => !x.skipped && x.statusA).length;
    const dCount = plans.filter((x) => !x.skipped && !x.statusA).length;
    expect(aCount).toBe(10);
    expect(dCount).toBe(5);
  });

  it("tweede ronde vervangt D met back-up in mock map", async () => {
    const { createMockDir, backupAndWriteFile } = await import("./directoryExport");
    const p = pakket15();
    const root = createMockDir();
    const blobD = await buildCardDocx(p, p.kaarten[10]);
    await backupAndWriteFile(root, "T11.docx", new Uint8Array(await blobD.arrayBuffer()));
    const blobA = await buildCardDocx(p, p.kaarten[10], MIN_JPEG);
    const log = await backupAndWriteFile(root, "T11.docx", new Uint8Array(await blobA.arrayBuffer()));
    expect(log.outcome).toBe("replaced");
  });

  it("sla aanpassen over tenzij toegestaan", async () => {
    const p = pakket15();
    p.kaarten[0].foto_status = "aanpassen";
    const { plans } = await collectExportFiles({
      pakket: p,
      photos: { T1: { jpeg: MIN_JPEG, fileName: "T1.jpg", confirmed: true } },
      cardWarnings: {},
      allowAanpassen: new Set(),
    });
    expect(plans.find((x) => x.nummer === "T1")?.skipped).toBe(true);
    const { plans: plans2 } = await collectExportFiles({
      pakket: p,
      photos: { T1: { jpeg: MIN_JPEG, fileName: "T1.jpg", confirmed: true } },
      cardWarnings: {},
      allowAanpassen: new Set(["T1"]),
    });
    expect(plans2.find((x) => x.nummer === "T1")?.skipped).toBe(false);
  });
});
