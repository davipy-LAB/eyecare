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

# Exemplo de API para lógica de cores
@app.get("/api/color-info/{color_id}")
async def get_color(color_id: str):
    return {"id": color_id, "name": "Vermelho", "tip": "Dica visual para daltônicos"}


@app.get("/ping")
async def ping():
    return JSONResponse({"status": "ok"})