# -*- coding: utf-8 -*-
"""Koppel Firefly-exportbestanden aan kaarten via prompttekst en kopieer naar public/."""
from __future__ import annotations

import json
import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = Path(
    r"C:\Users\876409\OneDrive - Office 365 Fontys\Gesprekskaarten"
    r"\afbeeldingen voor 58 gesprekskaarten die op de site staan"
)
OUT = ROOT / "public/images/gesprekskaarten"
CARDS_PATH = ROOT / "src/data/gesprekskaarten/cards.json"


def prompt_key(card: dict) -> str:
    p = card.get("assets", {}).get("fireflyPrompt") or ""
    return p.split(". Photorealistic")[0].strip().lower()


def normalize_firefly_filename(stem: str) -> str:
    desc = stem[len("Firefly_") :] if stem.startswith("Firefly_") else stem
    return re.sub(r"\s+\d{5,}$", "", desc).strip().lower()


def match_card_id(desc: str, prompt_to_id: dict[str, str]) -> str | None:
    for pk, cid in prompt_to_id.items():
        if pk.startswith(desc) or desc.startswith(pk[: min(len(desc), 50)]):
            return cid
    best_id = None
    best_len = 0
    for pk, cid in prompt_to_id.items():
        n = 0
        for a, b in zip(desc, pk):
            if a == b:
                n += 1
            else:
                break
        if n > best_len:
            best_len = n
            best_id = cid
    return best_id if best_len >= 30 else None


def main() -> int:
    if not SRC.is_dir():
        print(f"Bronmap niet gevonden: {SRC}", file=sys.stderr)
        return 1

    cards = json.loads(CARDS_PATH.read_text(encoding="utf-8"))
    by_id = {c["id"]: c for c in cards}
    prompt_to_id = {prompt_key(c): c["id"] for c in cards}

    OUT.mkdir(parents=True, exist_ok=True)
    report: list[str] = []
    ok = 0

    for f in sorted(SRC.iterdir()):
        if f.suffix.lower() not in (".jpg", ".jpeg", ".png"):
            continue
        if not f.name.startswith("Firefly_"):
            continue

        desc = normalize_firefly_filename(f.stem)
        cid = match_card_id(desc, prompt_to_id)
        if not cid:
            report.append(f"GEEN MATCH: {f.name}")
            continue

        card = by_id[cid]
        dest = OUT / Path(card["assets"]["afbeelding"]).name
        shutil.copy2(f, dest)
        card["meta"]["afbeeldingStatus"] = "firefly (nieuw)"
        card["meta"]["afbeeldingBron"] = f.name
        report.append(f"OK {cid} -> {dest.name}")
        ok += 1

    CARDS_PATH.write_text(
        json.dumps(cards, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print("\n".join(report))
    print(f"Klaar: {ok} afbeeldingen gekoppeld.")
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
