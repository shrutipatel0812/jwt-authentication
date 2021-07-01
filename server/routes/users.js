const router = require("express").Router();
const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_AUTH);
const fetch= require('node-fetch');


require("dotenv").config();


router.post("/register", async (req, res) => {
  try {
    const { email, password, passwordVerify } = req.body;

    // validation

    if (!email || !password || !passwordVerify)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    if (password.length < 6)
      return res.status(400).json({
        errorMessage: "Please enter a password of at least 6 characters.",
      });

    if (password !== passwordVerify)
      return res.status(400).json({
        errorMessage: "Please enter the same password twice.",
      });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        errorMessage: "An account with this email already exists.",
      });

    // hash the password

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // save a new user account to the db

    const newUser = new User({
      email,
      passwordHash,
    });

    const savedUser = await newUser.save();

    // sign the token

    const token = jwt.sign(
      {
        user: savedUser._id,
      },
      process.env.JWT_SECRET
    );

    // send the token in a HTTP-only cookie

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});
  
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate

    if (!email || !password)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(401).json({ errorMessage: "Wrong email or password." });

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!passwordCorrect)
      return res.status(401).json({ errorMessage: "Wrong email or password." });

    // sign the token

    const token = jwt.sign(
      {
        user: existingUser._id,
      },
      process.env.JWT_SECRET
    );

    // send the token in a HTTP-only cookie

    res
      .cookie("token", token, {
        httpOnly: true,
       
      })
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});


router.get('/loggedIn' ,(req,res)=>{
  try{
        
    const token = req.cookies.token;
    if(!token){
        return res.json(false);
    }

    jwt.verify(token ,process.env.JWT_SECRET);

  res.send(true);
}catch(err){
    res.json(false)
}
})


router.get('/username' ,(req,res)=>{
  try{
        
    const token = req.cookies.token;
    if(!token){
        return res.json("");
    }

    const verified = jwt.verify(token ,process.env.JWT_SECRET)
        
        req.user=verified.user;
      console.log(req.user);
  res.send(req.user);
}catch(err){
    res.json("")
}
})


router.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
     
    })
    .send();
});


router.post("/googleLogin",async(req,res)=>{
    const {tokenId} = req.body;
    client.verifyIdToken({idToken:tokenId, audience:process.env.GOOGLE_AUTH})
    .then(response =>{
        const{email_verified, name,email}=response.payload;
        console.log(response.payload);
        console.log(email_verified);
        if(email_verified){
          console.log("email_verified");
          User.findOne({email}).exec(async(err ,user)=>{
            if(err){
              return res.status(400).json({
                error:"somthing went wrong"
              })
            }else{
              if(user){
                const token = jwt.sign(
                  {
                    user: user._id,
                  },
                  process.env.JWT_SECRET
                );
            
                // send the token in a HTTP-only cookie
                  console.log(token);
                res.cookie("token", token, {
                    httpOnly: true,
                  }).send();
                  
              }else{
                let password = email+ process.env.JWT_SECRET;
                const salt = await bcrypt.genSalt();
                const passwordHash = await bcrypt.hash(password, salt);
                const newUser = new User({email,passwordHash});
                newUser.save((err,data)=>{
                  if(err){
                    return res.status(400).json({
                      error:"Somthing went wrong"
                    })
                  }
                  const token = jwt.sign(
                    {
                      user: newUser._id,
                    },
                    process.env.JWT_SECRET
                  );
                  console.log("new user");
                    res.cookie("token", token, {
                      httpOnly: true,
                    })
                })
              }
            }
          })
        }else{
          console.log("email not verified");
        }
    })
})




router.post("/facebookLogin",(req,res)=>{
  console.log('FACEBOOK LOGIN REQ BODY', req.body);
  const { userID, accessToken } = req.body;

  const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;

  return (
    fetch(url, {
      method: 'GET'
    })
      .then(response => response.json())
      // .then(response => console.log(response))
      .then(response => {
        const { email, name } = response;
        User.findOne({ email }).exec(async(err, user) => {
          if(err){
            return res.status(400).json({
              error:"somthing went wrong"
            })
          }else{
            if(user){
              const token = jwt.sign(
                {
                  user: user._id,
                },
                process.env.JWT_SECRET
              );
          
              // send the token in a HTTP-only cookie
                console.log(token);
              res
                .cookie("token", token, {
                  httpOnly: true,
                 
                })
                .send();
          } else {
            let password = email+ process.env.JWT_SECRET;
                const salt = await bcrypt.genSalt();
                const passwordHash = await bcrypt.hash(password, salt);
                const newUser = new User({email,passwordHash});
                newUser.save((err,data)=>{
                  if(err){
                    return res.status(400).json({
                      error:"Somthing went wrong"
                    })
                  }
              const token = jwt.sign(
                { user: newUser._id },
                process.env.JWT_SECRET
              );
              res
              .cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
              })
              .send();
            });
           
          }
        }
        });
      })
      .catch(error => {
        res.json({
          error: 'Facebook login failed. Try later'
        });
      })
  );
});






  module.exports = router;