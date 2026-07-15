from transformers import ViTImageProcessor, ViTForImageClassification
from PIL import Image
import torch

MODEL_PATH = "./crop_model"

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
        "confidence": round(confidence * 100, 2)
    }
