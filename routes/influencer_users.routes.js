const {
   
    createInfluencer
} = require('../controllers/influencer_users.controller');

// const {authJWT} = require("../utils/tokenchecker");

function influencerRoutes(app) {

    app.get("/test",(req,res)=> {
        console.log("okk");
    })

    app.post("/create-influencer", (req, res)=> {
        createInfluencer(req, res)
    })
//     app.get("/get-user-profile/:id", authJWT,(req, res) => {
//      getUserProfile(req, res);
//     //    res.status(202).send({ 
//     //     "status":202, 
//     //     "message":"User Profile Not Found",
//     //   });
//     });


//     app.post("/update-user-profile/:id", authJWT,(req, res) => {
//         updateUserProfile(req, res);
//     });

//     app.post("/kyc-user-profile/:id", authJWT,(req, res) => {
//        kycupdateUserProfile(req, res);
// //       res.status(404).send({
// //         "status": 404,
// //         "message": "No product found",
// // });
//     });

}



module.exports = {
    influencerRoutes,
};