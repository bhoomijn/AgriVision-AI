
const cropImage = document.getElementById("cropImage");
const previewImage = document.getElementById("previewImage");
const scanBtn = document.getElementById("scanBtn");

const result = document.getElementById("result");

// Image Preview
cropImage.addEventListener("change", () => {
    const file = cropImage.files[0];

    if (file) {
        previewImage.src = URL.createObjectURL(file);
        previewImage.style.display = "block";
    }
});

// Scan Button
scanBtn.addEventListener("click", async () => {

    const file = cropImage.files[0];

    if (!file) {
        alert("Please upload a crop image first!");
        return;
    }

    result.innerHTML = `
        <h2>🔍 AI is scanning...</h2>
        <p>Please wait...</p>
    `;

    const formData = new FormData();
    formData.append("file", file);

    try {

        const response = await fetch("http://127.0.0.1:8000/predict", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("Server Error: " + response.status);
        }

        const data = await response.json();

        result.innerHTML = `
            <h2>🌱 ${data.disease}</h2>
            <h3>Confidence: ${data.confidence}%</h3>
            <p><strong>Treatment:</strong> ${data.treatment}</p>
        `;

    } catch (err) {

        console.error(err);

        result.innerHTML = `
            <h2>❌ Error</h2>
            <p>${err.message}</p>
        `;
    }

});
