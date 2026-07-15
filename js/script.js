const cropImage = document.getElementById("cropImage");
const previewImage = document.getElementById("previewImage");
const scanBtn = document.getElementById("scanBtn");

const result = document.getElementById("result");
const treatment = document.getElementById("treatment");


// Image preview
cropImage.addEventListener("change", function () {

    const file = this.files[0];

    if (file) {
        previewImage.src = URL.createObjectURL(file);
        previewImage.style.display = "block";
    }

});


// Scan button
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
            "http://127.0.0.1:8000/predict",
            {
                method: "POST",
                body: formData
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
                ${data.treatment}
            </p>
        `;


    } catch (error) {

        result.innerHTML = `
            <h2>❌ Error</h2>
            <p>Backend connection failed</p>
        `;

        console.log(error);

    }

});
