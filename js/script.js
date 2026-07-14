const API_URL = "https://agrivision-ai-pbq6.onrender.com";

const button = document.querySelector(".upload-box button");
const input = document.getElementById("cropImage");


// =========================
// Image Preview
// =========================

if (input) {

    input.addEventListener("change", () => {

        const preview = document.getElementById("previewImage");

        if (input.files.length && preview) {

            preview.src = URL.createObjectURL(input.files[0]);
            preview.style.display = "block";

        }

    });

}



// =========================
// AI Disease Detection
// =========================

if (button) {

    button.addEventListener("click", async () => {


        const resultTitle =
            document.querySelector(".result-card h2");

        const resultStatus =
            document.querySelector(".result-card p");

        const confidence =
            document.querySelector(".result-card h3");

        const treatment =
            document.getElementById("treatment");


        const scanTitle =
            document.querySelector(".scanner-card h2");

        const scanText =
            document.querySelector(".scanner-card p");



        if (!input.files.length) {

            alert("Please upload crop image first");
            return;

        }



        scanTitle.innerHTML = "🔍 AI Scanning...";
        scanText.innerHTML = "Analyzing crop patterns...";


        resultTitle.innerHTML =
            "⏳ Processing image...";

        confidence.innerHTML =
            "Confidence: --";



        const formData = new FormData();


        formData.append(
            "file",
            input.files[0]
        );



        try {


            const response = await fetch(
                API_URL + "/predict",
                {
                    method: "POST",
                    body: formData
                }
            );



            const data = await response.json();



            resultTitle.innerHTML =
                "🍂 " + data.disease;



            resultStatus.innerHTML =
                "Disease Status: Detected";



            confidence.innerHTML =
                "Confidence: " + data.confidence;



            if (treatment) {

                treatment.innerHTML =
                    "💊 Treatment: " + data.treatment;

            }



            scanTitle.innerHTML =
                "✅ Scan Complete";



            scanText.innerHTML =
                "AI analysis finished successfully";


        }


        catch(error) {


            console.log(error);



            resultTitle.innerHTML =
                "⚠️ AI Error";



            resultStatus.innerHTML =
                "Unable to connect with AI server";



            confidence.innerHTML =
                "Confidence: 0%";



            if(treatment){

                treatment.innerHTML =
                    "Please try again.";

            }



            scanTitle.innerHTML =
                "❌ Scan Failed";


            scanText.innerHTML =
                "Server connection error";


        }


    });

}





// =========================
// Weather Data
// =========================

async function loadWeatherDashboard() {

    try {


        const response = await fetch(
            API_URL + "/weather"
        );


        const data = await response.json();



        if(document.getElementById("temperature")){

            document.getElementById("temperature").innerHTML =
                "☀️ " + data.temperature;

        }



        if(document.getElementById("humidity")){

            document.getElementById("humidity").innerHTML =
                "💧 " + data.humidity;

        }



        if(document.getElementById("rain")){

            document.getElementById("rain").innerHTML =
                "🌧 " + data.rain_forecast;

        }


    }

    catch(error){

        console.log(
            "Weather error:",
            error
        );

    }

}


loadWeatherDashboard();





// =========================
// Market Data
// =========================

async function loadMarketData(){

    try{


        const response = await fetch(
            API_URL + "/market"
        );


        const data = await response.json();



        if(document.getElementById("marketCrop")){


            document.getElementById("marketCrop").innerHTML =
                "🌾 " + data.crop;



            document.getElementById("marketPrice").innerHTML =
                "Price: " + data.price +
                "<br>Trend: " + data.trend;


        }


    }

    catch(error){

        console.log(
            "Market error:",
            error
        );

    }

}


loadMarketData();
