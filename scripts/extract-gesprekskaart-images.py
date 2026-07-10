"""Extraheer kaartafbeeldingen uit bron-DOCX naar public/images/gesprekskaarten/."""
from __future__ import annotations

import json
import re
import shutil
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public/images/gesprekskaarten"
CARDS_PATH = ROOT / "src/data/gesprekskaarten/cards.json"

DECORATIVE = {
    "image2.png",
    "image3.jpeg",
    "image4.png",
    "image5.png",
    "image6.png",
    "image7.png",
    "image13.png",
}

ONEDRIVE = Path(r"C:\Users\876409\OneDrive - Office 365 Fontys")
PRINTS = ONEDRIVE / "Ethisch werken/prints"

BUNDLE_SOURCES = {
    "GK_NM": {
        "docx": Path(r"C:\Users\876409\Downloads\heroes kaarten\gesprekskaarten_nuclear_medicine.docx"),
        "count": 4,
        "min_size": 100_000,
    },
    "GK_RI": {
        "docx": Path(r"C:\Users\876409\Downloads\heroes kaarten\gesprekskaarten_research_integrity_1.docx"),
        "count": 3,
        "min_size": 100_000,
    },
    "GK_OW": {
        "docx": Path(r"C:\Users\876409\Downloads\Gesprekskaarten_Onderwijs_v3.docx"),
        "count": 10,
        "min_size": 100_000,
    },
}

DL_SOURCES = {
    "GK_DL_01": PRINTS / "DL1 Hulp.docx",
    "GK_DL_02": PRINTS / "DL2 Vriend rijdt onder invloed van alcohol.docx",
    "GK_DL_03": PRINTS / "DL3 Buurman dumpt afval in het park.docx",
    "GK_DL_04": PRINTS / "DL4 Vriend pleegt winkeldiefstal.docx",
    "GK_DL_05": PRINTS / "DL5 Buurvrouw laat kinderen vaak alleen thuis.docx",
    "GK_DL_06": PRINTS / "DL6 Vriend rijdt te hard en overtreedt verkeersregels.docx",
    "GK_DL_07": PRINTS / "Dl7 Portemonnee.docx",
    "GK_DL_08": PRINTS / "DL8 roddel.docx",
    "GK_DL_09": PRINTS / "DL9 geleend geld.docx",
    "GK_DL_10": PRINTS / "DL10 Reviews.docx",
    "GK_DL_11": PRINTS / "DL11 Buurman mishandelt zijn vrouw.docx",
}


def ordered_images(docx_path: Path) -> list[tuple[str, int]]:
    with zipfile.ZipFile(docx_path) as z:
        rels = ET.fromstring(z.read("word/_rels/document.xml.rels"))
        rid_to_target = {
            rel.get("Id"): rel.get("Target", "").replace("../", "")
            for rel in rels
            if rel.get("Target") and "media/" in rel.get("Target", "")
        }
        doc = ET.fromstring(z.read("word/document.xml"))
        ordered: list[tuple[str, int]] = []
        for blip in doc.iter("{http://schemas.openxmlformats.org/drawingml/2006/main}blip"):
            rid = blip.get("{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed")
            if not rid or rid not in rid_to_target:
                continue
            media = rid_to_target[rid]
            info = next(i for i in z.infolist() if i.filename.endswith(media.split("/")[-1]))
            ordered.append((media, info.file_size))
        return ordered


def card_images_from_bundle(
    docx_path: Path,
    *,
    min_size: int = 60_000,
    skip_cover: bool = False,
) -> list[str]:
    ordered = ordered_images(docx_path)
    seen: set[str] = set()
    cards: list[str] = []
    for media, size in ordered:
        base = media.split("/")[-1]
        if base in DECORATIVE or size < min_size:
            continue
        if base in seen:
            continue
        seen.add(base)
        cards.append(media)
    if skip_cover and cards:
        cards = cards[1:]
    return cards


def largest_image_from_single(docx_path: Path, min_size: int = 50_000) -> str | None:
    ordered = ordered_images(docx_path)
    candidates = [(m, s) for m, s in ordered if s >= min_size]
    if not candidates:
        candidates = ordered
    if not candidates:
        return None
    return max(candidates, key=lambda x: x[1])[0]


