import cors from "cors";
import dotenv from "dotenv";
import express, { json, urlencoded } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Mongoose } from "mongoose";
import bcrypt from "bcrypt";
//import { User } from "./models/user.js";
import flash from "express-flash";
import session from "express-session";
import passport from "passport";
import initializem from "./passportIntializ.js";

async function getUserByEmail(email) {
  const user = await User.findOne({ email });
  console.log("User fetched by email:", user);
  return user;
}



async function getUserById(id) {
  const user = await User.findById(id);
  console.log("User fetched by ID:", user);
  return user;
}


initializem(
  passport,
  getUserByEmail,
  getUserById
);

const PORT = 8000;
dotenv.config();

const app = express();
const mongoose = new Mongoose();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.use(express.static("public"));
app.use(flash());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(
  session({
    secret: "outu",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, // Prevents client-side access to the cookie.
      secure: process.env.NODE_ENV === "production", // Use HTTPS in production.
      maxAge: 1000 * 60 * 60 * 24, // Set cookie lifespan to 1 day (in milliseconds).
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());



mongoose.connect("mongodb://127.0.0.1:27017/UsersDB");


const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});


const User = mongoose.model("User", userSchema);

const userToke= {
  name: "",
  authenticate: false,
}

// passport.use(User.createStrategy());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

app.post("/home", (req, res) => {
  if (req.isAuthenticated()) {
    res.send({
      authenticate: true,
      name: req.user.name,
    });
  } else {
    res.send({
      authenticate: false,
    });
  }
});

app.post("/signUp", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  try{
    const hashedPasswod = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPasswod,
    });
    newUser.save();
    res.send("User registered successfully");
  }catch(err){
    console.log(err);
    res.send("User already exists");
  }

  
});




app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  failureFlash: true
}), (req, res) => {
  console.log(req.user);
  userToke.name = req.user.name;
  userToke.authenticate = true;
  res.send(userToke);
});

// Handle failed authentication requests
app.post('/login', (req, res) => {
  res.send('Not logged in');
});




function checkNotAuthenticated(req, res, next) {
  if (userToke.authenticate) {
    return res.send(userToke);
  }
  next();
}


app.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.send("Logged out");
  });
});

app.use((req, res, next) => {
  console.log("Session:", req.session);
  next();
});


app.post('/ChatBot', (req, res) => {
    return  res.send(userToke);
});



app.post("/gemini", async (req, res) => {
  try {
    const history = req.body.history;
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const chat = model.startChat({
      history: history,
    });
    const message = req.body.massage;
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();
    console.log(response.candidates[0].content);
    res.send(text);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" + error });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
