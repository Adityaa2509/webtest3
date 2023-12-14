const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
require('dotenv').config();
const flash = require('connect-flash');
const path = require("path");
const bodyParser = require('body-parser');
const methodOverride  = require('method-override');

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');
const protected =  require('./middlewares/auth');
//session to keep track of login state
let configSession = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}

app.use(session(configSession));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email });
  
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
  
        const passwordMatch = await bcrypt.compare(password, user.password);
  
        if (!passwordMatch) {
          return done(null, false, { message: 'Incorrect password.' });
        }
  
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));

app.use(express.json());
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname,'views'));
//app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));

require('./config/database').connect();

/*************************** **********************/

const phone = require('./models/Phone');
const AuthRoutes = require('./routes/AuthRoutes');
const ProductRoutes = require('./routes/ProductRoutes');
app.use("/api/auth",AuthRoutes);
app.use("/phones",ProductRoutes);


app.get('/login', (req, res) => {
  res.render('login',{title:"Login Page"}); 
});
app.get('/register', (req, res) => {
res.render('register',{title:"Register Page"}); 
});

/*************************** **********************/
app.get("/",(req,resp)=>{
    return resp.json({msg:"Server Running",status:400});
})

app.get('/home',protected.isAuthenticated ,async(req, res) => {
    const user = req.user;
    const allPhones = await phone.find();
    console.log(allPhones);
    res.render('home', { title: 'HomePage',user: user,allPhones: allPhones});
});

app.listen(PORT,()=>{
    console.log(`Server is Running at PORT :- ${PORT}`);
})