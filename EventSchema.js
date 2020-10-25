const Mongoose=require('mongoose')

const EventSchema=Mongoose.Schema({

    eventName:{
        type:String,
       
        
    },
    eventDate:{

type:Date,

    },
   
    eventType:{
        type:String,
                
    },
    description:{
        type:String,
            },

    location:{
        type:String,
        
    },
    user:{
        type:Mongoose.Schema.Types.ObjectId,
        ref:'UserModel'
    }


})




module.exports=Mongoose.model("EventModel",EventSchema);
