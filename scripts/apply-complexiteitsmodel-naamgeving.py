"""
Backup + tekstvervanging complexiteitsmodel (Kim Meijer → werkdefinitie lectoraat).
Gebruik: python scripts/apply-complexiteitsmodel-naamgeving.py [--dry-run]
"""
from __future__ import annotations

import argparse
import csv
import os
import re
import shutil
import zipfile
from pathlib import Path

ONEDRIVE = Path(r"C:\Users\876409\OneDrive - Office 365 Fontys")
BACKUP_ROOT = ONEDRIVE / "_archief" / "backup_voor_naamswijziging"
INVENTORY = (
    Path(__file__).resolve().parents[1]
    / "_archief"
    / "backup_voor_naamswijziging"
    / "inventarisatie_kim_meijer_onedrive.csv"
)

SKIP_FILES = {
    ONEDRIVE / "gesprek KIM Meijer.docx",
}

ATTRIBUTION_REPLACEMENTS = [
    (
        "Complexiteitsmodel: Kim Meijer, &apos;Impossible and Inevitable&apos; (Tilburg University)",
        "Complexiteitsmodel (werkdefinitie Lectoraat Ethisch Werken)",
    ),
    (
        "Complexiteitsmodel: Kim Meijer, 'Impossible and Inevitable' (Tilburg University)",
        "Complexiteitsmodel (werkdefinitie Lectoraat Ethisch Werken)",
    ),
    (
        "Complexity model: Kim Meijer, 'Impossible and Inevitable' (Tilburg University)",
        "Complexity model (working definition, Lectoraat Ethisch Werken)",
    ),
    (
        "Complexity model: Kim Meijer, &apos;Impossible and Inevitable&apos; (Tilburg University)",
        "Complexity model (working definition, Lectoraat Ethisch Werken)",
    ),
    (
        'Complexiteitsmodel: Kim Meijer, "Impossible and Inevitable" (Tilburg University)',
        "Complexiteitsmodel (werkdefinitie Lectoraat Ethisch Werken)",
    ),
    (
        'Complexity model: Kim Meijer, "Impossible and Inevitable" (Tilburg University)',
        "Complexity model (working definition, Lectoraat Ethisch Werken)",
    ),
    (
        "Komplexitätsmodell: Kim Meijer, „Impossible and Inevitable“ (Tilburg University)",
        "Komplexitätsmodell (Arbeitsdefinition Lectoraat Ethisch Werken)",
    ),
    (
        "Komplexitetsmodell: Kim Meijer, ”Impossible and Inevitable” (Tilburg University)",
        "Komplexitetsmodell (arbetsdefinition, Lectoraat Ethisch Werken)",
    ),
    (
        "Model složitosti: Kim Meijer, „Impossible and Inevitable“ (Tilburg University)",
        "Model složitosti (pracovní definice Lectoraat Ethisch Werken)",
    ),
    (
        'Kompleksitetsmodel: Kim Meijer, "Impossible and Inevitable" (Tilburg University)',
        "Kompleksitetsmodel (arbejdsdefinition, Lectoraat Ethisch Werken)",
    ),
]

_XML_GAP = r"(?:</w:t>.*?<w:t[^>]*>)*"

_QUOTE = r"(?:[\"'“”„\u201c\u201d\u201e]|&apos;|&#8216;|&#8217;)"
FOOTER_REGEX = re.compile(
    rf"Complexiteitsmodel:\s*(?:{_XML_GAP}\s*)*Kim\s*(?:{_XML_GAP}\s*)*Meijer,?\s*{_QUOTE}.*?Impossible and Inevitable.*?{_QUOTE}.*?\(Tilburg University\)",
    re.I | re.S,
)
FOOTER_REGEX_EN = re.compile(
    rf"Complexity model:\s*(?:{_XML_GAP}\s*)*Kim\s*(?:{_XML_GAP}\s*)*Meijer,?\s*{_QUOTE}.*?Impossible and Inevitable.*?{_QUOTE}.*?\(Tilburg University\)",
    re.I | re.S,
)

PLAIN_RULES: list[tuple[re.Pattern[str], str]] = [
    (re.compile(r"Complexiteit\s*\(\s*Kim Meijer\s*\)", re.I), "Complexiteit"),
    (re.compile(r"Kim Meijer-model", re.I), "Complexiteit"),
    (re.compile(r"complexiteitsmodel van Kim Meijer", re.I), "complexiteitsmodel (werkdefinitie Lectoraat Ethisch Werken)"),
    (re.compile(r"complexiteitsmodel Kim Meijer", re.I), "complexiteitsmodel (werkdefinitie Lectoraat Ethisch Werken)"),
    (re.compile(r"het model van Kim Meijer", re.I), "het complexiteitsmodel (werkdefinitie Lectoraat Ethisch Werken)"),
    (re.compile(r"model van Kim Meijer", re.I), "complexiteitsmodel (werkdefinitie Lectoraat Ethisch Werken)"),
    (re.compile(r"\(Meijer,\s*2023\)", re.I), ""),
    (re.compile(r"Meijer\s*\(\s*2023\s*\)", re.I), ""),
    (re.compile(r"Kim Meijer onderscheidt drie niveaus", re.I), "Het lectoraat gebruikt een werkdefinitie met drie niveaus"),
    (re.compile(r"Kim Meijer distinguishes three levels", re.I), "The lectoraat uses a working definition with three levels"),
    (
        re.compile(r"micro/meso/macro-complexiteitsmodel \(Kim Meijer\) is hier weggelaten", re.I),
        "micro/meso/macro-complexiteitsmodel is hier weggelaten",
    ),
]

