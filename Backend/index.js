const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const chat = require("./models/chatmodel");
const userRoutes = require('./Routes/userRoutes');
const chatRoutes = require('./Routes/chatRoutes');
const messageRoutes = require('./Routes/messageRoutes');


dotenv.config(); // Load environment variables
const cors=  require("cors");
 mongoose.connect("mongodb://localhost:27017/CHAT", {
   useNewUrlParser: true,
   useUnifiedTopology: true,
 }).then(() => {
   console.log("Connected to MongoDB");
 }).catch((error) => {
   console.error("Error connecting to MongoDB:", error);
 });

const app = express();
app.get('/',(req,res)=>{
    res.send('Hello World');
})
app.use(cors({
  origin: "http://localhost:3000", // React frontend URL
  credentials: true // Allow sending cookies/auth headers
}));

app.use(express.json());

app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/message',messageRoutes);
const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}...`);
});