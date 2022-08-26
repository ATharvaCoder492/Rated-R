var express = require("express");
var router = express.Router();
var fs = require("fs");
const nodemailer = require("nodemailer");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});
router.get("/about", function (req, res, next) {
  res.render("about");
});
router.get("/contact", function (req, res, next) {
  res.render("contact");
});
router.get("/gallery", function (req, res, next) {
  res.render("gallery");
});
router.post("/submit", function (req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var number = req.body.number;
  fs.appendFile(
    "data.txt",
    `name: ${name},email:${email},number:${number}\n`,
    function (e) {
      if (e) {
        console.log(e);
      }
      // Creating a Transporter Mechanism
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "atharvacoder492@gmail.com",
          pass: "rlbgmrnhhpnjnnaa",
        },
      });
      // Creating Mail Option
      var mailOpt = {
        from: "ratedr@gmail.com",
        to: req.body.email,
        subject: "Show booked succesfully",
        text: "Congrats!, you have succesfully booked the tickets for the show ",
      };
      // Sending Mail
      transporter.sendMail(mailOpt, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          res.render("success");
        }
      });
    }
  );
  // console.log(name, email, number);
});
module.exports = router;
