import os
import requests


HF_TOKEN = os.getenv("HF_TOKEN")

MODEL_URL = "https://api-inference.huggingface.co/models/malifiahm/plant_disease_classification"


def predict_disease(image):

    try:

        image = image.convert("RGB")

        img_bytes = None

        from io import BytesIO

        buffer = BytesIO()
        image.save(buffer, format="JPEG")
        img_bytes = buffer.getvalue()


        headers = {
            "Authorization": f"Bearer {HF_TOKEN}"
        }


        response = requests.post(
            MODEL_URL,
            headers=headers,
            data=img_bytes,
            timeout=60
        )


        result = response.json()


        if isinstance(result, list):

            prediction = result[0]

            return {
                "disease": prediction["label"],
                "confidence": str(round(prediction["score"] * 100, 2)) + "%",
                "treatment": "Use recommended crop protection methods."
            }


        return {
            "disease": "AI Model Unavailable",
            "confidence": "0%",
            "treatment": str(result)
        }


    except Exception as e:

        return {
            "disease": "AI Error",
            "confidence": "0%",
            "treatment": str(e)
        }
