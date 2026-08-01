# Usage

Quick instructions to run the AgriVision-AI demo locally.

Prerequisites
- Python 3.8+ (3.12 recommended)
- pip and virtualenv
- Optional: Docker (if you want to build an image)

Run locally
1. Clone
   ```bash
   git clone https://github.com/bhoomijn/AgriVision-AI.git
   cd AgriVision-AI
   ```

2. Create virtual environment and install
   ```bash
   python -m venv .venv
   source .venv/bin/activate   # Windows: .venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. Run the demo (example)
   ```bash
   python app.py
   # open http://localhost:5000
   ```

Docker (optional)
- If you have a Dockerfile in the repo, build and run:
  ```bash
  docker build -t agrivision-ai:latest .
  docker run -p 5000:5000 agrivision-ai:latest
  ```

Demo GIF / Placeholder
- Recommended GIF path: `docs/demo.gif` (600x340, &lt;3MB). You can replace the placeholder `docs/demo.svg` or `docs/demo-gif-placeholder.txt` with the real GIF.

Notes
- I will not modify any existing code, folders, or README files. These files are non-destructive additions to help with demos and usage documentation.
