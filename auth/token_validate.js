const {verify}= require('jsonwebtoken');

module.exports={
    checkToken:(req,res,next)=>{
        let token = req.get("authorization");
        if(token){
token = token.splice(7);
verify(token,process.env.secret,(err,decoded)=>{
    if(err){
        res.json({success:0,
            message:'Invalid token'})
    }else{
        next();
    }
})
        }else{
            res.json({success:0,
            message:'Access denied! Unauthorized user'})
        }
    }
}