def extract_media_file(docx_path: Path, media_rel: str, dest: Path) -> None:
    with zipfile.ZipFile(docx_path) as z:
        filename = media_rel.split("/")[-1]
        entry = next(i for i in z.infolist() if i.filename.endswith(filename))
        dest.parent.mkdir(parents=True, exist_ok=True)
        with z.open(entry) as src, open(dest, "wb") as out:
            shutil.copyfileobj(src, out)


def ext_for_media(media_rel: str) -> str:
    suffix = Path(media_rel).suffix.lower()
    return suffix if suffix in {".jpg", ".jpeg", ".png", ".webp"} else ".jpg"


def link_cards(card_ids: list[str]) -> int:
    cards = json.loads(CARDS_PATH.read_text(encoding="utf-8"))
    by_id = {c["id"]: c for c in cards}
    linked = 0
    for card_id in card_ids:
        card = by_id.get(card_id)
        if not card:
            continue
        for ext in (".jpg", ".jpeg", ".png", ".webp"):
            rel = f"/images/gesprekskaarten/{card_id}{ext}"
            if (ROOT / "public" / rel.lstrip("/")).exists():
                card.setdefault("assets", {})["afbeelding"] = rel
                linked += 1
                break
    CARDS_PATH.write_text(json.dumps(cards, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    return linked


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    extracted: dict[str, str] = {}

    # GK_MM_01..15 uit teaser-bundel
    teaser = ROOT / "public/downloads/gesprekskaarten/GK_MM_Teaser_NL.docx"
    mm_media = card_images_from_bundle(teaser, skip_cover=True)
    if len(mm_media) != 15:
        raise SystemExit(f"Verwacht 15 teaser-afbeeldingen, gevonden {len(mm_media)}")
    for i, media in enumerate(mm_media, start=1):
        card_id = f"GK_MM_{i:02d}"
        ext = ext_for_media(media)
        dest = OUT_DIR / f"{card_id}{ext}"
        extract_media_file(teaser, media, dest)
        extracted[card_id] = str(dest.relative_to(ROOT))

    # GK_BG_01..15 uit burgerschap-bundel
    bg_docx = ONEDRIVE / "burgerschapskaarten/gesprekskaarten burgerschap.docx"
    bg_media = card_images_from_bundle(bg_docx, min_size=100_000)
    if len(bg_media) != 15:
        raise SystemExit(f"Verwacht 15 burgerschap-afbeeldingen, gevonden {len(bg_media)}")
    for i, media in enumerate(bg_media, start=1):
        card_id = f"GK_BG_{i:02d}"
        ext = ext_for_media(media)
        dest = OUT_DIR / f"{card_id}{ext}"
        extract_media_file(bg_docx, media, dest)
        extracted[card_id] = str(dest.relative_to(ROOT))

    # GK_DL_01..11 uit losse prints-DOCX
    for card_id, docx_path in DL_SOURCES.items():
        if not docx_path.exists():
            raise SystemExit(f"Bron ontbreekt: {docx_path}")
        media = largest_image_from_single(docx_path)
        if not media:
            raise SystemExit(f"Geen afbeelding in {docx_path.name}")
        ext = ext_for_media(media)
        dest = OUT_DIR / f"{card_id}{ext}"
        extract_media_file(docx_path, media, dest)
        extracted[card_id] = str(dest.relative_to(ROOT))

    for prefix, cfg in BUNDLE_SOURCES.items():
        docx_path = cfg["docx"]
        if not docx_path.exists():
            raise SystemExit(f"Bron ontbreekt: {docx_path}")
        media_list = card_images_from_bundle(docx_path, min_size=cfg["min_size"])
        if len(media_list) != cfg["count"]:
            raise SystemExit(f"Verwacht {cfg['count']} afbeeldingen voor {prefix}, gevonden {len(media_list)}")
        for i, media in enumerate(media_list, start=1):
            card_id = f"{prefix}_{i:02d}"
            ext = ext_for_media(media)
            dest = OUT_DIR / f"{card_id}{ext}"
            extract_media_file(docx_path, media, dest)
            extracted[card_id] = str(dest.relative_to(ROOT))

    linked = link_cards(list(extracted.keys()))
    print(f"Geëxtraheerd: {len(extracted)} afbeeldingen -> {OUT_DIR}")
    for card_id, path in extracted.items():
        print(f"  {card_id}: {path}")
    print(f"Gekoppeld in cards.json: {linked}")


if __name__ == "__main__":
    main()
