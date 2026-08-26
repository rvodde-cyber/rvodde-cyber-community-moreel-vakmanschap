#!/usr/bin/env python3
"""Importeer Moreel Woordenboek .docx naar gestructureerde JSON."""

from __future__ import annotations

import json
import re
import unicodedata
from pathlib import Path

from docx import Document

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_DOCX = Path(
    "/home/ubuntu/.cursor/projects/workspace/uploads/Moreel_Woordenboek_def291025_c547.docx"
)
OUT = ROOT / "src/data/woordenboek/entries.json"

ENTRY_RE = re.compile(r"^(.+?)\s*[–\-]\s+(.+)$")

# Heuristische clusters voor didactiek / latere beleidsanalyse
CLUSTER_RULES: list[tuple[str, tuple[str, ...]]] = [
    (
        "integriteit-compliance",
        (
            "integriteit",
            "compliance",
            "gedragscode",
            "onkreukbaarheid",
            "accountability",
            "verantwoording",
            "confidentialiteit",
            "privacy",
            "klokkenluider",
            "correctheid",
            "rechtszekerheid",
        ),
    ),
    (
        "zorg-relatie",
        (
            "zorg",
            "empathie",
            "compassie",
            "mededogen",
            "barmhartigheid",
            "verbondenheid",
            "betrokkenheid",
            "tederheid",
            "troost",
            "gastvrijheid",
            "vriendelijkheid",
            "zorgzaamheid",
            "zorgplicht",
            "zorgvuldigheid",
        ),
    ),
    (
        "moed-verantwoordelijkheid",
        (
            "moed",
            "dapperheid",
            "verantwoordelijkheid",
            "plicht",
            "heldhaftigheid",
            "vrijmoedigheid",
            "volharding",
            "weerbaarheid",
            "veerkracht",
        ),
    ),
    (
        "veiligheid-grensoverschrijding",
        (
            "veiligheid",
            "grensoverschrijdend",
            "discriminatie",
            "intimidatie",
            "pesten",
            "ongewenst",
            "agressie",
            "machts",
            "uitsluiting",
        ),
    ),
    (
        "diversiteit-inclusie",
        (
            "diversiteit",
            "inclusie",
            "inclusiviteit",
            "gelijkheid",
            "gelijkwaardig",
            "tolerantie",
            "ruimdenkendheid",
            "burgerschap",
        ),
    ),
    (
        "transparantie-vertrouwen",
        (
            "transparantie",
            "vertrouwen",
            "betrouwbaarheid",
            "openheid",
            "oprechtheid",
            "eerlijkheid",
            "authenticiteit",
            "congruentie",
        ),
    ),
    (
        "reflectie-oordeel",
        (
            "ethiek",
            "ethisch",
            "reflectie",
            "geweten",
            "oordeel",
            "bewustzijn",
            "kritisch",
            "moreel",
            "moraal",
            "deugd",
            "deontologie",
            "utilitarisme",
            "phronesis",
            "prudentie",
        ),
    ),
    (
        "rechtvaardigheid-macht",
        (
            "rechtvaardigheid",
            "billijk",
            "fair",
            "macht",
            "tirannie",
            "demagogie",
            "hoor en wederhoor",
            "democratisch",
        ),
    ),
]


def slugify(text: str) -> str:
    normalized = unicodedata.normalize("NFKD", text)
    ascii_text = "".join(c for c in normalized if not unicodedata.combining(c))
    slug = re.sub(r"[^a-z0-9]+", "-", ascii_text.lower()).strip("-")
    return slug or "term"


def letter_of(term: str) -> str:
    first = term[0].upper()
    if first in "ÀÁÂÃÄÅ":
        return "A"
    if first in "ÈÉÊË":
        return "E"
    if first in "ÌÍÎÏ":
        return "I"
    if first in "ÒÓÔÕÖ":
        return "O"
    if first in "ÙÚÛÜ":
        return "U"
    if first.isalpha():
        return first
    return "#"


def clusters_for(term: str, definition: str) -> list[str]:
    hay = f"{term} {definition}".lower()
    found = [name for name, keys in CLUSTER_RULES if any(k in hay for k in keys)]
    return found or ["algemeen"]


def parse_entries(docx_path: Path) -> list[dict]:
    doc = Document(str(docx_path))
    raw: list[tuple[str, str]] = []
    for para in doc.paragraphs:
        if para.style and para.style.name.startswith("Heading"):
            continue
        for line in para.text.split("\n"):
            line = line.strip()
            if not line or line in {"A", "B", "C"} or (len(line) == 1 and line.isalpha()):
                continue
            match = ENTRY_RE.match(line)
            if not match:
                continue
            term = match.group(1).strip()
            definition = match.group(2).strip()
            if len(term) <= 1:
                continue
            raw.append((term, definition))

    # Dedup op genormaliseerde term; behoud langste definitie
    by_key: dict[str, tuple[str, str]] = {}
    for term, definition in raw:
        key = term.lower()
        if key not in by_key or len(definition) > len(by_key[key][1]):
            by_key[key] = (term, definition)

    entries: list[dict] = []
    used_ids: set[str] = set()
    for term, definition in sorted(by_key.values(), key=lambda item: item[0].lower()):
        base = slugify(term)
        entry_id = base
        n = 2
        while entry_id in used_ids:
            entry_id = f"{base}-{n}"
            n += 1
        used_ids.add(entry_id)
        entries.append(
            {
                "id": entry_id,
                "term_nl": term,
                "definition_nl": definition,
                "term_en": None,
                "definition_en": None,
                "letter": letter_of(term),
                "clusters": clusters_for(term, definition),
                "status": "active",
                "source": "moreel-woordenboek-def291025",
            }
        )
    return entries


def main() -> None:
    docx_path = DEFAULT_DOCX
    if not docx_path.exists():
        alt = ROOT / "docs" / "Moreel_Woordenboek_def291025.docx"
        if alt.exists():
            docx_path = alt
        else:
            raise SystemExit(f"Bronbestand niet gevonden: {DEFAULT_DOCX}")

    entries = parse_entries(docx_path)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "meta": {
            "title_nl": "Moreel Woordenboek",
            "title_en": "Moral Dictionary",
            "version": "def291025",
            "count": len(entries),
            "intro_nl": (
                "Dit Moreel Woordenboek brengt morele waarden en begrippen samen die vaak "
                "voorkomen in beleid, gedragscodes en discussies over integriteit en sociale veiligheid."
            ),
            "intro_en": (
                "This Moral Dictionary brings together moral values and concepts that often appear "
                "in policy, codes of conduct, and conversations about integrity and social safety."
            ),
        },
        "clusters": [
            {"id": name, "label_nl": name.replace("-", " ").capitalize(), "label_en": name}
            for name, _ in CLUSTER_RULES
        ]
        + [{"id": "algemeen", "label_nl": "Algemeen", "label_en": "General"}],
        "entries": entries,
    }
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {len(entries)} entries → {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
