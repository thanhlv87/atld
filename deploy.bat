@echo off
title ATLD Connect - Firebase Deploy
color 0A
echo ========================================
echo   ATLD Connect - Firebase Deploy
echo ========================================
echo.

cd /d "%~dp0"

echo Current directory: %CD%
echo.

echo [1/5] Checking Firebase CLI...
firebase --version
if errorlevel 1 (
    echo ERROR: Firebase CLI not found!
    echo Please run: npm install -g firebase-tools
    pause
    exit /b 1
)
echo.

echo [2/5] Checking Firebase login status...
firebase projects:list
if errorlevel 1 (
    echo.
    echo You need to login to Firebase first!
    echo Opening browser for login...
    firebase login
    if errorlevel 1 (
        echo ERROR: Login failed!
        pause
        exit /b 1
    )
)
echo.

echo [3/5] Checking project...
firebase use atld-connect
if errorlevel 1 (
    echo ERROR: Project 'atld-connect' not found!
    echo Please check your Firebase Console.
    pause
    exit /b 1
)
echo.

echo [4/5] Deploying to Firebase...
echo This may take a few minutes...
firebase deploy
if errorlevel 1 (
    echo ERROR: Deploy failed!
    pause
    exit /b 1
)
echo.

echo [5/5] Deploy completed!
echo.
echo ========================================
echo   SUCCESS! Your website is now live!
echo ========================================
echo.
echo Website URL: https://atld-connect.web.app
echo Firebase Console: https://console.firebase.google.com/project/atld-connect
echo.
echo Next steps:
echo 1. Create admin user in Firebase Console
echo 2. Go to: https://console.firebase.google.com/project/atld-connect/authentication/users
echo 3. Click "Add user" and create admin account
echo 4. Login at: https://atld-connect.web.app/admin-login.html
echo.
echo Press any key to exit...
pause > nul
