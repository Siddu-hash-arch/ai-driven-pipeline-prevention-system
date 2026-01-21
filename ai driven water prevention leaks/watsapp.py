from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__, static_folder=".")
CORS(app)

@app.route("/")
def index():
    return send_from_directory(".", "index.html")

@app.route("/<path:filename>")
def static_files(filename):
    return send_from_directory(".", filename)

def predict_pipeline_status(pressure, flow, vibration, temperature):
    if (
        pressure < 30 or
        flow < 20 or
        vibration > 7 or
        temperature > 60
    ):
        return "HIGH LEAK RISK"
    elif (
        pressure < 50 or
        vibration > 4 or
        temperature > 45
    ):
        return "WARNING"
    else:
        return "NORMAL"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    status = predict_pipeline_status(
        data["pressure"],
        data["flow"],
        data["vibration"],
        data["temperature"]
    )
    return jsonify({"status": status})

if __name__ == "__main__":
    app.run(debug=True)
