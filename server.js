const express=require('express');


const { v4: uuidV4 } = require('uuid')
const app=express()

const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const cors=require('cors');
const { Socket } = require('dgram');
const userRouter=require('./userController');
var cookieParser    =     require('cookie-parser');
const EventRouter=require('./EventController')
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,PATCH');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    });
app.use(express.static('./'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('trust proxy', 1)
app.use(cors({origin: '*', credentials:true }));

app.use(cookieParser("secretSign#143_!223"));
mongoose.connect('mongodb+srv://pataranAdmin:WtrlCAzO2qr0HnSv@cluster0.scpvd.mongodb.net/assignment?retryWrites=true&w=majority',{useNewUrlParser: true})


db=mongoose.connection;
if(db)
{
    console.log("db Connection established");
}





const port=process.env.PORT || 4000;;


app.use("/api/auth",userRouter);


app.use("/api/event",EventRouter);



app.listen(port,()=>{


    console.log("Server is listening at :"+port);
})