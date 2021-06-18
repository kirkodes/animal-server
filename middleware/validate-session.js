// const jwt = require("jsonwebtoken"); // we're interacting with the user's session token for authentication, so we need to import the JWT package here
// const { User } = require("../models"); // we want to find info about a specific use so we will need to communicate with our user model in our database

// const validateSession = async (req, res, next) => { 
//     if (req.method == "OPTIONS") { // checking if methods are listed in the request.. pre-flight request, checks to see if we're allowed to hit the end point;
//         next(); 
//     } else if ( // headers has to have authorization and the authorization HAS to include "Bearer"
//         req.headers.authorization &&
//         req.headers.authorization.includes("Bearer")
//     ) {
//         const { authorization } = req.headers; 
//         const payload = authorization // payload represents the token
//         ? jwt.verify(
//             authorization.includes("Bearer") // then we use .split(" ") which splits the string at the space in "Bearer token"
//             ? authorization.split(" ")[1] // breaks up the long string and just gets the token
//             : authorization, // if I don't have the word Bearer, I just want it to give me the token
//             // process.env.JWT_SECRET
//             "Hello I am a secret"
//         ) 
//         : undefined;

//         if (payload) {
//             let foundUser = await User.findOne({
//                 where: {
//                     id: payload.id // id in jwt jwt.sign() 1st param is an object (look at usercontroller) id value is going to be the id of the new user that was created. 
//                 }
//             }); 
//             if (foundUser) { // conditional, if foundUser comes back as true (you have a value for foundUser)
//                 req.user = foundUser; // ONE OF THE MOST IMPORTANT LINES OF THE FILE; value for the property .user is now foundUser... we made a property called user in the request and set it equal to the value of foundUser
//                 next();
//             } else {
//                 res.status(400).send({ message: "Not Authorized" });
//             }
//         } else {
//             res.status(401).send({ message: "Invalid token" });
//         }
//     } else {
//         res.status(403).send({ message: "Forbidden" }); // 
//     }
// };

// module.exports = validateSession;

const jwt = require("jsonwebtoken");
const {
    User
} = require("../models");

const validateSession = async (req, res, next) => {
    if (req.method == "OPTIONS") {
        next();
    } else if (
        req.headers.authorization &&
        req.headers.authorization.includes("Bearer")
    ) {
        const {
            authorization
        } = req.headers;

        const payload = authorization ?
            jwt.verify(
                authorization.includes("Bearer") ?
                authorization.split(" ")[1] :
                authorization,
                process.env.JWT_SECRET
            ) :
            undefined;

        console.log("PAYLOAD ===> ", payload);

        if (payload) {
            let foundUser = await User.findOne({
                where: {
                    id: payload.id,
                },
            });

            if (foundUser) {
                req.user = foundUser;

                next();
            } else {
                res.status(400).send({
                    message: "Not authorized"
                });
            }
        } else {
            res.status(401).send({
                message: "Invalid token"
            });
        }
    } else {
        res.status(403).send({
            message: "Forbidden"
        });
    }
};

module.exports = validateSession;