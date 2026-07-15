const cropImage = document.getElementById("cropImage");
const previewImage = document.getElementById("previewImage");
const scanBtn = document.getElementById("scanBtn");

const result = document.getElementById("result");

const BACKEND_URL = "https://agrivision-ai-1-y1dg.onrender.com";


// ================= IMAGE PREVIEW =================

if (cropImage) {

    cropImage.addEventListener("change", function () {

        const file = this.files[0];

        if (file) {

            previewImage.src = URL.createObjectURL(file);
            previewImage.style.display = "block";

        }

    });

}



// ================= AI DISEASE DETECTION =================

if (scanBtn) {

    scanBtn.addEventListener("click", async function () {


        const file = cropImage.files[0];


        if (!file) {

            alert("Please upload a crop image first");
            return;

        }


        result.innerHTML = `
            <h2>🔍 AI is scanning...</h2>
            <p>Analyzing crop health...</p>
        `;


        const formData = new FormData();

        formData.append("file", file);



        try {


            const response = await fetch(
                `${BACKEND_URL}/predict`,
                {
                    method: "POST",
                    body: formData
                }
            );


            if (!response.ok) {
                throw new Error("Prediction failed");
            }


            const data = await response.json();



            result.innerHTML = `

                <h2>🌱 ${data.disease}</h2>

                <p>
                Disease detected successfully
                </p>

                <h3>
                Confidence: ${data.confidence}%
                </h3>

                <p>
                Treatment: ${data.treatment}
                </p>

            `;


        }


        catch(error) {


            result.innerHTML = `

                <h2>❌ Error</h2>

                <p>
                Backend connection failed
                </p>

            `;


            console.log(error);

        }


    });

}



// ================= DASHBOARD PLACEHOLDER =================

function loadWeather(){

    if(document.getElementById("temperature")){

        document.getElementById("temperature").innerHTML =
        "☀️ 28°C";

        document.getElementById("humidity").innerHTML =
        "💧 65%";

        document.getElementById("rain").innerHTML =
        "🌧 20%";

    }

}



function loadMarket(){

    if(document.getElementById("marketCrop")){

        document.getElementById("marketCrop").innerHTML =
        "🌾 Wheat";

        document.getElementById("marketPrice").innerHTML =
        "₹2500 / quintal";

    }

}



loadWeather();
loadMarket();
