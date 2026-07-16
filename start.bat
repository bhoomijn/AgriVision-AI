@echo off
echo Starting AgriVision NVIDIA Edition...
if not exist backend\.env (
  echo Create backend\.env with NVIDIA_API_KEY=nvapi-...
  pause
  exit /b
)
start cmd /k "cd backend && if not exist .venv (python -m venv .venv) && .venv\Scripts\activate && pip install -r requirements.txt && python -m uvicorn app.main:app --reload --port 8000"
timeout /t 5
start cmd /k "cd frontend && npm install && npm run dev"
echo Backend: http://localhost:8000/docs
echo Frontend: http://localhost:3000
pause
