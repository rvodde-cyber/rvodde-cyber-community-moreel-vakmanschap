"""
Audit corrupt docx, add Meijer (2023) literature via python-docx, report JSON/CSV.
Usage:
  python scripts/driedeling-docx-audit-fix.py audit
  python scripts/driedeling-docx-audit-fix.py fix-literature [--dry-run]
  python scripts/driedeling-docx-audit-fix.py restore-corrupt
"""
from __future__ import annotations

import argparse
import json
import os
import re
import shutil
import zipfile
from pathlib import Path

ONEDRIVE = Path(r"C:\Users\876409\OneDrive - Office 365 Fontys")
REPO = ONEDRIVE / r"Cursor projecten/rvodde-cyber-community-moreel-vakmanschap"
BACKUP_DRIEDEL = REPO / "_archief" / "backup_driedeling"
BACKUP_NAAM = REPO / "_archief" / "backup_voor_naamswijziging"
REPORT_DIR = REPO / "_archief" / "driedeling_reports"

LIT_NL = (
    "Meijer, K. (2023). Impossible and inevitable: Reconstructing the critique of "
    "business ethics [Proefschrift, Tilburg University]. Ridderprint BV."
)
LIT_EN = (
    "Meijer, K. (2023). Impossible and inevitable: Reconstructing the critique of "
    "business ethics [Doctoral dissertation, Tilburg University]. Ridderprint BV."
)
LIT_KEY = "Meijer, K. (2023)"
DRIEDELING_RE = re.compile(
    r"driedeling|micro\s*[–-]\s*meso\s*[–-]\s*macro|micro/meso/macro|"
    r"werkdefinitie Lectoraat Ethisch Werken",
    re.I,
)
LIT_SECTION_RE = re.compile(
    r"^literatuur|^references|^bibliography|^bronvermelding|^bronnen\b",
    re.I,
)

FOOTER_NL = (
    "Driedeling micro/meso/macro: werkdefinitie Lectoraat Ethisch Werken, "
    "geïnspireerd op Meijer (2023)."
)
FOOTER_EN = (
    "Micro/meso/macro distinction: working definition Lectoraat Ethisch Werken, "
    "inspired by Meijer (2023)."
)


def iter_roots():
    yield REPO
    for p in (
        ONEDRIVE / "Morele werkvormen wereldwijd",
        ONEDRIVE / "Gesprekskaarten",
        ONEDRIVE / "Claude outputs" / "Educatieve werkvormen",
    ):
        if p.exists():
            yield p


def should_skip_dir(name: str) -> bool:
    if name in {"node_modules", ".git", "dist", "build", ".cursor", "__pycache__"}:
        return True
    nl = name.lower()
    if nl.startswith("_archief"):
        return True
    if "backup" in nl:
        return True
    return False


def backup_path_for(src: Path) -> Path | None:
    for root in (BACKUP_DRIEDEL, BACKUP_NAAM):
        try:
            rel = src.relative_to(ONEDRIVE)
        except ValueError:
            if src.is_relative_to(REPO):
                rel = Path("Cursor projecten/rvodde-cyber-community-moreel-vakmanschap") / src.relative_to(REPO)
            else:
                continue
        cand = root / rel
        if cand.exists():
            return cand
    return None


def zip_ok(path: Path) -> tuple[bool, str]:
    try:
        with zipfile.ZipFile(path, "r") as z:
            bad = z.testzip()
            if bad:
                return False, f"testzip failed: {bad}"
        return True, ""
    except zipfile.BadZipFile as e:
        return False, f"BadZipFile: {e}"
    except Exception as e:
        return False, str(e)


def docx_text(path: Path) -> str | None:
    try:
        from docx import Document
    except ImportError:
        return None
    try:
        doc = Document(path)
    except Exception:
        return None
    parts = [p.text for p in doc.paragraphs]
    for section in doc.sections:
        for p in section.footer.paragraphs:
            parts.append(p.text)
    return "\n".join(parts)


