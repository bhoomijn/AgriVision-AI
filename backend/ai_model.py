from transformers import ViTImageProcessor, ViTForImageClassification
from PIL import Image
import torch

import os

MODEL_PATH = "wambugu71/crop_leaf_diseases_vit"

processor = ViTImageProcessor.from_pretrained(MODEL_PATH)
model = ViTForImageClassification.from_pretrained(MODEL_PATH)

def predict_image(image_path):
    image = image_path.convert("RGB")

    inputs = processor(images=image, return_tensors="pt")

    with torch.no_grad():
        outputs = model(**inputs)

    prediction = torch.argmax(outputs.logits, dim=1).item()

    label = model.config.id2label[prediction]
    confidence = torch.softmax(outputs.logits, dim=1)[0][prediction].item()

    return {
    "disease": label,
    "confidence": round(confidence * 100, 2),
    "treatment": treatments.get(label, "Consult agriculture expert.")
}

treatments = {
    "Wheat___Brown_Rust": "Use recommended fungicide spray and remove infected leaves.",
    "Wheat___Yellow_Rust": "Apply suitable fungicide and monitor crop regularly.",
    "Wheat___Healthy": "Crop is healthy. Continue proper irrigation and care.",
    "Corn___Common_Rust": "Use fungicide treatment and maintain field hygiene.",
    "Corn___Gray_Leaf_Spot": "Apply disease management spray and avoid excess moisture.",
    "Corn___Healthy": "Crop is healthy. Maintain good farming practices.",
    "Potato___Early_Blight": "Use fungicide and remove affected leaves.",
    "Potato___Late_Blight": "Apply appropriate fungicide and avoid waterlogging.",
    "Potato___Healthy": "Crop is healthy. Continue normal care.",
    "Rice___Brown_Spot": "Improve soil nutrition and apply suitable fungicide.",
    "Rice___Leaf_Blast": "Use recommended fungicide and maintain field conditions.",
    "Rice___Healthy": "Crop is healthy. Continue monitoring."
}
print(model.config.id2label)
