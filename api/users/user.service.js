const pool = require("../../config/database");

module.exports ={
    create : (data,callback)=>{
        pool.query(
            'insert into users(email,password) values(?,?)',
        [data.email,
        data.password
    ],
    (err,results,fields)=>{
        if(err){
          return  callback(err);
        }
        return callback(null,results);
    }
    );
    },
    getQuotes: callback =>{
        pool.query('select * from quotes',[],(err,results,fields)=>{
             if(err){
                 return callback(err);
             }
             return callback(null,results);
         }
         );
     },
     deletequotes : (data,callback)=>{
         pool.query(
             'delete from quotes where id =?',[data.id],
             (err,results,fields)=>{
                 if(err){
                     return callback(err);
                 }
                 return callback(null,results);
             });
     },
     getUserByEmail : (email,callback)=>{
        pool.query(
            'select * from quotes where email =?',[email],
            (err,results,fields)=>{
                if(err){
                    return callback(err);
                }
                return callback(null,results[0]);
            });
    },
    createQuotes : (data,callback)=>{
        pool.query(
            'insert into quotes(user_id,quote_text,createdAt) values(?,?,?)',
        [data.user_id,
            data.quote_text,
            data.createdAt
    ],
    (err,results,fields)=>{
        if(err){
          return  callback(err);
        }
        return callback(null,results);
    }
    );
    },
};