Softawre required to run the program locally: node.js, python, Git/bash shell & Visual Studio Code (VSCode).

Here git is used only for bash script support, since it is easier to setup.
VSCode is used to make running and deployment easier.

Refer these documentation to install required software
node.js : https://www.geeksforgeeks.org/installation-of-node-js-on-windows
python  : https://www.tutorialspoint.com/how-to-install-python-in-windows
Git     : https://phoenixnap.com/kb/how-to-install-git-windows
VSCode  : https://code.visualstudio.com/Download , download setup for windows and just follow steps in the setup.

Note: if you're in a part of setup which is not specified in tutorial, just press "Next".

1. Download the code folders/files from https://github.com/manishjayswal/FPA_final
   1.1 How to download : Once entering site, press "code" button highlighted in green and then press "download zip". Then Extract the downloaded zip.
   1.2 Open VS Code, and then open the folder in VS Code.

3. To Run the Backend in localhost:
   3.1. Open Bash Terminal(note: this is different than powershell terminal, steps are mentioned at the end of tutorial)
   3.2. Change the directory to FPA_final/backend (command: cd backend)
   3.3. To create virtual environment, run this command in Bash terminal: py -m venv .venv
   3.4. To activate the virtual environment, run this command in Bash terminal: source .venv/Scripts/activate
   3.5. Once the virtual environment is activate, you can see "(.venv)" just on the left of the terminal in current line
   3.6. To install all the required libraries, run: pip install -r requirements.txt
   3.7. Now your Backend is ready, you can start the flask app by the command: flask run
   3.8. To browser your backend: http://localhost:5000/calcm

Note: Once the initial setup is completed, then you no longer need to create virtual environment and install dependencies.
      So, to run it again follow the step 3 excluding 3.3 and 3.6.

4. To run the Frontend in localhost:       
   4.1. Open a new powershell terminal
   4.2. Change the directory to FPA_final (current directory itself)
   4.3. To install node module, run the command: npm install (need to do it only once for initial setup)
   4.4. To run frontend server, run the command: npm start
   4.5. Now your frontend is ready, you can browse frontend at: http://localhost:3000/

5. In case you want to stop the backend or frontend server: press "Ctrl + c" in the respective terminal

6. To Deploy Backend on web(Azure):
   6.1. Download the code from https://github.com/manishjayswal/FPA_final
   6.2. Follow the steps similart to the one in this blog: https://shorturl.at/cryY1
   6.3. while clonning the code repository use this https://github.com/manishjayswal/FPA_final.git
   6.4. After successful deployment you will get one link. Now add /calcm to end of that link and browse, you will get summary output from backend.
        (This is to ensure that your backend system is active and running)

7. To Deploy Frontend on web(Vercel):
   7.1. If not already downloaded, Download the code from https://github.com/manishjayswal/FPA_final 
   7.2. Replace all the "https://fpasimulate.azurewebsites.net" with the link of your backend( in the files: package.json, Desktop1.js, Desktop3.js)
   7.3. Create an account on vercel using your github account.
   7.4. Upload the code on your github account and provide this code repository to vercel.
   7.5. Then vercel will provide you one link which you can use to browse the app.


Opening Bash Terminal:
   -> To open bash terminal in VS Code, first go to "Terminal" in menu, then click on "New Terminal".
   -> Once terminal is opened, go to the dropdown on top right of terminal box, saying "powershell", press dropdown and choose "Git Bash".