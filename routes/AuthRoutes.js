const express = require('express');
const router = express.Router();
const {RegisterController, LoginController} = require('../controllers/AuthControllers');
const passport = require('passport');
router.get("/register",(req,resp)=>{
    resp.render('register',{title:"Registration Page"});
});
router.post("/register",RegisterController);

router.get("/login",(req,resp)=>{
    resp.render('login',{title:"Login Page"});
});
router.post("/login", (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if(info)
    {
        if(info.message === 'Incorrect password.')
        return res.redirect('/api/auth/login');  
    }

    if (!user) {
      // Use flash to store the error message
      req.flash('error', info.message);

      // Redirect to login page
      return res.redirect('/api/auth/register');
    }

    // If authentication is successful, log in the user
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      // Redirect to home page or any other route
      return res.redirect('/home');
    });
  })(req, res, next);
});
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/api/auth/login');
      });
  });

module.exports = router;