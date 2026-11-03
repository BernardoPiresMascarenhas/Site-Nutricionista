# Compara capturas de referência com as atuais. Uso: python3 scripts/diff.py <pasta_ref> <pasta_atual>
import sys, glob, os
from PIL import Image, ImageChops
ref, cur = sys.argv[1], sys.argv[2]
bad = 0
fs = sorted(glob.glob(ref + "/*.png"))
for f in fs:
    g = os.path.join(cur, os.path.basename(f))
    if not os.path.exists(g):
        print("faltando", os.path.basename(f)); bad += 1; continue
    a, b = Image.open(f).convert("RGB"), Image.open(g).convert("RGB")
    if a.size != b.size:
        print("tamanho diferente", os.path.basename(f), a.size, b.size); bad += 1; continue
    d = ImageChops.difference(a, b).convert("L").point(lambda v: 255 if v > 24 else 0)
    n = d.histogram()[255]
    if n > 50:
        bad += 1; print("DIFERENTE", os.path.basename(f), n, "px", d.getbbox())
extra = len(glob.glob(cur + "/*.png")) - len(fs)
print(f"{len(fs)} telas comparadas, {bad} com diferença" + (f", {extra} telas a mais" if extra else ""))
