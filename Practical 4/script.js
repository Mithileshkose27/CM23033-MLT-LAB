let model;

async function loadModel() {
    model = await mobilenet.load();
    console.log("MobileNet Model Loaded");
}

loadModel();

const imageUpload = document.getElementById("imageUpload");
const preview = document.getElementById("preview");
const result = document.getElementById("result");

imageUpload.addEventListener("change", async function(event) {

    const file = event.target.files[0];
    const imageURL = URL.createObjectURL(file);

    preview.src = imageURL;

    preview.onload = async () => {

        const predictions = await model.classify(preview);

        result.innerHTML =
        "Prediction: " + predictions[0].className +
        " (Confidence: " + (predictions[0].probability*100).toFixed(2) + "%)";
    };

});