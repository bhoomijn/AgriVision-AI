# 🌱 AgriVision AI
### Empowering Farmers with Artificial Intelligence

AgriVision AI is an AI-powered smart agriculture solution designed to help farmers identify crop diseases at an early stage using computer vision. By analyzing crop leaf images, our system detects diseases, provides confidence scores, and recommends possible treatments.

---

## 🚜 The Problem

Agriculture is the backbone of India, but crop diseases remain one of the major reasons behind productivity loss.

Farmers often face challenges:
- ❌ Late disease identification
- ❌ Lack of quick access to agricultural experts
- ❌ Unnecessary pesticide usage
- ❌ Crop damage due to delayed action

---

## 💡 Our Solution

AgriVision AI provides a simple AI-based disease detection platform:

📸 Upload a crop leaf image  
⬇️  
🤖 AI analyzes the image  
⬇️  
🌿 Disease is identified  
⬇️  
💊 Treatment guidance is provided  

Our goal is to make AI accessible for farmers and support faster agricultural decisions.

---

# ✨ Key Features

🌿 **AI Crop Disease Detection**
- Detects diseases from leaf images using Deep Learning

📊 **Confidence Analysis**
- Provides prediction confidence score

💊 **Treatment Recommendation**
- Suggests possible crop care actions

🖥️ **Farmer-Friendly Interface**
- Simple and easy-to-use web platform

📈 **Smart Agriculture Dashboard**
- Designed for future integration of weather, soil and market insights

---

# 🤖 Artificial Intelligence Model

### Vision Transformer (ViT)

AgriVision AI uses a fine-tuned Vision Transformer model for image classification.

### Model Information

- Architecture: ViT-Tiny Patch16-224
- Framework: Hugging Face Transformers
- Deep Learning Framework: PyTorch
- Input: Crop Leaf Image
- Output:
  - Disease Name
  - Confidence Score

### Supported Crops

🌽 Corn  
🥔 Potato  
🌾 Rice  
🌱 Wheat  

### Supported Conditions

- Healthy crops
- Rust diseases
- Leaf spot diseases
- Blight diseases

---

# 🏗️ How AgriVision AI Works

         Crop Leaf Image
                |
                ↓
        Web Upload Interface
                |
                ↓
         FastAPI Backend
                |
                ↓
    Vision Transformer Model
                |
                ↓
      Disease Classification
                |
                ↓
   Treatment Recommendation

   
---

# 🛠️ Technology Stack

## Frontend
- HTML5
- CSS3
- JavaScript

## Backend
- Python
- FastAPI
- Uvicorn

## AI / ML
- Vision Transformer (ViT)
- PyTorch
- Hugging Face Transformers

## Development Tools
- Visual Studio Code
- GitHub
- Hugging Face Hub

---

# 📂 Project Structure

AgriVision-AI
│
├── frontend
│ ├── index.html
│ ├── ai.html
│ ├── dashboard.html
│ ├── css
│ └── js
│
├── backend
│ ├── app.py
│ ├── ai_model.py
│ ├── requirements.txt
│ └── crop_model
│
└── README.md


---

# ⚙️ Running The Project

## Backend Setup

Install dependencies:

```bash
pip install -r requirements.txt
```
Start FastAPI server

uvicorn app:app --reload

Server:

http://127.0.0.1:8000

Open the frontend files in browser to use the application.

---

## 🌍 Impact For India

AgriVision AI focuses on solving a real agricultural challenge by:

✅ Helping farmers identify diseases faster
✅ Reducing crop loss
✅ Supporting informed decisions
✅ Making AI accessible in agriculture

---

## 🚀 Future Vision

Future enhancements:

🗣️ Regional language AI voice assistant
📱 Mobile application
🌦️ Weather-based disease prediction
🌱 Soil monitoring using IoT
📊 Crop yield forecasting
👨‍🌾 Expert farmer support system

---

## 🏆 Built For

AI Innovation Hackathon 🇮🇳

Build. Ship. Solve for India.

---

## 👥 Team AgriVision AI

Creating smarter agriculture through Artificial Intelligence 🌱🤖
