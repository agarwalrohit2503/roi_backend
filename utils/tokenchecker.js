const tableNames = require("../utils/table_name");
var jwt = require('jsonwebtoken');


async function authJWT  (req, res, next){

    try {
        console.log("token");
   
        var token = req.headers.authorization;
    
       var SecretKey = req.headers.secret_key;
       console.log(SecretKey);
    
    
       let Sqlquery = await tableNames.influencer_users.findOne({ where: { secret_key: SecretKey,} });
      console.log(Sqlquery);
       if(Sqlquery != null)
       {
              if(!token){
            res.status(404).send({message:"Token not found"})
        }else{
               token = token.split(' ')[1];
               
        
        const privatekey =  process.env.privateKey;
        jwt.verify(token,privatekey, function(err, decoded){
            if(err)
            {
                res.status(200).send({message:"invalid token"})
            }else{
    
            }      
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.header("Access-Control-Allow-Methods", "PUT, GET,POST");
            next();  
        })
        }
       }else{
           res.status(404).send({message:"invalid Secret Key"});
       }
    } catch (error) {
        res.status(404).send({message:"Enter Token & Secret Key"});
    }
   
 
}
module.exports = {
    authJWT,
}