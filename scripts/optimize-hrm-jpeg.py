"""Resize/compress HRM JPEG for web (max width, quality)."""
import sys
from pathlib import Path

from PIL import Image

src, dst, max_w = Path(sys.argv[1]), Path(sys.argv[2]), int(sys.argv[3])
im = Image.open(src)
im = im.convert("RGB")
if im.width > max_w:
    h = max(1, int(im.height * max_w / im.width))
    im = im.resize((max_w, h), Image.Resampling.LANCZOS)
dst.parent.mkdir(parents=True, exist_ok=True)
im.save(dst, "JPEG", quality=82, optimize=True, progressive=True)
