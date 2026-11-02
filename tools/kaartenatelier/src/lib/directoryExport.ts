export type WriteOutcome = "new" | "replaced" | "skipped" | "error" | "cancelled";

export type WriteLogEntry = {
  path: string;
  outcome: WriteOutcome;
  detail?: string;
};

export type MockDirNode = {
  files: Map<string, Uint8Array>;
  subdirs: Map<string, MockDirNode>;
};

export function createMockDir(): MockDirNode {
  return { files: new Map(), subdirs: new Map() };
}

function todayBackupFolder(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `_vorige versie ${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function splitPath(p: string): string[] {
  return p.replace(/\\/g, "/").split("/").filter(Boolean);
}

function getOrCreateSubdir(root: MockDirNode, parts: string[]): MockDirNode {
  let node = root;
  for (const part of parts) {
    let next = node.subdirs.get(part);
    if (!next) {
      next = createMockDir();
      node.subdirs.set(part, next);
    }
    node = next;
  }
  return node;
}

export async function backupAndWriteFile(
  root: MockDirNode,
  relativePath: string,
  data: Uint8Array
): WriteLogEntry {
  try {
    const parts = splitPath(relativePath);
    const fileName = parts.pop()!;
    const dir = parts.length ? getOrCreateSubdir(root, parts) : root;
    if (dir.files.has(fileName)) {
      const backupRoot = getOrCreateSubdir(root, [todayBackupFolder()]);
      let targetName = fileName;
      let n = 2;
      while (backupRoot.files.has(targetName)) {
        const dot = fileName.lastIndexOf(".");
        const base = dot >= 0 ? fileName.slice(0, dot) : fileName;
        const ext = dot >= 0 ? fileName.slice(dot) : "";
        targetName = `${base}_${n}${ext}`;
        n += 1;
      }
      backupRoot.files.set(targetName, dir.files.get(fileName)!);
      dir.files.set(fileName, data);
      return { path: relativePath, outcome: "replaced", detail: `back-up: ${targetName}` };
    }
    dir.files.set(fileName, data);
    return { path: relativePath, outcome: "new" };
  } catch (e) {
    return { path: relativePath, outcome: "error", detail: String(e) };
  }
}

export async function writeFilesToMockDirectory(
  root: MockDirNode,
  entries: { relativePath: string; data: Uint8Array }[]
): Promise<WriteLogEntry[]> {
  const logs: WriteLogEntry[] = [];
  for (const entry of entries) {
    logs.push(await backupAndWriteFile(root, entry.relativePath, entry.data));
  }
  return logs;
}

export type DirHandleLike = {
  getFileHandle(name: string, opts?: { create?: boolean }): Promise<FileHandleLike>;
  getDirectoryHandle(name: string, opts?: { create?: boolean }): Promise<DirHandleLike>;
};

export type FileHandleLike = {
  createWritable(): Promise<{ write(data: Blob | BufferSource): Promise<void>; close(): Promise<void> }>;
};

async function ensurePath(dir: DirHandleLike, parts: string[]): Promise<DirHandleLike> {
  let current = dir;
  for (const part of parts) {
    current = await current.getDirectoryHandle(part, { create: true });
  }
  return current;
}

export async function backupAndWriteToHandle(
  rootDir: DirHandleLike,
  relativePath: string,
  data: Uint8Array
): Promise<WriteLogEntry> {
  const parts = splitPath(relativePath);
  const fileName = parts.pop()!;
  try {
    const parent = parts.length ? await ensurePath(rootDir, parts) : rootDir;
    let exists = false;
    try {
      await parent.getFileHandle(fileName);
      exists = true;
    } catch {
      exists = false;
    }
    if (exists) {
      const backupName = todayBackupFolder();
      const backupDir = await rootDir.getDirectoryHandle(backupName, { create: true });
      const existingHandle = await parent.getFileHandle(fileName);
      // @ts-expect-error browser API
      const existingFile = await existingHandle.getFile();
      const existingBuf = new Uint8Array(await existingFile.arrayBuffer());
      let targetName = fileName;
      let n = 2;
      while (true) {
        try {
          await backupDir.getFileHandle(targetName);
          const dot = fileName.lastIndexOf(".");
          const base = dot >= 0 ? fileName.slice(0, dot) : fileName;
          const ext = dot >= 0 ? fileName.slice(dot) : "";
          targetName = `${base}_${n}${ext}`;
          n += 1;
        } catch {
          break;
        }
      }
      const backupFile = await backupDir.getFileHandle(targetName, { create: true });
      const w0 = await backupFile.createWritable();
      await w0.write(existingBuf);
      await w0.close();
    }
    const fh = await parent.getFileHandle(fileName, { create: true });
    const w = await fh.createWritable();
    await w.write(data);
    await w.close();
    return { path: relativePath, outcome: exists ? "replaced" : "new" };
  } catch (e) {
    if (e instanceof DOMException && e.name === "AbortError") {
      return { path: relativePath, outcome: "cancelled" };
    }
    return { path: relativePath, outcome: "error", detail: String(e) };
  }
}

export async function writeFilesToDirectoryHandle(
  rootDir: DirHandleLike,
  entries: { relativePath: string; data: Uint8Array }[]
): Promise<WriteLogEntry[]> {
  const logs: WriteLogEntry[] = [];
  for (const entry of entries) {
    logs.push(await backupAndWriteToHandle(rootDir, entry.relativePath, entry.data));
  }
  return logs;
}

export function supportsDirectoryPicker(): boolean {
  return typeof window !== "undefined" && "showDirectoryPicker" in window;
}

export async function blobToUint8(blob: Blob): Promise<Uint8Array> {
  return new Uint8Array(await blob.arrayBuffer());
}
