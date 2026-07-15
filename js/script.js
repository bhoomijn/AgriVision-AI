const cropImage = document.getElementById("cropImage");
const previewImage = document.getElementById("previewImage");
const scanBtn = document.getElementById("scanBtn");

const result = document.getElementById("result");


// ================= AI IMAGE PREVIEW =================

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
            <p>Please wait while analyzing crop health</p>
        `;



        const formData = new FormData();

        formData.append("file", file);



        try {


            const response = await fetch(
                "https://agrivision-ai-1-y1dg.onrender.com/predict",
                {
                    method:"POST",
                    body:formData
                }
            );



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
        catch(error){


            result.innerHTML = `

                <h2>❌ Error</h2>
                <p>Backend connection failed</p>

            `;


            console.log(error);


        }


    });

}




// ================= DASHBOARD WEATHER =================


async function loadWeather(){


    try{


        const response = await fetch(
            "http://127.0.0.1:8000/weather"
        );


        const data = await response.json();



        if(document.getElementById("temperature")){


            document.getElementById("temperature").innerHTML =
            "☀️ " + data.temperature;


            document.getElementById("humidity").innerHTML =
            "💧 " + data.humidity;


            document.getElementById("rain").innerHTML =
            "🌧 " + data.rain_forecast;


        }



    }
    catch(error){

        console.log("Weather API Error",error);

    }


}





// ================= MARKET DATA =================


async function loadMarket(){


    try{


        const response = await fetch(
            "http://127.0.0.1:8000/market"
        );


        const data = await response.json();



        if(document.getElementById("marketCrop")){


            document.getElementById("marketCrop").innerHTML =
            "🌾 " + data.crop;


            document.getElementById("marketPrice").innerHTML =
            "₹ " + data.price + " / quintal";


        }



    }
    catch(error){

        console.log("Market API Error",error);

    }


}





// Run Dashboard APIs

loadWeather();

loadMarket();
