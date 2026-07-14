from transformers import pipeline


# Load AI model once
classifier = pipeline(
    "image-classification",
    model="malifiahm/plant_disease_classification"
)


def predict_disease(image):

    try:

        image = image.convert("RGB")

        result = classifier(image)

        prediction = result[0]

        return {
            "disease": prediction["label"],
            "confidence": str(round(prediction["score"] * 100, 2)) + "%",
            "treatment": "Use suitable crop protection methods and maintain proper irrigation."
        }


    except Exception as e:

        return {
            "disease": "AI Error",
            "confidence": "0%",
            "treatment": str(e)
        }
