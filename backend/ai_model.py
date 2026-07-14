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
            data=buffer.getvalue(),
            timeout=60
        )

        result = response.json()

        print("HF RESPONSE:", result)

        if isinstance(result, list) and len(result) > 0:

            prediction = result[0]

            return {
                "disease": prediction.get("label", "Unknown"),
                "confidence": str(round(prediction.get("score", 0) * 100, 2)) + "%",
                "treatment": "Use recommended crop protection methods."
            }

        else:

            return {
                "disease": "Model Loading/Error",
                "confidence": "0%",
                "treatment": str(result)
            }


    except Exception as e:

        return {
            "disease": "AI Error",
            "confidence": "0%",
            "treatment": str(e)
        }
