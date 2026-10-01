"""
Naamgeving driedeling micro-meso-macro (Kim Meijer 2023 als inspiratie).
Gebruik: python scripts/apply-driedeling-naamgeving.py [--dry-run]
"""
from __future__ import annotations

import argparse
import os
import re
import shutil
import zipfile
from pathlib import Path

ONEDRIVE = Path(r"C:\Users\876409\OneDrive - Office 365 Fontys")
REPO = ONEDRIVE / r"Cursor projecten/rvodde-cyber-community-moreel-vakmanschap"
BACKUP = REPO / "_archief" / "backup_driedeling"

FOOTER_NL = (
    "Driedeling micro/meso/macro: werkdefinitie Lectoraat Ethisch Werken, "
    "geïnspireerd op Meijer (2023)."
)
FOOTER_EN = (
    "Micro/meso/macro distinction: working definition Lectoraat Ethisch Werken, "
    "inspired by Meijer (2023)."
)
INSPIRATIE_NL = (
    "De driedeling micro – meso – macro is een werkdefinitie van het Lectoraat "
    "Ethisch Werken (Fontys), geïnspireerd op het werk van Kim Meijer (2023)."
)
INSPIRATIE_EN = (
    "The micro – meso – macro distinction is a working definition of the "
    "Lectoraat Ethisch Werken (Fontys), inspired by the work of Kim Meijer (2023)."
)
LIT_NL = (
    "Meijer, K. (2023). Impossible and inevitable: Reconstructing the critique of "
    "business ethics [Proefschrift, Tilburg University]. Ridderprint BV."
)
LIT_EN = (
    "Meijer, K. (2023). Impossible and inevitable: Reconstructing the critique of "
    "business ethics [Doctoral dissertation, Tilburg University]. Ridderprint BV."
)

FOOTER_OLD = [
    "Driedeling micro/meso/macro: werkdefinitie Lectoraat Ethisch Werken, geïnspireerd op Meijer (2023).",
    "Micro/meso/macro distinction: working definition Lectoraat Ethisch Werken, inspired by Meijer (2023).",
    "Micro/meso/macro distinction: working definition Lectoraat Ethisch Werken, inspired by Meijer (2023).",
    "Micro/meso/macro distinction: working definition Lectoraat Ethisch Werken, inspired by Meijer (2023).",
    "Micro/meso/macro distinction: working definition Lectoraat Ethisch Werken, inspired by Meijer (2023).",
    "Micro/meso/macro distinction: working definition Lectoraat Ethisch Werken, inspired by Meijer (2023).",
]

PLAIN_RULES: list[tuple[re.Pattern[str], str]] = [
    (re.compile(r"Complexiteit\s*\(\s*Kim Meijer\s*\)", re.I), "Complexiteit"),
    (re.compile(r"Complexiteit", re.I), "Complexiteit"),
    (re.compile(r"Complexiteit", re.I), "Complexiteit"),
    (
        re.compile(
            r"Complexiteit bepaald met de werkdefinitie van het lectoraat, gebaseerd op het micro-meso-macrodenken van\s*\.",
            re.I,
        ),
        f"Complexiteit bepaald met de driedeling micro – meso – macro. {INSPIRATIE_NL}",
    ),
    (
        re.compile(
            r"De driedeling micro – meso – macro is een werkdefinitie van het Lectoraat Ethisch Werken (Fontys), geïnspireerd op het werk van Kim Meijer (2023).",
            re.I,
        ),
        INSPIRATIE_NL,
    ),
    (
        re.compile(
            r"The micro – meso – macro distinction is a working definition of the Lectoraat Ethisch Werken (Fontys), inspired by the work of Kim Meijer (2023).",
            re.I,
        ),
        INSPIRATIE_EN,
    ),
    (
        re.compile(
            r"Complexiteit \(werkdefinitie Lectoraat Ethisch Werken\)",
            re.I,
        ),
        FOOTER_NL,
    ),
    (
        re.compile(
            r"complexity model \(working definition, Lectoraat Ethisch Werken\)",
            re.I,
        ),
        FOOTER_EN,
    ),
]

LIT_MARKER = re.compile(r"Impossible and inevitable", re.I)
DRIEDELING_MARKER = re.compile(
    r"driedeling|werkdefinitie Lectoraat|micro.meso.macro|micro-meso-macro",
    re.I,
)


