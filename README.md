# Oauth-authentication

This project outline basic OAuth 2.0 authentication wiht Google. 
The logic can be used to implemented and scaled based on application features. 

This project has following features:
- Log in with Google
- Display Welcome message once user logged in

## Installation guide
#### Hardware and System Requirements
To run this application you need minimal hardware. A 64-bit operation system (MacOS, Windows10 or Linux) with a at least 4gb of RAM to run React ands Node.Js in comftable way, and a stable internet connection to support local server execution and Websocket communication. Plus a minimun of 2gb storage for dependencies and database storage.
React, Node.JS (v18 or later recommended), it's package manager (npm) and MongoDB must be installed.


--------------------------
#### 1 - Install Node.JS
You'll need to have homebrew installed in your system for mac and linux and input:
    
    brew install node
in your terminal. For windows you can use WSL to install homebrew or download directly from the node offical website (link: https://nodejs.org/es) this is the easiest way.

After the installation is completed, run the follow:

    node -v 
To check the version and confirm it's been installed succesfully.

-------------------------
#### 2 - Install MongoDB
For MongoDB you can user a cloud database with MongoDB Atlas or if you wish to install it locally you can download it from the MongoDB official website (link:https://www.mongodb.com/try/download/community).

-------------------------
#### 3 - Cloning the Repository to your local system
Open the terminal and run:

    git clone https://github.com/phuongle1911/Oauth-authentication.git

Once you have a local copy of the project. navigate into the project directory to install the packages and dependencies.

Navigate to frontend project directory:

  cd frontend

Navigate to backend project directory:

  cd backend
-------------------------
#### 4 - Install Packages and Dependencies

In the project directory of frontend and backedn, run this in terminal: 
    
    npm install

This will automatically download and install all the necessary packages and create a node_modules folder in your directory. 

--------------------------
#### 5 - Environment Configuration
Database connection and authentification requires environment variables configuration. 
In Backend folder, create a file named '.env' in the project root directory. Next, copy Client ID and Client Secret obtained from Google Cloud Console to the file, and include other information as below example:

    CLIENT_ID = XXXXXXXXXXXX.apps.googleusercontent.com
    CLIENT_SECRET = XXXXXXXXXXXXXXXXXXXXXX
    GOOGLE_OAUTH_URL=https://accounts.google.com/o/oauth2/v2/auth
    GOOGLE_ACCESS_TOKEN_URL=https://oauth2.googleapis.com/token
    PORT = 3000



---------------------------
#### 6 - Run Application
After all the prevoius steps are finished, the app is ready to start. 

In backend directory terminal, run the below:
    
    npm start

In frontend directory terminal, run the below:
    
    npm run dev

To access the app, with auto reaload on changes. The app can be accessed via link provided by vite, usually will be: (link:http://localhost:5173)

To cancel the connection, enter "Ctrl+C". 

