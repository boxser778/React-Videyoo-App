const express = require('express');
const router = express.Router();
const multer = require("multer");
const mongoose = require('mongoose')
var ffmpeg = require("fluent-ffmpeg");
const auth = require("../../middlewares/authorization");
const { Video } = require("../vi/videoModel");
const { validateVideo } = require('./videoValidation');
const chalk = require("chalk");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
        cb(null, 'uploads/');  
    },
    filename: (req , file, cb ) => {
        cb(null, `${Date.now()}_${file.originalname}`);  
    },     
});

// here set the type of files allow to upload to the website
const upload = multer({

fileFilter: function (req, file, cb) {
       if(file.mimetype == "video/mp4"){
        return cb(null,true);
       }else {
        return cb(new Error("Only mp4 file allow"),false);
       }
    }, storage: storage

}).single("file");


//=================================
//             Video
//=================================


router.post('/uploadfiles', auth,(req, res) => {
    upload(req, res, err => {
        if(err) {
            return res.json(err);
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename ,mimetype:res.req.file.mimetype})

    })
});

router.post('/getVideoDetail',(req, res) => {
    Video.findOne({ "_id" : req.body.videoId })
    .exec((err, videoDetail) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({ success: true, videoDetail:videoDetail })
    })
});

router.post('/uploadvideo', auth,(req, res) => {
    const video = new Video(req.body)
    
    video.save((err, doc) => {
        if(err) return res.json({ success: false, err })
        res.status(200).json({ success: true })
    })
})

router.get('/getVideos',(req, res) => {
    Video.find()
        .populate('writer')
        .exec((err, videos) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({ success: true, videos })
        })
})


router.post("/thumbnail",auth, (req, res) => {

    let filePath ="";
    let fileDuration ="";

    ffmpeg.ffprobe(req.body.url, function(err, metadata){
        fileDuration = metadata.format.duration;
    });


    ffmpeg(req.body.url)
        .on('filenames', function (filenames) {
            console.log('Will generate ' + filenames.join(', '))
            console.log(filenames)

            filePath = "uploads/thumbnails/" + filenames[0];
        })
        .on('end', function () {
            console.log('Screenshots taken');
            return res.json({ success: true, url: filePath, fileDuration: fileDuration })
        })
        .on('error', function(err) {
            console.error(err);
            return res.json({ success: false, err });
        })
        .screenshots({
            count: 1,
            folder: 'uploads/thumbnails',
            size:'320x240',
            filename:'thumbnail-%b.png'
        });
      
});


router.post("/my-videos",auth, async (req, res) => {
  try {
    let user = req.body;
    if (user.biz) return res.status(403).json("Un authorize user!");
    const videos = await Video.find({ writer: user._id });
    return res.send(videos);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error.message);
  }
});




router.put("/:id", auth,async (req, res) => {
  try {
    let user = req.user;
    if (!user) {
      console.log(
        chalk.redBright("failed attempted to update a video!")
      );
      return res.status(403).json("You are not authorize to edit video!");
    }

    let video = req.body;
   
    delete video._id;
    const { error } = validateVideo(video);
    if (error) {
      const errorMessage = error.details[0].message;
      console.log(chalk.redBright(errorMessage));
      return res.status(400).send(errorMessage);
    }

    video = {
      title: video.title,
      description: video.description,
      category:video.category,
      privacy:video.privacy
    };

    const filter = {
      _id: req.params.id,
    };

    video = await Video.findOneAndUpdate(filter, video);
    if (!video) {
      console.log(chalk.redBright("No video with this ID in the database!"));
      return res.status(404).send("No video with this ID in the database!");
    }
    video = await Video.findById(video._id);
    return res.send(video);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error.message);
  }
});

router.delete("/delete-one/:id",auth, async (req, res) => {
  try {
    let user = req.user;
    if (!user) {
      console.log(
        chalk.redBright("A non-registerd user attempted to delete a video!!")
      );
      return res.status(403).json("You are not authorize to delete this video!");
    }

    let video = await Video.findOneAndRemove({
      _id: req.params.id,
      user_id: user._id,
    });

    if (!video) {
      console.log(chalk.redBright("Un authorized user!"));
      return res.status(403).send("You are noe authorize to delete videos");
    }

    return res.send("video delete!");
  } catch (error) {
    console.log(chalk.redBright("Could not delet video:", error.message));
    return res.status(500).send(error.message);
  }
});


router.delete("/delete-user-videos/:id",auth, async (req, res) => {
  try {
    let user = req.user;
    if (!user) {
      console.log(
        chalk.redBright("A non-registered user attempted to delete a video!!")
      );
      return res.status(403).json("You are not authorize to delete this video!");
    }
    await Video.deleteMany({writer: req.params.id});

    return res.send("video delete!");
  } catch (error) {
    console.log(chalk.redBright("Could not delet video:", error.message));
    return res.status(500).send(error.message);
  }
});



module.exports = router;
