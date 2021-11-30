var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors')
const bodyParser=require('body-parser');
var compress = require('compression');

//login imports
require('dotenv').config()
const fileUpload = require('express-fileupload')


var app = express();

const Employee =require('./routes/employee.router/employee')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compress({
level: 6,
threshold: 100* 1000,
filter: (req, res) => {
if(req.headers['x-no-compresion']){
return false
}
return compress.filter(req,res)
},
})
);

const mongoose=require("mongoose");

require("dotenv").config();
const MONGOURI=process.env.MONGO_URI
mongoose.Promise=global.Promise;


mongoose.connect(MONGOURI,{
    useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true 
 }).then(()=>{
      console.log("MongoDb Connected");
  })
  

app.use(fileUpload({
  useTempFiles: true
}))
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

// Employee Router
app.use('/api',Employee)


app.listen(9090, () => {
  console.log("Backend server is running!");
});