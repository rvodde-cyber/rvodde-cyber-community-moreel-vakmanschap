import { describe, expect, it } from "vitest";
import {
  backupAndWriteFile,
  createMockDir,
  writeFilesToMockDirectory,
} from "./directoryExport";

describe("directory export backup", () => {
  it("schrijft nieuw bestand", async () => {
    const root = createMockDir();
    const log = await backupAndWriteFile(root, "DL7.docx", new Uint8Array([1, 2]));
    expect(log.outcome).toBe("new");
    expect(root.files.get("DL7.docx")).toEqual(new Uint8Array([1, 2]));
  });

  it("back-up bij bestaand bestand", async () => {
    const root = createMockDir();
    await backupAndWriteFile(root, "kaart.docx", new Uint8Array([1]));
    const log = await backupAndWriteFile(root, "kaart.docx", new Uint8Array([2]));
    expect(log.outcome).toBe("replaced");
    expect(root.files.get("kaart.docx")).toEqual(new Uint8Array([2]));
    const backupKeys = [...root.subdirs.keys()];
    expect(backupKeys.some((k) => k.startsWith("_vorige versie"))).toBe(true);
  });

  it("tweede overschrijvingzelfde dag krijgt volgnummer in back-up", async () => {
    const root = createMockDir();
    await backupAndWriteFile(root, "x.docx", new Uint8Array([1]));
    await backupAndWriteFile(root, "x.docx", new Uint8Array([2]));
    await backupAndWriteFile(root, "x.docx", new Uint8Array([3]));
    const backupDir = root.subdirs.get([...root.subdirs.keys()][0])!;
    expect(backupDir.files.has("x.docx")).toBe(true);
    expect(backupDir.files.has("x_2.docx")).toBe(true);
  });

  it("batch schrijft submap afbeeldingen", async () => {
    const root = createMockDir();
    await writeFilesToMockDirectory(root, [
      { relativePath: "afbeeldingen/a.jpg", data: new Uint8Array([9]) },
    ]);
    const imgDir = root.subdirs.get("afbeeldingen")!;
    expect(imgDir.files.get("a.jpg")).toEqual(new Uint8Array([9]));
  });
});
