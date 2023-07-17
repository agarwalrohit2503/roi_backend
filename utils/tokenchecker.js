const tableNames = require("../utils/table_name");
var jwt = require('jsonwebtoken');


async function authJWT  (req, res, next){

    try {
        var authorization = req.headers.authorization;
        token = authorization.split(' ')[1];
 
       if(token == null){
        res.status(404).send({message:"Token not found"})
    
    }else{
        const privatekey =  process.env.privateKey;
         jwt.verify(token,privatekey, async (err, decoded) => {
            if(err) {
                res.status(200).send({message:"invalid token"})
            }
                data = decoded;
                console.log(data);
               console.log(data.influencer_id);
                let Sqlquery = await tableNames.influencer_users.findOne({ where: { influencer_id: data.influencer_id,} });
                console.log(Sqlquery);
                 if(!Sqlquery)
                { res.status(403).send({message:"Influencer not found"})}
               
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.header("Access-Control-Allow-Methods", "PUT, GET,POST");
            next();  
        })
    //    let Sqlquery = await tableNames.gen_token.findOne({ where: { gen_token: token,} });
    //   console.log(Sqlquery);
    //    if(Sqlquery != null)
    //    {
    //     //       if(!token){
    //     //     res.status(404).send({message:"Token not found"})    
    //     // }else{
    //     //        token = token.split(' ')[1];  
    //     // const privatekey =  process.env.privateKey;
    //     // jwt.verify(token,privatekey, function(err, decoded){
    //     //     if(err)
    //     //     {
    //     //         res.status(200).send({message:"invalid token"})
    //     //     }else{
    //     //     }      
    //     //     res.header("Access-Control-Allow-Origin", "*");
    //     //     res.header("Access-Control-Allow-Headers", "X-Requested-With");
    //     //     res.header("Access-Control-Allow-Methods", "PUT, GET,POST");
    //     //     next();  
    //     // })
    //     // }
    //    }else{
    //        res.status(404).send({message:"invalid token"});
    //    }
    }
    } catch (error) {
        res.status(404).send({message:"Token has not been provided"});
    }

}
module.exports = {
    authJWT,
}