# 🌱 AgriVision AI

## AI-Powered Crop Disease Detection System

![AgriVision AI](https://img.shields.io/badge/AI-Agriculture-green)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-blue)
![HuggingFace](https://img.shields.io/badge/Model-Vision%20Transformer-orange)

## 🚀 Overview

AgriVision AI is an intelligent agriculture solution that helps farmers identify crop diseases quickly using Artificial Intelligence.

By analyzing crop leaf images, the system detects possible diseases, provides confidence scores, and suggests suitable treatment recommendations. The goal is to support early disease detection, reduce crop losses, and enable smarter farming decisions.

---

# ✨ Key Features

## 🤖 AI Crop Disease Detection

* Upload a crop leaf image
* AI analyzes plant health using a Vision Transformer model
* Provides disease prediction with confidence score

## 🌿 Smart Treatment Recommendations

* Gives actionable suggestions after disease identification
* Helps farmers take early preventive measures

## 📊 Farmer Dashboard

* Crop health monitoring interface
* Weather and agriculture insights
* User-friendly visualization

## ⚡ Fast & Accessible

* Web-based solution
* Responsive interface
* AI-powered results within seconds

---

# 🧠 Artificial Intelligence Model

AgriVision AI uses a Vision Transformer (ViT) image classification model.

### Model Details

* **Model:** `wambugu71/crop_leaf_diseases_vit`
* **Architecture:** Vision Transformer (ViT)
* **Framework:** Hugging Face Transformers + PyTorch
* **Task:** Crop Leaf Disease Classification

### Supported Crops

* 🌾 Wheat
* 🌽 Corn
* 🥔 Potato
* 🍚 Rice

The model can identify multiple healthy and diseased crop categories.

---

# ⚙️ How It Works

```
User Uploads Crop Image
          ↓
Frontend Sends Image
          ↓
FastAPI Backend Processing
          ↓
Vision Transformer AI Model
          ↓
Disease Prediction + Confidence
          ↓
Treatment Recommendation
```

---

# 🛠 Tech Stack

## Frontend

* HTML5
* CSS3
* JavaScript

## Backend

* Python
* FastAPI
* Uvicorn

## Machine Learning

* PyTorch
* Hugging Face Transformers
* Vision Transformer (ViT)

## Deployment

Frontend:

* Netlify

Backend:

* Render

---

# 📂 Project Structure

```
AgriVision-AI
│
├── backend
│   ├── app.py
│   ├── ai_model.py
│   └── requirements.txt
│
├── css
│   └── style.css
│
├── js
│   └── script.js
│
├── index.html
├── ai.html
├── dashboard.html
└── README.md
```

---

# 🌐 Live Demo

Website:
https://agrivision-ai4.netlify.app

Backend API:
https://agrivision-ai-1-y1dg.onrender.com

---

# 🎯 Problem We Solve

Farmers often face crop losses because diseases are detected late. Manual identification requires expert knowledge and can be time-consuming.

AgriVision AI provides a faster AI-based approach for early crop disease detection and better farming decisions.

---

# 🔮 Future Enhancements

* 📱 Mobile application for farmers
* 🌍 Multi-language support
* 🌦 Weather-based disease alerts
* 📈 Crop yield prediction
* 🛰 Satellite-based crop monitoring
* More crop disease categories

---

# 👥 Team

**AgriVision AI Team**

Built with 🌱 and 🤖 to empower smart agriculture.

---

## ⭐ Conclusion

AgriVision AI combines Artificial Intelligence and agriculture to create a practical solution for modern farming challenges, helping farmers detect crop diseases earlier and make informed decisions.
