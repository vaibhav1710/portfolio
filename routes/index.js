var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const flash = require('connect-flash');

mongoose.connect('mongodb://127.0.0.1:27017/portpoliop');

const formSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  subject: String,
  message: String,
});

const Contact = mongoose.model('Contact',formSchema);

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/submit", async(req,res) => {
  const {fullName, email, subject,message } = req.body;

  try {
    // Save form data to MongoDB
    const newContact = new Contact({ fullName, email,subject,message });
    await newContact.save();
    req.flash("success", 111);
    res.redirect("/after");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.get('/after', (req, res) => {
   const flashMessage = req.flash("success");
  if(flashMessage==111){
     res.send("Successfully Sent");
  }else{
    res.send("Failed!");
  }
}); 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get("/about", function(req,res,next){
  res.render("about");
})
router.get("/project", function(req,res,next){
  res.render("project");
})
router.get("/contact", function(req,res,next){
  res.render("contact");
})

module.exports = router;
