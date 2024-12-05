import cors from "cors";
import dotenv from "dotenv";
import express, { json, urlencoded } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Mongoose } from "mongoose";
import bcrypt from "bcrypt";
import flash from "express-flash";
import session, { Session } from "express-session";
import passport from "passport";
import initializem from "./passportIntializ.js";

async function getUserByEmail(email) {
  const user = await User.findOne({ email });
  return user;
}

async function getUserById(id) {
  const user = await User.findById(id);
  return user;
}

initializem(passport, getUserByEmail, getUserById);

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

// ---------Schemas---------------------


const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  sessionName: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});
const ChatSession = mongoose.model("Session", sessionSchema);

const chatSchema = new mongoose.Schema({
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session",
    required: true,
  },
  message: { type: String, required: true },
  isBot: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now },
});
const Chat = mongoose.model("Chat", chatSchema);

const userToke = {
  name: "",
  email: "",
  id: "",
  SessionId: "",
  authenticate: false,
};

//-----------------------------------------

async function findMessagesBySessionId(sessionId) {
  try {
    const messages = await Chat.find(
      { sessionId: sessionId }, 
      { message: 1, _id: 0 }
    );
    
    console.log(messages);
  } catch (error) {
    console.error('Error finding messages:', error);
  }
}

async function findAllSessions() {
  const sessions = await ChatSession.find({}, { _id: 1 });
  const sessionIds = sessions.map(session => session._id.toString());
  findFirstMessages(sessionIds);
  return sessionIds;
}

async function findFirstMessages(sessionIds) {
  try {
    const firstMessages = [];
    
    for (const sessionId of sessionIds) {
      // Find the first message for the given sessionId
      const message = await Chat.findOne(
        { sessionId: sessionId }, // Match sessionId
        { message: 1, _id: 0 } // Include only the message field
      ).sort({ timestamp: 1 }); // Sort by timestamp in ascending order
      
      // Add the message to the array if it exists
      if (message) {
        firstMessages.push(message.message);
      }
    }
    
    console.log(firstMessages);
    return firstMessages;
  } catch (error) {
    console.error('Error finding first messages:', error);
    throw error;
  }
}




app.post("/signUp", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  try {
    const hashedPasswod = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPasswod,
    });
    newUser.save();
    res.send("User registered successfully");
  } catch (err) {
    console.log(err);
    res.send("User already exists");
  }
});

app.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
  }),
  async (req, res) => {
    userToke.id = req.user._id;
    userToke.name = req.user.name;
    userToke.email = req.user.email;
    userToke.authenticate = true;

    const newSession = new ChatSession({
      userId: req.user._id,
      sessionName: `Session on ${new Date().toLocaleString()}`, // Optional session name
    });
    await newSession.save();
    findAllSessions();
    userToke.SessionId = newSession.id;
    res.send(userToke);
  }
);

app.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    userToke.name = "";
    userToke.email = "";
    userToke.id = "";
    userToke.SessionId = "";
    userToke.authenticate = false;
    res.send("Logged out");
  });
});

app.post("/ChatBot", (req, res) => {
  return res.send(userToke);
});

app.post('/history', async (req, res) => {
  const history = await findFirstMessages(await findAllSessions());
  res.send({history: history});
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

    const mm = await ChatSession.findById(userToke.SessionId);

    const UserChat = new Chat({
      sessionId: mm.id,
      message: message,
      isBot: false,
    });


    const ASTUChat = new Chat({
      sessionId: userToke.SessionId,
      message: text,
      isBot: true,
    });

    await UserChat.save();
    await ASTUChat.save();
    // await findMessagesBySessionId(mm._id);

    
    res.send(text);
  } catch (error) {
    console.error("Error processing request: " ,error);
    res.status(500).json({ error: "Internal Server Error" + error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