LIT_LINE = re.compile(r"Meijer,\s*K\.\s*\((?:2023|z\.d\.)\)", re.I)


def transform_text(text: str) -> tuple[str, int]:
    n = 0
    for old, new in ATTRIBUTION_REPLACEMENTS:
        if old in text:
            c = text.count(old)
            text = text.replace(old, new)
            n += c
    for rx, new in [(FOOTER_REGEX, ATTRIBUTION_REPLACEMENTS[0][1]), (FOOTER_REGEX_EN, ATTRIBUTION_REPLACEMENTS[1][1])]:
        text2, c = rx.subn(new, text)
        if c:
            text = text2
            n += c
    for rx, repl in PLAIN_RULES:
        text2, c = rx.subn(repl, text)
        if c:
            text = text2
            n += c
    return text, n


def drop_literature_lines_plain(text: str) -> tuple[str, int]:
    lines = text.splitlines()
    out = []
    removed = 0
    for line in lines:
        if LIT_LINE.search(line):
            removed += 1
            continue
        out.append(line)
    return "\n".join(out), removed


def transform_plain(text: str) -> int:
    text, n = transform_text(text)
    text, r = drop_literature_lines_plain(text)
    return n + r


def backup_file(src: Path, dry_run: bool) -> None:
    rel = src.relative_to(ONEDRIVE)
    dest = BACKUP_ROOT / rel
    if dry_run:
        return
    dest.parent.mkdir(parents=True, exist_ok=True)
    if not dest.exists():
        shutil.copy2(src, dest)


def _zip_read(zin: zipfile.ZipFile, name: str) -> bytes:
    try:
        return zin.read(name)
    except zipfile.BadZipFile:
        with zin.open(name, "r") as fp:
            fp._eof = True  # type: ignore[attr-defined]
            fp._running_crc = fp._expected_crc  # type: ignore[attr-defined]
            return fp.read()


def patch_office_zip(path: Path, dry_run: bool) -> int:
    total = 0
    try:
        zin = zipfile.ZipFile(path, "r")
    except zipfile.BadZipFile:
        print(f"SKIP bad zip: {path}")
        return 0
    with zin:
        names = zin.namelist()
        blobs: dict[str, bytes] = {}
        for name in names:
            try:
                blobs[name] = _zip_read(zin, name)
            except Exception as exc:
                print(f"WARN read {name} in {path}: {exc}")
                return 0
        for name in names:
            if not name.endswith(".xml"):
                continue
            if not (
                name.startswith(("word/", "ppt/", "xl/"))
                or "sharedStrings" in name
            ):
                continue
            try:
                raw = blobs[name].decode("utf-8")
            except UnicodeDecodeError:
                continue
            new, n = transform_text(raw)

            def drop_p(m):
                nonlocal total
                block = m.group(0)
                if LIT_LINE.search(block) or (
                    "Meijer, K." in block and "Impossible" in block
                ):
                    total += 1
                    return ""
                return block

            new = re.sub(r"<w:p\b[^>]*>.*?</w:p>", drop_p, new, flags=re.S)
            if new != raw:
                n += 1
            total += n
            blobs[name] = new.encode("utf-8")
    if total and not dry_run:
        tmp = path.with_suffix(path.suffix + ".tmp")
        with zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as zout:
            for name in names:
                zout.writestr(name, blobs[name])
        tmp.replace(path)
    return total


def process_file(path: Path, dry_run: bool) -> int:
    if path in SKIP_FILES or not path.exists():
        return 0
    backup_file(path, dry_run)
    suf = path.suffix.lower()
    if suf == ".pdf":
        return 0
    if suf in {".docx", ".pptx", ".xlsx"}:
        return patch_office_zip(path, dry_run)
    if suf in {".md", ".html", ".js", ".py", ".txt", ".csv"}:
        text = path.read_text(encoding="utf-8", errors="ignore")
        new = text
        new, _ = transform_text(new)
        new, _ = drop_literature_lines_plain(new)
        if new != text and not dry_run:
            path.write_text(new, encoding="utf-8")
        return int(new != text)
    return 0


def load_inventory() -> list[Path]:
    paths = []
    with INVENTORY.open(encoding="utf-8") as f:
        reader = csv.reader(f, delimiter="|")
        next(reader, None)
        for row in reader:
            if row:
                paths.append(Path(row[0]))
    return paths


def iter_onedrive_files() -> list[Path]:
    skip_dirs = {"node_modules", ".git", "dist", "build", "_archief", ".cursor", "__pycache__"}
    exts = {".docx", ".pptx", ".xlsx", ".md", ".html", ".pdf"}
    out: list[Path] = []
    for dirpath, dirnames, filenames in os.walk(ONEDRIVE):
        dirnames[:] = [
            d
            for d in dirnames
            if d not in skip_dirs
            and "backup" not in d.lower()
            and not d.startswith("_archief")
        ]
        for fn in filenames:
            p = Path(dirpath) / fn
            if p.suffix.lower() in exts:
                out.append(p)
    return out


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--all-onedrive", action="store_true", help="Walk hele OneDrive i.p.v. alleen inventaris-CSV")
    args = ap.parse_args()
    paths = iter_onedrive_files() if args.all_onedrive else load_inventory()
    changed = 0
    replacements = 0
    for p in paths:
        n = process_file(p, args.dry_run)
        if n:
            changed += 1
            replacements += n
    print(f"files_changed={changed} replacement_ops={replacements} dry_run={args.dry_run}")


if __name__ == "__main__":
    main()
