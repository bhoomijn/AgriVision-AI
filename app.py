import streamlit as st
from openai import OpenAI
from PIL import Image
import base64
import io

# --- 1. PAGE SETUP & THEME CONFIGURATION ---
st.set_page_config(
    page_title="AgriVision AI - Smart Crop Monitoring",
    page_icon="🌱",
    layout="centered"
)

# Custom injection to apply the AgriVision brand identity
st.markdown("""
    <style>
    .main { background-color: #f5f8f5; }
    h1, h2, h3 { color: #1e5631 !important; font-family: 'Helvetica Neue', sans-serif; }
    .stButton>button {
        background-color: #2e7d32 !important;
        color: white !important;
        border-radius: 8px;
        font-weight: 600;
        width: 100%;
        border: none;
        padding: 0.5rem;
    }
    .stTabs [data-baseweb="tab"] { font-weight: bold; }
    div[data-testid="stNotification"] { border-radius: 10px; }
    </style>
""", unsafe_allow_html=True)

# --- 2. NVIDIA NIM API CLIENT INITIALIZATION ---
# Using the NVIDIA developer key directly to initialize the API layer
NVIDIA_API_KEY = "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"

client = OpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key=NVIDIA_API_KEY
)

def convert_image_to_base64(pil_image):
    """Converts a standard PIL Image into a clean Base64 string for NVIDIA Multimodal processing."""
    buffered = io.BytesIO()
    if pil_image.mode in ("RGBA", "P"):
        pil_image = pil_image.convert("RGB")
    pil_image.save(buffered, format="JPEG")
    return base64.b64encode(buffered.getvalue()).decode('utf-8')

# --- 3. APPLICATION UI LAYOUT ---
st.title("🌱 AgriVision AI")
st.markdown("### *Smart Crop Monitoring for Rural Farmers*")
st.write("---")

# Setup Navigation Tabs mimicking the Slide 3 MVP structure
tab1, tab2, tab3 = st.tabs(["📸 Scan Crop", "🌤️ Weather & Advisory", "📜 Scan History"])

with tab1:
    st.header("Crop Image Analysis")
    st.write("Upload a clear photo or take a picture of an infected plant leaf to detect potential diseases instantly.")
    
    input_source = st.radio("Choose Input Type:", ("Camera Capture", "Upload Image File"))
    
    uploaded_image = None
    if input_source == "Camera Capture":
        uploaded_image = st.camera_input("Capture crop leaf image")
    else:
        uploaded_image = st.file_uploader("Browse files for an image...", type=["jpg", "jpeg", "png"])
        
    if uploaded_image is not None:
        image = Image.open(uploaded_image)
        st.image(image, caption="Uploaded Crop Image", use_container_width=True)
        
        if st.button("Analyze Now"):
            with st.spinner("Processing image through NVIDIA NIM AI Models..."):
                try:
                    # Convert the captured image asset to base64 format string
                    base64_image = convert_image_to_base64(image)
                    
                    # Call NVIDIA's NeVA Multimodal Vision Model pipeline
                    response = client.chat.completions.create(
                        model="nvidia/neva-22b",
                        messages=[
                            {
                                "role": "user",
                                "content": [
                                    {
                                        "type": "text", 
                                        "text": (
                                            "You are an expert plant pathologist. Analyze this crop leaf image. "
                                            "Explicitly separate your analysis into these exact sections:\n\n"
                                            "### 1. Prediction Result\n"
                                            "Identify the specific disease name and crop type. Provide an estimated confidence percentage (e.g., 92%).\n\n"
                                            "### 2. Recommended Treatment\n"
                                            "Provide actionable immediate biological, chemical, or systemic treatments.\n\n"
                                            "### 3. Preventive Measures\n"
                                            "Give clear steps the farmer can take to prevent future outbreaks (crop rotation, drainage, etc.)."
                                        )
                                    },
                                    {
                                        "type": "image_url", 
                                        "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"}
                                    }
                                ]
                            }
                        ],
                        max_tokens=1024,
                        temperature=0.2
                    )
                    
                    analysis_report = response.choices[0].message.content
                    
                    # Store data into local session storage array for history tracking
                    if 'history_logs' not in st.session_state:
                        st.session_state['history_logs'] = []
                    st.session_state['history_logs'].append(analysis_report)
                    
                    # Output presentation layer
                    st.success("Analysis Completed!")
                    st.markdown(analysis_report)
                    
                except Exception as e:
                    st.error(f"Failed to process with NVIDIA NIM APIs: {str(e)}")

with tab2:
    st.header("🌤️ Weather & Advisory Matrix")
    location = st.text_input("Enter your Farm Location/District:", "Bhopal, Madhya Pradesh")
    
    # Simulating the MVP architecture's OpenWeather dashboard layer
    col1, col2 = st.columns(2)
    with col1:
        st.metric(label="Temperature Index", value="32°C")
        st.write("⛅ Partly Cloudy")
    with col2:
        st.write("💧 Local Humidity: **65%**")
        st.write("💨 Wind Vector: **12 km/h**")
        st.write("🌧️ Precipitation Odds: **20%**")
        
    st.write("---")
    st.subheader("🌾 Regional Farming Advisory")
    st.warning("Current regional atmospheric conditions are ideal for Early and Late Blight development. Monitor your solanaceous crops (Potato, Tomato) regularly and apply target copper-based preventative metrics if dampness scales up.")

with tab3:
    st.header("📜 Scan History Tracking")
    if 'history_logs' in st.session_state and len(st.session_state['history_logs']) > 0:
        for index, historical_record in enumerate(reversed(st.session_state['history_logs'])):
            with st.expander(f"Diagnosis Report #{len(st.session_state['history_logs']) - index}"):
                st.markdown(historical_record)
    else:
        st.info("No scan diagnostics run in this session yet.")