!!! this application use ffmpeg to be able to function properly.

!!! incase the video thumbnail after you choose a file not showen download this folder and move it into the drive where your window install (mycomputer > C:/)
follow those steps:
1. download this folder from this link - https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-full.7z
    (if you want to check the website itself you can aswell download directly from the website : https://www.gyan.dev/ffmpeg/builds/ look for this link:
ffmpeg-release-full.7z).

2. after download extrect the folder and change the folder name to this: ffmpeg.

3. place the folder inside myComputer > C:/ where your windows installed. 

4. you done it will work now.

those steps needed for add missing codecs to your pc.

Videyoo App -

this is a application to upload videos and share them with other people.

simply to use and easy to work with.

inside folder upload there are few videos to use for upload(video type mp4).

@@@ Routes @@@

http://localhost:8181/api/videos/getVideos - get all the videos on the Database.

http://localhost:8181/api/videos/uploadvideo - create new object on Database.

http://localhost:8181/api/videos/getVideoDetail - get spacific video details.

http://localhost:8181/api/videos/uploadfiles - upload file into directed folder.

http://localhost:8181/api/videos/thumbnail - create video thumbnail.

http://localhost:8181/api/videos/my-videos - get videos by logged id.

to active google account login:

go to google cloud dashboard:

https://console.cloud.google.com/

create new project and connect the app to it.

in Credentials > The App Name > copy:

Client ID paste inside: client > .env.development > GOOGLE_LOGIN_ID = client > src > app > const clientId = ""; 
and inside here aswell: 
server > Routes > Users > userRouter.js > const clientTokenId = new OAuth2Client("") server > passport > const GOOGLE_CLIENT_ID=""

Secret Key paste inside: sever > passport > const GOOGLE_CLIENT_SECRET=""

and google login should work.

the resolution is set to :

Laptop : 1440

Phone : 425

Pc : full screen
