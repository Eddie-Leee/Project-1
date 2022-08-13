const router = require ("express").Router();
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const User = require("../models").userModel;
const jwt = require("jsonwebtoken");

router.use((req,res,next) =>{
    console.log("A request is coming in to auth.js");
    next();
});

router.post("/register", async (req,res) => {
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const emailExist = await User.findOne({email : req.body.email});
    if (emailExist) 
        return res.status(400).send("Email has already been registered.");

    const newUser = new User({
        email : req.body.email,
        username : req.body.username,
        password : req.body.password,
        role : req.body.role,
    });

    try{
        const savedUser = await newUser.save()
        res.status(200).send({
            msg : "success",
            savedObject : savedUser,
        })
    }catch (err){
        res.status(400).send("User not saved.");
    }
});

router.post("/login", (req,res)=>{

    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    User.findOne({email: req.body.email}, function(err, user){
        if (err){
            res.status(400).send(err)
        }
        if (!user){
            res.status(401).send("user not found!");
        }else{
            user.comparePassword(req.body.password, function(err, isMatch){
                if (err) return res.status(400).send(err);
                if (isMatch) {
                    const tokenObject = {_id: user._id, email:user.email};
                    const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
                    res.send({success: true, token:"JWT "+token, user});
                }else{
                    res.status(401).send("Wrong password");
                }
            });
        }
    })

})

module.exports = router;