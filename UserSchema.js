const Mongoose=require('mongoose')

const UserSchema=Mongoose.Schema({

    firstName:{
        type:String,
        require:true,
        
    },
    lastName:{

type:String,
require:true,
    },
   
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
    },
   address:{
    type:String,
    require:true,
   },
   


})




module.exports=Mongoose.model("UserModel",UserSchema);
