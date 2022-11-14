const express = require('express')
const bodyParser = require('body-parser');
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");
const cookieParser = require("cookie-parser");
const Chat = require('./models/Chat')
const app = express()

require('dotenv').config()
require("./db/mongoose");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);

const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true,
    },
});

  
app.get('/', (req, res) => {
    res.send("Server is running");
});

const PORT = process.env.PORT || 5000;

io.on('connection', (socket)=>{
    // console.log("New Web Socket Connection");

    socket.on('join',({email}, callback)=>{
        socket.join(email);   
    })

    socket.on('sendMessage', ({message, userId, friendId})=>{
        Chat.create({
            sender: userId,
            receiver: friendId,
            message,
        }, (err, chat)=>{
            io.to(userId).emit('message',{message , userId});
            io.to(friendId).emit('message',{message , userId});
        })
    })

    socket.on('disconnector', ()=>{
        console.log("Disconnection has been made");
    })
})

server.listen(PORT, ()=>{
    console.log("Server running on Port " + PORT)
})