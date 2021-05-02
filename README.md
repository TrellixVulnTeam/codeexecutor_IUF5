### Open Source TheCoolter Documentation
This is a bot I (InimicalPart) created, this bot can be used for moderation and for having fun! If you would like a suggestion to be added. Create one in the Issues tab on github and select the tag "Suggestion" and I will check them out!

## How to get started
First of all you need to have a Discord account, obviously...
Okay, jokes aside. Head on over to [Discord's Developer Portal](https://discord.com/developers/applications) and create a new application and call it what you want your bot to be named and press "Create". After that click on "Bot" located on the left of the webpage. You should come to "Build-A-Bot". Press "Add Bot" and then "Yes, do it!". Here you will see the username of the bot, the profile picture and some settings. If you want set a profile picture but that is not necessary right now. Click on "Copy" under the "Click to Reveal Token" text. Now download this github repository through the website. If you are using Linux or Mac you can also do it using the command line. It is also possible for Windows but you'll need to install Git.

Linux and Mac: `git clone https://github.com/InimicalPart/OSDBot.git`

Now that you have the repository downloaded you will need to install [Node.js](nodejs.org/en/) to be able to run the bot successfully.
Once installed and set up you can start telling the program about your bot. Remember the token we copied earlier? Well now we will use it. In the repository you will see a file called ".env_sample" (If you are on linux files starting with "." are hidden so enable "View Hidden Files"). Rename the ".env_sample" file to ".env" and open it with a text editor. in there you will see "TOKEN=ENTER_YOUR_TOKEN_HERE". Change it to "TOKEN=" and then your token that you got from the Discord Developer Portal. It should look something like this: "TOKEN=Nzc4MDI2MDk1MDI3MDI4MDI5.X7L_RA.Sl3X2-l9SbqhT2GN48_MddmBZt4". Don't try to use it as I have removed this bot before publishing it.

Now you are almost done! Get back to the Discord's Developer Portal and click "OAuth2". This is how you can add your bot to a server. In the "SCOPES" box select "bot". Below the "SCOPES" box should another box called "BOT PERMISSIONS" show up. In there, select "Administrator". In the first box there should now be a link that looks somehow like this: "https://discord.com/api/oauth2/authorize?client_id=77802\*\*\*\*\*\*\*\*\*\*029&permissions=8&scope=bot". Copy the link and open in in your web browser. It will ask you which server you want the bot to join. NOTE: You have to have the permission "Manage Server" in the server you want to add it in else it won't show up. Select your server and press "Continue", complete the reCAPTCHA and your bot should join the server.

You're basically done! To start the server go in a Command Prompt (by pressing the Windows Key and "R" at the same time and typing cmd.). On Linux/Mac it's called Terminal. When you're in the Command Prompt/Terminal type `npm install` and then `node main.js` the bot should come online and everything should be working. If not, make a post in the Issues tab on github and I or other people will help you!

# Optional
The bot will need to be running on your PC and as long as it is on that will make the bot be online and will be answering to your commands. Of course that will annoying as you need your PC to be running 24/7 if you want it to. So I have a tip for you!

To make the bot run 24/7 even when your PC is off you could use a hosting service to have your bot be online 24/7.

# 24/7 Guide
If you need and want to make your bot go 24/7 open the folder in the directory called "Heroku24-7" and run the .bat (Windows) or the .sh (Linux/Mac) file called "Setup.sh/.bat". Now all the files from the main directory should have been copied over to that folder with an extra file called "Procfile" this tells the hosting service we are gonna how to start the bot. Okay, now that we are ready, head on over to the [Heroku Signup Page](https://signup.heroku.com/) and make an account. After creating your account it should redirect you to the dashboard. Click on "New" in the top right and select "Create new app". The app name does not really matter so you can call it whatever. NOTE: The name needs to be all lowercase and cannot contain spaces. After entering the name click on "Create app". It will redirect you to the deploy page of your app. Then you have 3 Deployment methods to use, i recommend github but Heroku is much safer and much easier to do, so we will choose that. For this method you will need to install the Heroku CLI:

Windows 64-bit: [Installer](https://cli-assets.heroku.com/heroku-x64.exe)
Windows 32-bit: [Installer](https://cli-assets.heroku.com/heroku-x86.exe)
Mac (Terminal): `brew tap heroku/brew && brew install heroku`
Linux (Terminal): `sudo snap install --classic heroku` NOTE: [snap](https://snapcraft.io/docs/installing-snapd) needs to be installed.

Now get over to your Command Prompt/Terminal and enter `heroku login` press any key and it will open the browser and try to login via the webpage. When it takes you there click "Log In" and log in with your account you just created. After that, go back to your Command Prompt/Terminal and it will say "Logged in as \*YOUREMAIL\*". Now you will need to install [Git](https://www.atlassian.com/git/tutorials/install-git). After installation execute these commands:

`git config --global user.name "Your Full Name"`
`git config --global user.email "Your Email Address"`

Now in the Command Prompt/Terminal change the directory to the "Heroku24-7" folder and execute these following commands:
`git init`
`heroku git:remote -a \*HerokuAppName\*`
`git add .`
`git commit -am "My first commit. YAY!"`
`git push heroku master`

If you did everything correct you should get:

remote: -----> Build succeeded!
remote: -----> Discovering process types
remote:        Procfile declares types     -> BotStart
remote:        Default types for buildpack -> web

as an output. Go to the page and go to the "Rescources" tab and press on the pen next to the "web" and the "BotStart" boxes. Turn off "web" and turn on "BotStart". Click "Confirm" on both of the boxes. If you did it correctly your bot should be online and active.

## If an update occurs

If I publish an update, this is how you update your bot:

First of all move the config.json file from the directory to another folder. Otherwise it will be deleted and you will need to start over.