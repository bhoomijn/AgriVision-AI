const button = document.querySelector(".upload-box button");
const input = document.getElementById("cropImage");


// =========================
// AI Disease Detection
// =========================

if (button) {

    button.addEventListener("click", async () => {

        const resultTitle = document.querySelector(".result-card h2");
        const resultStatus = document.querySelector(".result-card p");
        const confidence = document.querySelector(".result-card h3");

        const scanTitle = document.querySelector(".scanner-card h2");
        const scanText = document.querySelector(".scanner-card p");


        if (!input.files.length) {
            alert("Please upload crop image first");
            return;
        }


        scanTitle.innerHTML = "🔍 AI Scanning...";
        scanText.innerHTML = "Sending image to AI model...";


        const formData = new FormData();

        formData.append("file", input.files[0]);


        try {

            const response = await fetch(
                "http://127.0.0.1:8000/predict",
                {
                    method: "POST",
                    body: formData
                }
            );


            const data = await response.json();


            resultTitle.innerHTML = "🍂 " + data.disease;

            resultStatus.innerHTML =
                "Disease Status: Detected";

            confidence.innerHTML =
                "Confidence: " + data.confidence;


            scanTitle.innerHTML = "✅ Scan Complete";

            scanText.innerHTML =
                "AI analysis finished";


        }

        catch (error) {

            console.log(error);
            alert("Backend connection failed");

        }


    });

}


// =========================
// Weather Data
// =========================

async function loadWeatherDashboard() {

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/weather"
        );

        const data = await response.json();


        if (document.getElementById("temperature")) {
            document.getElementById("temperature").innerHTML =
                "☀️ " + data.temperature;
        }


        if (document.getElementById("humidity")) {
            document.getElementById("humidity").innerHTML =
                "💧 " + data.humidity;
        }


        if (document.getElementById("rain")) {
            document.getElementById("rain").innerHTML =
                "🌧 " + data.rain_forecast;
        }


    }

    catch (error) {

        console.log("Weather error", error);

    }

}


loadWeatherDashboard();



// =========================
// Market Data
// =========================

async function loadMarketData() {

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/market"
        );

        const data = await response.json();


        if (document.getElementById("marketCrop")) {

            document.getElementById("marketCrop").innerHTML =
                "🌾 " + data.crop;


            document.getElementById("marketPrice").innerHTML =
                "Price: " + data.price +
                "<br>Trend: " + data.trend;

        }

    }

    catch (error) {

        console.log("Market error", error);

    }

}


loadMarketData();