def is_en_doc(path: Path) -> bool:
    n = path.name.upper()
    return (
        "_EN" in n
        or "TEACHER" in n
        or "STUDENT-VERSION" in n
        or n.endswith("_EN.DOCX")
    )


def audit_corrupt() -> list[dict]:
    rows = []
    for root in iter_roots():
        for dirpath, dirnames, filenames in os.walk(root):
            dirnames[:] = [d for d in dirnames if not should_skip_dir(d)]
            for fn in filenames:
                if not fn.lower().endswith(".docx"):
                    continue
                path = Path(dirpath) / fn
                ok, err = zip_ok(path)
                if ok:
                    continue
                bd = backup_path_for(path)
                bd_ok, bd_err = (False, "no backup")
                if bd:
                    bd_ok, bd_err = zip_ok(bd)
                if bd_ok:
                    verdict = "batch_likely_broke_restore_from_backup_driedeling"
                elif bd and not bd_ok:
                    verdict = "already_corrupt_in_backup_driedeling"
                else:
                    bn = backup_path_for(path)
                    verdict = "corrupt_no_good_backup"
                rows.append(
                    {
                        "path": str(path),
                        "error": err,
                        "backup": str(bd) if bd else "",
                        "backup_ok": bd_ok,
                        "verdict": verdict,
                    }
                )
    return rows


def find_literature_candidates() -> list[dict]:
    rows = []
    for root in iter_roots():
        for dirpath, dirnames, filenames in os.walk(root):
            dirnames[:] = [d for d in dirnames if not should_skip_dir(d)]
            for fn in filenames:
                if not fn.lower().endswith(".docx"):
                    continue
                path = Path(dirpath) / fn
                if not zip_ok(path)[0]:
                    continue
                text = docx_text(path)
                if not text:
                    continue
                if not DRIEDELING_RE.search(text):
                    continue
                if LIT_KEY in text or re.search(r"Impossible and inevitable", text, re.I):
                    continue
                from docx import Document

                doc = Document(path)
                has_section = any(
                    LIT_SECTION_RE.match(p.text.strip())
                    for p in doc.paragraphs
                    if p.text.strip()
                )
                rows.append(
                    {
                        "path": str(path),
                        "is_en": is_en_doc(path),
                        "has_literature_section": has_section,
                    }
                )
    return rows


def sort_key_author(line: str) -> str:
    m = re.match(r"^([^,(]+)", line.strip())
    return (m.group(1).strip().lower() if m else line.lower())


def insert_literature(path: Path, dry_run: bool) -> str:
    from docx import Document
    from docx.oxml import OxmlElement
    from docx.text.paragraph import Paragraph

    is_en = is_en_doc(path)
    lit_line = LIT_EN if is_en else LIT_NL
    doc = Document(path)
    full = "\n".join(p.text for p in doc.paragraphs)

    lit_start = None
    for i, p in enumerate(doc.paragraphs):
        t = p.text.strip()
        if LIT_SECTION_RE.match(t) or t.lower() in {"literatuur", "references", "bibliography"}:
            lit_start = i + 1
            break
    if lit_start is None:
        return "no_literature_section"

    entries: list[tuple[int, str, Paragraph]] = []
    j = lit_start
    while j < len(doc.paragraphs):
        t = doc.paragraphs[j].text.strip()
        if not t:
            j += 1
            continue
        if re.match(r"^(bijlage|appendix|noten|notes)\b", t, re.I):
            break
        entries.append((j, t, doc.paragraphs[j]))
        j += 1
    if not entries:
        return "empty_literature_section"

    if any(LIT_KEY in e[1] for e in entries):
        return "already_present"

    insert_at = lit_start
    for idx, text, _ in entries:
        if sort_key_author(lit_line) < sort_key_author(text):
            insert_at = idx
            break
    else:
        insert_at = entries[-1][0] + 1

    if dry_run:
        return f"would_insert_at_para_{insert_at}"

    ref_para = doc.paragraphs[min(insert_at, len(doc.paragraphs) - 1)]
    new_p = OxmlElement("w:p")
    ref_para._p.addprevious(new_p)
    para = Paragraph(new_p, ref_para._parent)
    para.text = ""
    run = para.add_run(lit_line)
    run.italic = True
    if entries:
        ref_style = entries[0][2].style
        try:
            para.style = ref_style
        except Exception:
            pass

    doc.save(path)
    return "inserted"


