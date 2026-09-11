#!/bin/bash
# TODO: Add commands to download skills from skills.sh
#!/bin/bash

echo "🚀 Starting JAGRIT Workspace Setup for SIH..."

# 1. Setup Web (Next.js)
echo "📦 Installing Frontend dependencies..."
cd web
npm install
cd ..

# 2. Setup Backend (FastAPI)
echo "🐍 Setting up Python Virtual Environment & Backend..."
cd backend
# Create venv if it doesn't exist
if [ ! -d "venv" ]; then
    python -m venv venv
fi

# Activate venv (Windows Git Bash format)
source venv/Scripts/activate
pip install -r requirements.txt
cd ..

# 3. Setup Mobile (Flutter)
echo "📱 Fetching Flutter packages..."
cd mobile
flutter pub get
cd ..

echo "✅ Setup Complete! You are ready to build."
echo "👉 Don't forget to copy .env.example to .env in your web and backend folders!"