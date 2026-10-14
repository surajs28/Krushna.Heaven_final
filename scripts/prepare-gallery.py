"""Create responsive WebP copies; keep the client-supplied originals untouched.

Run with a Python environment that has Pillow installed.
"""
from pathlib import Path
from PIL import Image, ImageOps

source = Path(__file__).resolve().parents[1] / "public/assets/krushna/gallery"
destination = source / "responsive"
destination.mkdir(exist_ok=True)
for path in sorted(source.glob("*.webp")):
    with Image.open(path) as original:
        image = ImageOps.exif_transpose(original).convert("RGB")
        for width in (480, 800):
            if width >= image.width:
                continue
            height = round(image.height * width / image.width)
            image.resize((width, height), Image.Resampling.LANCZOS).save(
                destination / f"{path.stem}-{width}.webp",
                "WEBP", quality=84, method=6,
            )
