function checkPipeline() {

    const data = {
        pressure: Number(document.getElementById("pressure").value),
        flow: Number(document.getElementById("flow").value),
        vibration: Number(document.getElementById("vibration").value),
        temperature: Number(document.getElementById("temperature").value)
    };

    fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {

        const resultElement = document.getElementById("result");
        const alertSound = document.getElementById("alertSound");

        resultElement.innerText = "Pipeline Status: " + result.status;

        // Reset sound before playing again
        alertSound.pause();
        alertSound.currentTime = 0;

        if (result.status === "HIGH LEAK RISK") {
            alertSound.play();          // 🔊 PLAY YOUR MP3
            resultElement.style.color = "red";
        }
        else if (result.status === "WARNING") {
            resultElement.style.color = "orange";
        }
        else {
            resultElement.style.color = "green";
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
}
