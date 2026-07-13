from flask import Flask, jsonify
app = Flask(__name__)

@app.route('/api/crop-health')
def crop_health():
    return jsonify({"status": "healthy", "message": "No issues detected"})

if __name__ == "__main__":
    app.run(port=5000)
