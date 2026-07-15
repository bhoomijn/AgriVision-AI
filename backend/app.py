from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from ai_model import predict_image
import io


app = FastAPI(title="AgriVision AI Backend")


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://127.0.0.1:5500",
    "http://localhost:5500"
],
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
async def predict_crop(file: UploadFile = File(...)):

    image_bytes = await file.read()

    image = Image.open(io.BytesIO(image_bytes))

    result = predict_image(image)

    return result


@app.get("/weather")
def get_weather():

    return {
        "temperature": "28°C",
        "humidity": "65%",
        "rain_forecast": "20%",
        "condition": "Sunny"
    }


@app.get("/market")
def get_market():

    return {
        "crop": "Wheat",
        "price": "₹2400/quintal",
        "trend": "Increasing",
        "market": "Madhya Pradesh Mandi"
    }
