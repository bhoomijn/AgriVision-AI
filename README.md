
# AgriVision NVIDIA Edition - READY

## Get NVIDIA API Key FREE
1. Go to https://build.nvidia.com/explore/discover
2. Login
3. Search model: meta/llama-3.1-8b-instruct -> Click API -> Generate Key (nvapi-...)
4. Copy key

## Setup
1. Unzip
2. Edit backend/.env -> NVIDIA_API_KEY=nvapi-xxx...
3. Run start.bat or manually:

Backend: cd backend && python -m venv .venv && .venv\Scripts\activate && pip install -r requirements.txt && python -m uvicorn app.main:app --reload --port 8000
Frontend: cd frontend && npm install && npm run dev

Open http://localhost:3000
Backend docs: http://localhost:8000/docs
