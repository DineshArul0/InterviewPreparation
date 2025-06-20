@echo off
echo Starting the web server...
echo Open your browser and go to http://localhost:8000/
cd InterviewPrep_App
python -m http.server 8000
