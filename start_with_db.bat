@echo off
echo ===============================================
echo Interview Prep App - Database Setup and Launch
echo ===============================================
echo.
echo Step 1: Setting up the database...
python scripts/setup_database.py
if %errorlevel% neq 0 (
    echo Error: Database setup failed!
    pause
    exit /b 1
)
echo.
echo Step 2: Starting the server...
echo.
python server.py
pause
