from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from pathlib import Path
from fastapi.responses import JSONResponse

app = FastAPI()

# Configura onde estão os arquivos estáticos (CSS, JS)
app.mount("/static", StaticFiles(directory="app/static"), name="static")

# Configura onde estão os arquivos HTML
templates = Jinja2Templates(directory="templates")


@app.api_route("/", response_class=HTMLResponse, methods=["GET", "HEAD"])
async def read_root(request: Request):
    """Return the OnBoarding.html file directly to avoid Jinja2 cache issues."""
    # Use caminhos relativos mais robustos para o ambiente Linux do Render
    base = Path(__file__).resolve().parent.parent.parent # Ajusta para subir os níveis corretos
    tpl = base / "templates" / "OnBoarding.html"
    
    if tpl.exists():
        return HTMLResponse(tpl.read_text(encoding="utf-8"))
    return HTMLResponse(f"<h1>OnBoarding not found at {tpl}</h1>", status_code=404)

@app.get("/dashboard", response_class=HTMLResponse)
async def dashboard(request: Request):
    """Return the dashboard.html file."""
    base = Path(__file__).resolve().parents[2]  # project root (f:/eyecare)
    tpl = base / "templates" / "dashboard.html"
    if tpl.exists():
        return HTMLResponse(tpl.read_text(encoding="utf-8"))
    return HTMLResponse("<h1>Dashboard not found</h1>", status_code=404)

@app.get('/dashboard/dynamic-contrast', response_class=HTMLResponse)
async def dynamic_contrast(request: Request):
    """Return the dynamic-contrast.html file."""
    base = Path(__file__).resolve().parents[2]  # project root (f:/eyecare)
    tpl = base / "templates" / "DynamicContrast.html"
    if tpl.exists():
        return HTMLResponse(tpl.read_text(encoding="utf-8") , status_code=200)
    return HTMLResponse("<h1>Dynamic Contrast not found</h1>", status_code=404)

@app.get('/dashboard/sensitive-palette', response_class=HTMLResponse)
async def sensitive_palette(request: Request):
    """Return the sensitive-palette.html file."""
    base = Path(__file__).resolve().parents[2]  # project root (f:/eyecare)
    tpl = base / "templates" / "SensitivePalette.html"
    if tpl.exists():
        return HTMLResponse(tpl.read_text(encoding="utf-8") , status_code=200)
    return HTMLResponse("<h1>Sensitive Palette not found</h1>", status_code=404)

@app.get('/dashboard/vision-tips', response_class=HTMLResponse)
async def vision_tips(request: Request):
    """Return the vision-tips.html file."""
    base = Path(__file__).resolve().parents[2]  # project root (f:/eyecare)
    tpl = base / "templates" / "VisionTips.html"
    if tpl.exists():
        return HTMLResponse(tpl.read_text(encoding="utf-8") , status_code=200)
    return HTMLResponse("<h1>Vision Tips not found</h1>", status_code=404)

@app.get('/dashboard/relearn-colors', response_class=HTMLResponse)
async def relearn_colors(request: Request):
    """Return the relearn-colors.html file."""
    base = Path(__file__).resolve().parents[2]  # project root (f:/eyecare)
    tpl = base / "templates" / "RelearnColors.html"
    if tpl.exists():
        return HTMLResponse(tpl.read_text(encoding="utf-8"), status_code=200)
    return HTMLResponse("<h1>Relearn Colors not found</h1>", status_code=404)

@app.get('/dashboard/ideal-environment', response_class=HTMLResponse)
async def ideal_environment(request: Request):
    """Return the ideal-environment.html file."""
    base = Path(__file__).resolve().parents[2]  # project root (f:/eyecare)
    tpl = base / "templates" / "IdealEnvironment.html"
    if tpl.exists():
        return HTMLResponse(tpl.read_text(encoding="utf-8") , status_code=200)
    return HTMLResponse("<h1>Ideal Environment not found</h1>", status_code=404)