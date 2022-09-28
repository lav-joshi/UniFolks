const express = require('express')
const bodyParser = require('body-parser');

const app = express()
require('dotenv').config()
require("./db/mongoose");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
    res.send("Hello word");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log("Server running on Port " + PORT)
})