from flask import Flask, jsonify
import numpy as np

app = Flask(__name__)

# Dummy crop health check using NumPy
@app.route('/api/crop-health', methods=['GET'])
def crop_health():
    # Example: random health status
    health_score = np.random.rand()
    if health_score > 0.5:
        status = "Healthy"
        message = "Your crops are doing well 🌱"
    else:
        status = "Alert"
        message = "Potential issue detected ⚠️"

    return jsonify({
        "status": status,
        "message": message,
        "score": round(float(health_score), 2)
    })

if __name__ == '__main__':
    app.run(debug=True)
