"""Genera las miniaturas giratorias del catálogo desde los visores 3D reales.

Uso (con el servidor local en marcha: node tools/dev-server.cjs):
  python tools/build-turntables.py
Requiere: pip install playwright pillow ; playwright install chromium (o Chrome instalado).
Salida en protoboard-ah/turntable/: <clave>.webp (tira de cuadros), <clave>-poster.webp
(cuadro central) y turntable.json (cuadros, tamaño y color de fondo).
"""
import asyncio, io, json, os, sys
from PIL import Image, ImageChops
from playwright.async_api import async_playwright

BASE = os.environ.get('PROTOBOARD_QA_URL', 'http://127.0.0.1:4173')
CHROME = os.environ.get('PROTOBOARD_CHROME')
OUT = os.path.join(os.path.dirname(__file__), '..', 'protoboard-ah', 'turntable')
PAGES = [('descendente', '/contador-descendente'), ('contador', '/contador'), ('puerta', '/puerta-catodo'), ('555', '/555'), ('letras', '/')]
ZOOM_OUT = {}
VIEWPORT = {}  # tamaño de captura por circuito si hiciera falta
STEPS = 6            # cuadros a cada lado del centro
STEP = 1 / 6         # rotate(1) = 30°, así que 1/6 = 5°
W, H = 1440, 900     # captura
FW, FH = 720, 380    # cuadro final (proporción 1.9)

SETUP = ("document.querySelector('.brand-intro')?.remove();"
         "selectStep(model.stages.length-1,false,{guided:false});"
         "const c=document.querySelector('#cumulative');if(c)c.checked=true;"
         "try{visibility()}catch(e){};try{view='all'}catch(e){};setRenderer('3d');try{setCamera()}catch(e){}")
HIDE = (".canvas-caption,.studio-inspector,.map-loupe,.detail-loupe,.learning-placement-card,.lesson-signal-card,"
        ".showcase-viewer-cover,.taller-stepdock,.design-complete,.assembly-island,.map-nav,.viewer-test,.three-status,"
        ".component-assembly-panel,.assembly-footer,.close-expanded,.map-context,.three-hologram,.hologram{display:none!important}")

def bbox(im, bg):
    diff = ImageChops.difference(im, Image.new('RGB', im.size, bg)).convert('L').point(lambda v: 255 if v > 22 else 0)
    return diff.getbbox()

async def capture(page, key, route):
    await page.goto(BASE + route)
    await page.wait_for_function("typeof selectStep==='function'&&typeof setRenderer==='function'&&!!document.querySelector('.taller-bar')", timeout=30000)
    await page.wait_for_timeout(800)
    await page.evaluate(SETUP)
    await page.wait_for_function("typeof board3d!=='undefined'&&board3d&&document.querySelector('.mapbox')?.classList.contains('in-3d')", timeout=60000)
    await page.click('#expand')
    await page.wait_for_function("document.body.classList.contains('fullscreen')")
    await page.add_style_tag(content=HIDE)
    await page.wait_for_timeout(900)
    await page.evaluate("try{setCamera()}catch(e){};window.dispatchEvent(new Event('resize'))")
    await page.wait_for_timeout(1500)
    canvas = page.locator('#threeViewport canvas').first
    if ZOOM_OUT.get(key):  # alejar la cámara si el encuadre recorta las placas
        box = await canvas.bounding_box()
        await page.mouse.move(box['x'] + box['width'] / 2, box['y'] + box['height'] / 2)
        for _ in range(ZOOM_OUT[key]):
            await page.mouse.wheel(0, 120); await page.wait_for_timeout(120)
        await page.wait_for_timeout(800)
    await page.evaluate("board3d.rotate(%f)" % (-STEPS * STEP))
    shots = []
    for i in range(2 * STEPS + 1):
        await page.wait_for_timeout(450)
        shots.append(Image.open(io.BytesIO(await canvas.screenshot())).convert('RGB'))
        if i < 2 * STEPS:
            await page.evaluate("board3d.rotate(%f)" % STEP)
    return shots

def compose(key, shots):
    bg = shots[len(shots) // 2].getpixel((80, 80))
    for s in shots:  # las esquinas del visor llevan marcas de encuadre
        w, h = s.size
        for x, y in ((0, 0), (w - 70, 0), (0, h - 70), (w - 70, h - 70)):
            s.paste(bg, (x, y, x + 70, y + 70))
    boxes = [b for b in (bbox(s, bg) for s in shots) if b]
    x0, y0 = min(b[0] for b in boxes), min(b[1] for b in boxes)
    x1, y1 = max(b[2] for b in boxes), max(b[3] for b in boxes)
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    w, h = (x1 - x0) * 1.08, (y1 - y0) * 1.12
    ratio = FW / FH
    if w / h < ratio: w = h * ratio
    else: h = w / ratio
    box = (round(cx - w / 2), round(cy - h / 2), round(cx + w / 2), round(cy + h / 2))
    frames = []
    for s in shots:
        canvas = Image.new('RGB', (box[2] - box[0], box[3] - box[1]), bg)
        canvas.paste(s, (-box[0], -box[1]))
        frames.append(canvas.resize((FW, FH), Image.LANCZOS))
    strip = Image.new('RGB', (FW * len(frames), FH), bg)
    for i, f in enumerate(frames):
        strip.paste(f, (i * FW, 0))
    strip.save(os.path.join(OUT, key + '.webp'), 'WEBP', quality=74, method=6)
    frames[STEPS].save(os.path.join(OUT, key + '-poster.webp'), 'WEBP', quality=82, method=6)
    return {'frames': len(frames), 'width': FW, 'height': FH, 'background': '#%02x%02x%02x' % bg[:3],
            'bytes': os.path.getsize(os.path.join(OUT, key + '.webp'))}

async def main():
    os.makedirs(OUT, exist_ok=True)
    only = sys.argv[1:]
    manifest_path = os.path.join(OUT, 'turntable.json')
    manifest = json.load(open(manifest_path)) if os.path.exists(manifest_path) else {}
    async with async_playwright() as p:
        args = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader']
        browser = await (p.chromium.launch(executable_path=CHROME, args=args) if CHROME else p.chromium.launch(args=args))
        ctx = await browser.new_context(viewport={'width': W, 'height': H}, device_scale_factor=1)
        await ctx.add_init_script("localStorage.setItem('protoboards:appearance:v1',JSON.stringify({theme:'paper',rev:2,effects:'off',quality:'sharp'}))")
        for key, route in PAGES:
            if only and key not in only: continue
            page = await ctx.new_page()
            vw, vh = VIEWPORT.get(key, (W, H))
            await page.set_viewport_size({'width': vw, 'height': vh})
            shots = await capture(page, key, route)
            manifest[key] = compose(key, shots)
            print(key, manifest[key])
            await page.close()
        await browser.close()
    json.dump(manifest, open(manifest_path, 'w'), indent=2)

asyncio.run(main())