def patch_footer_docx(path: Path) -> int:
    from docx import Document

    is_en = is_en_doc(path)
    target = FOOTER_EN if is_en else FOOTER_NL
    old_patterns = [
        "Complexiteitsmodel (werkdefinitie Lectoraat Ethisch Werken)",
        'Complexiteitsmodel: Kim Meijer',
        "Complexity model (working definition, Lectoraat Ethisch Werken)",
        'Complexity model: Kim Meijer',
    ]
    doc = Document(path)
    n = 0
    for section in doc.sections:
        for p in section.footer.paragraphs:
            for old in old_patterns:
                if old in p.text:
                    p.text = p.text.replace(old, target)
                    n += 1
            if "Complexiteitsmodel" in p.text or "Complexity model" in p.text:
                if target not in p.text:
                    p.text = target
                    n += 1
    if n:
        doc.save(path)
    return n


def restore_corrupt(rows: list[dict]) -> list[dict]:
    out = []
    for row in rows:
        if row["verdict"] != "batch_likely_broke_restore_from_backup_driedeling":
            continue
        src = Path(row["path"])
        bak = Path(row["backup"])
        shutil.copy2(bak, src)
        patch_footer_docx(src)
        out.append({"path": str(src), "action": "restored_and_footer_patched"})
    return out


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("command", choices=["audit", "fix-literature", "restore-corrupt"])
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()
    REPORT_DIR.mkdir(parents=True, exist_ok=True)

    if args.command == "audit":
        corrupt = audit_corrupt()
        lit_missing = find_literature_candidates()
        (REPORT_DIR / "corrupt_docx.json").write_text(
            json.dumps(corrupt, indent=2, ensure_ascii=False), encoding="utf-8"
        )
        (REPORT_DIR / "literature_missing.json").write_text(
            json.dumps(lit_missing, indent=2, ensure_ascii=False), encoding="utf-8"
        )
        print(f"corrupt={len(corrupt)} literature_candidates={len(lit_missing)}")
        return

    if args.command == "restore-corrupt":
        corrupt = json.loads((REPORT_DIR / "corrupt_docx.json").read_text(encoding="utf-8"))
        restored = restore_corrupt(corrupt)
        (REPORT_DIR / "restored.json").write_text(
            json.dumps(restored, indent=2, ensure_ascii=False), encoding="utf-8"
        )
        print(f"restored={len(restored)}")
        return

    if args.command == "fix-literature":
        if not (REPORT_DIR / "literature_missing.json").exists():
            find_literature_candidates()
        candidates = json.loads(
            (REPORT_DIR / "literature_missing.json").read_text(encoding="utf-8")
        )
        results = []
        for c in candidates:
            path = Path(c["path"])
            if not c.get("has_literature_section"):
                results.append({"path": c["path"], "status": "no_literature_section"})
                continue
            status = insert_literature(path, dry_run=args.dry_run)
            results.append({"path": c["path"], "status": status})
        (REPORT_DIR / "literature_fix_results.json").write_text(
            json.dumps(results, indent=2, ensure_ascii=False), encoding="utf-8"
        )
        inserted = sum(1 for r in results if r["status"] == "inserted")
        print(f"processed={len(results)} inserted={inserted} dry_run={args.dry_run}")


if __name__ == "__main__":
    main()
