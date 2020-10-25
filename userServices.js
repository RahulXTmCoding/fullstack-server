const UserModel=require('./UserSchema')
const jwt=require('jsonwebtoken')
const nodemailer=require('nodemailer')

exports.login=async function(req,res){

if(!(req.body.email && req.body.password))
{
     res.json({success:false,message:"Email and Password Required"});
     return
}

    let user=await UserModel.findOne({email:req.body.email})

    if(!user)
    {
        res.json({success:false,message:"User with given Email does not exist"});
       return
    }

    if(user.password!==req.body.password)
    {
      res.json({success:false,message:"Password is Incorect"});
         return
    }

    const userRo=getUserRo(user);


    console.log(userRo)

let session=req.session;


session.email=req.body.email;

console.log(session)
res.cookie("email", req.body.email); 
res.json({success:true,data:userRo,message:'Login successfull'});

  




}


exports.register=async function(req,res){

const {

email,
firstName,
lastName,
address,
password


}=req.body

if(!(email && firstName && lastName && address && password))
{
      res.json({success:false,message:"Please Provide all the details"});
        return

}

    let user=await UserModel.findOne({email:req.body.email})
    console.log(user);
    if(user)
    {
        res.json({success:false,message:"User with given Email already exist"});
        return        
    }

    const newUser=new UserModel();
    newUser.email=email;
    newUser.password=password;
    newUser.firstName=firstName;
   newUser.lastName=lastName;
   newUser.address=address


    newUser.save().then((User)=>{

        
        const userRo=getUserRo(newUser);
let session=req.session;


session.email=email;
session.save();
res.cookie("email", req.body.email); 
    res.json({success:true,data:userRo,message:'Register successfull'})



    }).catch(error=>{
        if(error)
        {
            res.json({success:false,message:'Unable to register',error:error})
    return
        }
    
    })


    


}

const getUserRo=(user)=>{

    console.log(user);
   
    user.password="************"
    return ({
        uId:user._id,
        firstName:user.firstName,
        email:user.email,
        token:generateJwtToken(user),
    });

}

const generateJwtToken=(user)=>{

    let user1={
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
    }

    return jwt.sign({user1},"assignment")

}



exports.logout=async function(req,res){

let session=req.session;


session.email=null;
    
  

}




exports.isLoggedIn=async function(req,res,next){
    const authHeader = req.headers.authorization;
 
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, 'assignment', (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user.user1;
            next();
        });
    } else {
        res.sendStatus(401);
    }
  

}