def backup_file(src: Path, dry_run: bool) -> None:
    try:
        rel = src.relative_to(ONEDRIVE)
    except ValueError:
        rel = Path(src.name)
    dest = BACKUP / rel
    if dry_run or dest.exists():
        return
    dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dest)


def transform_text(text: str, is_en: bool = False) -> tuple[str, int]:
    n = 0
    for old in FOOTER_OLD:
        if old in text:
            new = FOOTER_EN if old.startswith("Complexity") or "working definition" in old else FOOTER_NL
            if "Komplex" in old or "Model slo" in old or "Kompleks" in old:
                new = FOOTER_EN
            c = text.count(old)
            text = text.replace(old, new)
            n += c
    for rx, repl in PLAIN_RULES:
        text2, c = rx.subn(repl, text)
        if c:
            text = text2
            n += c
    return text, n


def maybe_add_literature_plain(text: str, is_en: bool) -> tuple[str, int]:
    if DRIEDELING_MARKER.search(text) and not LIT_MARKER.search(text):
        lit = LIT_EN if is_en else LIT_NL
        if "Meijer, K. (2023)" not in text:
            return text + "\n\n" + lit, 1
    return text, 0


def patch_office(path: Path, dry_run: bool) -> int:
    is_en = "_EN" in path.name or "teacher" in path.name.lower() or "student-version" in path.name.lower()
    try:
        zin = zipfile.ZipFile(path, "r")
    except zipfile.BadZipFile:
        return 0
    total = 0
    with zin:
        names = zin.namelist()
        blobs = {n: zin.read(n) for n in names}
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
            new, n = transform_text(raw, is_en=is_en)
            if new != raw:
                total += n
                blobs[name] = new.encode("utf-8")
    if total and not dry_run:
        tmp = path.with_suffix(path.suffix + ".tmp")
        with zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as zout:
            for name in names:
                zout.writestr(name, blobs[name])
        tmp.replace(path)
    return total


def process_plain(path: Path, dry_run: bool) -> int:
    is_en = path.name.endswith("_EN.html") or "EN" in path.stem
    text = path.read_text(encoding="utf-8", errors="ignore")
    new, n = transform_text(text, is_en=is_en)
    new, n2 = maybe_add_literature_plain(new, is_en=is_en)
    n += n2
    if n and not dry_run:
        path.write_text(new, encoding="utf-8")
    return n


def should_skip_dir(name: str) -> bool:
    if name in {"node_modules", ".git", "dist", "build", ".cursor", "__pycache__"}:
        return True
    nl = name.lower()
    if nl.startswith("_archief"):
        return True
    if "backup" in nl and "backup_driedeling" not in nl:
        return True
    return False


def iter_roots():
    yield REPO
    yield ONEDRIVE / "Morele werkvormen wereldwijd"
    yield ONEDRIVE / "Gesprekskaarten"
    ethos = ONEDRIVE / r"Cursor projecten/ethos-studio"
    if ethos.exists():
        yield ethos
    claude = ONEDRIVE / "Claude outputs" / "Educatieve werkvormen"
    if claude.exists():
        yield claude


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()
    changed = 0
    ops = 0
    for root in iter_roots():
        for dirpath, dirnames, filenames in os.walk(root):
            dirnames[:] = [d for d in dirnames if not should_skip_dir(d)]
            for fn in filenames:
                path = Path(dirpath) / fn
                if "backup_driedeling" in path.parts:
                    continue
                suf = path.suffix.lower()
                if suf in {".docx", ".pptx", ".xlsx"}:
                    backup_file(path, args.dry_run)
                    n = patch_office(path, args.dry_run)
                elif suf in {".md", ".html", ".js", ".py"}:
                    if "apply-Complexiteit" in fn:
                        continue
                    n = process_plain(path, args.dry_run) if suf != ".js" else 0
                    if suf == ".js" and "complexiteitAttributie" in path.read_text(encoding="utf-8", errors="ignore"):
                        n = 0  # hand-edited
                else:
                    continue
                if n:
                    changed += 1
                    ops += n
    print(f"files_changed={changed} ops={ops} dry_run={args.dry_run}")


if __name__ == "__main__":
    main()
