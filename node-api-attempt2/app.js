const express=require('express');
const app=express();
const cors=require('cors');

const bodyParser=require('body-parser')
require('dotenv/config');

app.use(cors());
app.use(bodyParser.json());

//IMPORTS ROUTES
const postsRouter=require('./routes/post')

app.use('/posts',postsRouter)

//LISTEN TO SERVER

app.listen(3000);


//db connection
const mongoose = require('mongoose')
mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser:true,useUnifiedTopology:true},

err => {
    if(!err)
    console.log("connection succeessful")
    else
    console.log("error in connecting: ")

})