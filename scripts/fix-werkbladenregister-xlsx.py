"""Update 08_werkbladenregister.xlsx text cells per driedeling rules (C)."""
from __future__ import annotations

from pathlib import Path

import openpyxl

XLSX = Path(
    r"C:\Users\876409\OneDrive - Office 365 Fontys\Claude outputs\Educatieve werkvormen\08_werkbladenregister.xlsx"
)

REPLACEMENTS = [
    ("Complexiteit (Kim Meijer)", "Complexiteit"),
    ("Complexiteitsmodel", "Complexiteit"),
]


def main() -> None:
    if not XLSX.exists():
        print("missing", XLSX)
        return
    wb = openpyxl.load_workbook(XLSX)
    changed = 0
    headers: list[str] = []
    for ws in wb.worksheets:
        for row in ws.iter_rows():
            for cell in row:
                if cell.row == 1 and isinstance(cell.value, str):
                    headers.append(cell.value)
                v = cell.value
                if not isinstance(v, str):
                    continue
                new = v
                for old, new_s in REPLACEMENTS:
                    if old in new:
                        new = new.replace(old, new_s)
                if new != v:
                    cell.value = new
                    changed += 1
    wb.save(XLSX)
    print(f"cells_changed={changed}")
    for h in headers:
        if h and ("kim_meijer" in h.lower() or "complexiteit_kim" in h.lower()):
            print("HEADER_REPORT_ONLY:", h)


if __name__ == "__main__":
    main()
