const validateRegistration = require("./usersValidations/registraion");
const validateSignin = require("./usersValidations/signIn");
const {
  comparePassword,
  generateHashPassword,
} = require("../../services/bcrypt");
const { generateAuthToken } = require("../../services/token");
const validateUser =require("./usersValidations/userValidation")
const _ = require("lodash");
const router = require("express").Router();
const User = require("./userModel");
const auth = require("../../middlewares/authorization");
const chalk = require("chalk");
const {OAuth2Client} = require('google-auth-library');
const { response } = require("express");

// insert your google client id 
const clientTokenId = new OAuth2Client("")

router.post("/register", async (req, res) => {
  const { error } = validateRegistration(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(
    _.pick(req.body, ["name", "email", "password","url"])
  );

  user.password = generateHashPassword(user.password);
  await user.save();
  res.send(_.pick(user, ["_id", "name", "email"]));
});

router.post("/login", async (req, res) => {
  const { error } = validateSignin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = comparePassword(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  res.json({
    token: generateAuthToken(user),
  });
});

router.post("/userInfo",async (req, res) => {
  User.findOne( { "_id" : req.body.userId } )
  .select(["-password", "-createdAt", "-__v"])
  .exec((err, userDetails) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({ success: true, userDetails:userDetails })
    })
});

router.get("/my-users",auth, async (req, res) => {
let user = req.user;

if(user.isAdmin){
  try {
    const users = await User.find();
    return res.send(users);
    
  } catch (error) {
    console.log("here");
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error.message);
  }
}
});


router.post("/googlelogin", async (req, res) => {
let token_Id = req.body.tokenId;

try {
 let user = await User.findOne({ email: token_Id.profileObj.email });

    if (user) {
   return res.json({
    token: generateAuthToken(user),
  });
  
      }
      else{

    let password = generateHashPassword(token_Id.tokenId);

  user = new User({
      password: password,
      email: token_Id.profileObj.email,
      name: token_Id.profileObj.givenName,
      url: token_Id.profileObj.imageUrl,
      user_id: token_Id._id,
    });


      await user.save();

        return res.json({
    token: generateAuthToken(user),
  });
  }

} catch (error) {
   console.log(error.message);
}
  
})

router.put("/set-admin",auth,async (req, res) => {
try {
  
    let userTmp = req.body;

    updateUser = await User.findByIdAndUpdate({_id: userTmp._id},[{$set:{isAdmin:{$eq:[false,"$isAdmin"]}}}]);

    if (!userTmp) {
      console.log(chalk.redBright("No such a User Exist!"));
      return res.status(404).send("No such a User Exist!");
    }
    changedUser = await User.findById(userTmp._id);
    return res.send(changedUser);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error.message);
  }
});

// delete user

router.delete("/:id",auth, async (req, res) => {
  try {
   let user = req.user;
    if (!user) {
      console.log(
        chalk.redBright("Need to log in")
      );
      return res.status(403).json("You are not authorize to delete this videos!");
    }
    
    let userTmp = await User.findByIdAndDelete(req.params.id);

    if (!userTmp) {
      console.log(chalk.redBright("Un authorized user!"));
      return res.status(403).send("You are noe authorize to delete videos");
    }

    return res.send(userTmp);
  } catch (error) {
    console.log(chalk.redBright("Could not delete videos:", error.message));
    return res.status(500).send(error.message);
  }
});



router.put("/:id", auth,async (req, res) => {
  try {
    let user = req.body;
    if (!user) {
      console.log(
        chalk.redBright("failed attempted to update a User!")
      );
      return res.status(403).json("You are not authorize to edit User!");
    }
    
    const { error } = validateUser(user);
    if (error) {
      const errorMessage = error.details[0].message;
      console.log(chalk.redBright(errorMessage));
      return res.status(400).send(errorMessage);
    }

    user = {
      name:user.name,
      email:user.email,
      url:user.url,
    };
   
    const filter = {
      _id: req.params.id,
    };

    user = await User.findOneAndUpdate(filter, user);
    if (!user) {
      console.log(chalk.redBright("No User with this ID in the database!"));
      return res.status(404).send("No User with this ID in the database!");
    }
    user = await User.findById(user._id);
    return res.send(user);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error.message);
  }
});


module.exports = router;
