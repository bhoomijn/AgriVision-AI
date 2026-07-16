from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
load_dotenv()

from app.tools.disease_tool import cnn
from app.tools.treatment_rag import get_vectorstore

# NVIDIA API - OpenAI compatible
try:
    from langchain_openai import ChatOpenAI
    NVIDIA_AVAILABLE = True
except ImportError:
    NVIDIA_AVAILABLE = False

def get_llm():
    api_key = os.getenv("NVIDIA_API_KEY")
    if not api_key or not NVIDIA_AVAILABLE:
        print(f"NVIDIA key missing: {bool(api_key)}, lib: {NVIDIA_AVAILABLE}")
        return None
    # NVIDIA NIM endpoint
    return ChatOpenAI(
        model="meta/llama-3.1-8b-instruct",  # Free tier model, can also use meta/llama-3.3-70b-instruct
        openai_api_key=api_key,
        openai_api_base="https://integrate.api.nvidia.com/v1",
        temperature=0.2,
        max_tokens=512
    )

app = FastAPI(title="AgriVision AI - NVIDIA Edition", version="5.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

@app.get("/")
def root():
    return {"message": "AgriVision NVIDIA Running", "docs": "/docs", "nvidia": NVIDIA_AVAILABLE, "model": "meta/llama-3.1-8b-instruct"}

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "llm": "nvidia meta/llama-3.1-8b-instruct" if NVIDIA_AVAILABLE else "fallback",
        "nvidia_key_set": bool(os.getenv("NVIDIA_API_KEY")),
        "python": "3.14 ready"
    }

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()
    pred = cnn.predict(image_bytes)
    try:
        vs = get_vectorstore()
        treatments = vs.similarity_search(pred["disease"], k=2)
        treatment_texts = [t.page_content for t in treatments]
    except Exception as e:
        treatment_texts = [f"Treatment for {pred['disease']}: Neem oil 5ml/L, Mancozeb 2.5g/L"]

    llm = get_llm()
    nvidia_explanation = None
    if llm:
        try:
            prompt = f"You are AgriVision expert. Disease: {pred['disease']} conf {pred['confidence']:.1%} severity {pred['severity']}. Give 2-line farmer friendly advice in English + Tamil."
            resp = llm.invoke(prompt)
            nvidia_explanation = resp.content
        except Exception as e:
            nvidia_explanation = f"NVIDIA error: {e}"
            print(nvidia_explanation)

    return {
        "success": True,
        "data": {
            "prediction": pred,
            "treatments": treatment_texts,
            "nvidia_explanation": nvidia_explanation,
            "chain": "Image -> CNN -> RAG -> NVIDIA Llama 3.1"
        }
    }

@app.get("/chat")
@app.post("/chat")
def chat(query: str):
    llm = get_llm()
    if llm:
        try:
            system = """You are AgriVision AI, expert farmer assistant for Tamil Nadu farmers.
            Tools: disease detection, weather, market prices.
            Give practical low-cost solutions. Simple English, add Tamil if asked. Keep under 150 words."""
            response = llm.invoke(f"{system}\n\nUser: {query}")
            return {"response": response.content, "agent": "nvidia-llama-3.1-8b-instruct", "mode": "nvidia"}
        except Exception as e:
            return {"response": f"NVIDIA API Error: {e}. Check your NVIDIA_API_KEY at https://build.nvidia.com", "mode": "error", "error": str(e)}

    # Fallback
    q = query.lower()
    if "tomato" in q or "blight" in q:
        return {"response": "Early Blight likely. Use Mancozeb 2.5g/L. Remove affected leaves.", "mode": "fallback"}
    else:
        return {"response": f"NVIDIA key not set. You asked: {query}. Set NVIDIA_API_KEY in .env", "mode": "fallback"}

@app.get("/weather/{location}")
def weather(location: str):
    import random
    return {"location": location, "temperature_c": 29, "humidity": 75, "condition": "Partly Cloudy"}

@app.get("/market/{crop}")
def market(crop: str):
    return {"crop": crop, "price": 2500, "market": "Koyambedu", "trend": "UP", "tip": "Sell this week"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)