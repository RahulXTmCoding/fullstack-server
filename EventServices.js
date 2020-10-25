const EventModel=require('./EventSchema')
const UserModel=require('./UserSchema')

exports.addEvent=async function(req,res){

const {

eventName,
eventDate,
eventType,
description,
location,


}=req.body

console.log(req.body)

if(!(eventName && eventType && eventDate && description && location))
{
      res.json({success:false,message:"Please Provide all the details"});
        return

}

     const user=await UserModel.findById(req.user._id)
     
     if(!user)
     {
       res.json({status:0,message:'User Does not exist'});
       return 
     }
 
    const event=await new EventModel({
      eventName,
      eventDate,eventType,
      description,location,
      user:user._id
    });
   await event.save()


res.json({success:true,data:event,message:'added successfull'})


    


}


exports.editEvent=async function(req,res){

    const {
         id,
        eventName,
        eventDate,
        eventType,
        description,
        location,
        
        
        }=req.body
        
        if(!(eventName && eventType && eventDate && description && location))
        {
              res.json({success:false,message:"Please Provide all the details"});
                return
        
        }
        const user=await UserModel.findById(req.user._id)
     
     if(!user)
     {
       res.json({status:0,message:'User Does not exist'});
       return 
     }
 
        
        const event=await EventModel.findById(id);
        if(!event)
        {
          res.json({status:0,message:'event Does not exist'});
          return 
        }
    
        
        event.eventName=eventName;
        event.eventDate=eventDate;
        event.eventType=eventType;
        event.description=description;
        event.location=location;
        
        
        await event.save();
        
        
    res.json({success:true,data:event,message:'Edit successfull'})
        
        
        
    


}


exports.deleteEvent=async function(req,res){

const {
id,

}=req.body
const user=await UserModel.findById(req.user._id)
     
     if(!user)
     {
       res.json({status:0,message:'User Does not exist'});
       return 
     }
 
if(!(id))
{
      res.json({success:false,message:"Please Provide all the details"});
        return

}

    let user=await EventModel.findByIdAndDelete(id)

    res.json({success:true,message:"Deleted "});

   
}


exports.getAllEvents=async function(req,res){



    const user=await UserModel.findById(req.user._id)

    if(!user)
    {
      res.json({status:0,message:'User Does not exist'});
      return 
    }


    const eventList=await EventModel.find({user:user._id})


    console.log(eventList)
    
         res.json({success:true,data:eventList,message:'successfull'})
       
    }



    exports.getEvent=async function(req,res){



      const user=await UserModel.findById(req.user._id)
  
      if(!user)
      {
        res.json({status:0,message:'User Does not exist'});
        return 
      }
  
  
      const eventList=await EventModel.findOne({user:user._id,_id:req.params.eventId})
    
  
  
      console.log(eventList)
      
           res.json({success:true,data:eventList,message:'successfull'})
         
      }