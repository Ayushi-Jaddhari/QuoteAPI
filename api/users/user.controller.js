const {create,getQuotes,deletequotes,getUserByEmail,createQuotes} = require('./user.service');
const {genSaltSync,hashSync,compareSync}= require('bcrypt');
const {sign}= require('jsonwebtoken');
module.exports ={
    createUser:(req,res)=>{
        console.log(body);
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password,salt);
        create(body,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({success:0,message:"database connection error"});
            }
            return res.status(200).json({
                success:1,
                data:results
            });
        });
    },
    getQuotes:(req,res)=>{
        getQuotes((err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({message:'Nothing recieved'});
            }
            if(!results){
                return res.json({success:0,message:'No Data'});
            }
            return res.json({success:1,data:result});
                })
    },
    deletequotes:(req,res)=>{
        const data= req.body;
        deletequotes(data,(err,callback)=>{
            if(err){
                console.log(err);
                return res.status(500).json({message:'Nothing recieved'});
            }
            if(!results){
                return res.json({success:0,message:'Record not found'});
            }
            return res.json({success:1,message:"Quotes deleted"});
                })
    },
    login:(req,res)=>{
        const body= req.body;
        getUserByEmail(body.email,(err,results)=>{
            if(err){
                console.log(err);
            }
            if(!results){
                return res.json({success:0,data:"invalid email or password"});
            }
            const result= compareSync(body.password,results.password);
            if(result){
                results.password= undefined;
                const jsonwebtoken = sign({result:results},process.env.secret,{expiresIn:'1h'});
                const cookieOptions = {
                    expires: new Date(
                      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true, //To prevent from hacking
                  };
                  
                return res.json({
                    success:1,
                    message:'Login Successfully',
                    token:jsonwebtoken
                })
            }else{
                return res.json({success:0,message:'Invalid email and password'});
            }
        })
    },
    createQuotes:(req,res)=>{
        console.log(body);
        const body = req.body;
        body.Date = new Date();
        createQuotes(body,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({success:0,message:"database connection error"});
            }
            return res.status(200).json({
                success:1,
                data:results
            });
        });
    },
}