import os
import requests
import io


HF_TOKEN = os.getenv("HF_TOKEN")


API_URL = "https://api-inference.huggingface.co/models/malifiahm/plant_disease_classification"


def predict_disease(image):

    try:
        buffer = io.BytesIO()
        image.save(buffer, format="JPEG")

        headers = {
            "Authorization": f"Bearer {HF_TOKEN}"
        }

        response = requests.post(
            API_URL,
            headers=headers,
            data=buffer.getvalue()
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
            "disease": "Model processing...",
            "confidence": "0%",
            "treatment": "Try again."
        }

    except Exception as e:

        return {
            "disease": "AI Error",
            "confidence": "0%",
            "treatment": str(e)
        }
