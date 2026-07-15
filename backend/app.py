from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io

from ai_model import predict_image


app = FastAPI()


# CORS for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "AgriVision AI Backend Running"
    }



@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    image_bytes = await file.read()

    image = Image.open(
        io.BytesIO(image_bytes)
    ).convert("RGB")


    result = predict_image(image)


    print("MODEL RESULT:", result)


    return {
        "disease": result["disease"],
        "confidence": result["confidence"],
        "treatment": result["treatment"]
    }
