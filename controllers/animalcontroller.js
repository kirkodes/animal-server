// const express = require("express");
// const router = express.Router();
// const { Animal } = require("../models");
// let validateSession = require("../middleware/validate-session");


// router.post("/create", /*validateSession,*/ async (req, res) => {
//     let { name, legNumber, predator } = req.body;

//     try {
//         const newAnimal = await Animal.create({
//             name,
//             legNumber,
//             predator,
//             // user_id: req.user.id // this comes from validate-session
//         });

//         res.status(201).json({
//             message: "Animal has been successfully created.",
//             animal: newAnimal,
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: `There was an error, ${error}; the animal was not saved.`
//         });
//     }
// });

// router.get("/", validateSession, async (req, res) => {
//     try {
//         const allAnimals = await Animal.findAll({
//             where: { user_id: req.user.id },
//         }); // findAll() is a sequelize method to find all of the items. this method returns a promise which we await the response of
//         res.status(200).json({
//             message: "Here are all the animals in our database:",
//             allAnimals
//         });
//     } catch (err) {
//         res.status(500).json({
//             message: `There was an error retrieving the animals ${err}`
//         });
//     }
// });

// // this was my code, it works! but it doesn't take into account if someone enters an animal that doesn't exist. So at this point with this code, you could put any animal/thing after the / in the endpoint and youll receive a "success" message
// // router.delete("/delete/:name", async (req, res) => {
// //     const animalToDelete = req.params.name;

// //     try {
// //         const query = {
// //             where: {
// //                 name: animalToDelete,
// //             }
// //         };
// //         await Animal.destroy(query);
// //         res.status(200).json({
// //             message: `This animal, ${animalToDelete}, has been deleted`
// //         });
// //     } catch (err) {
// //         res.status(500).json({
// //             message: `There was an issue deleting this animal: ${error}`,
// //             error: err
// //         });
// //     }
// // });

// router.delete("/delete/:name", validateSession, async (req, res) => {
//     // router.delete("/delete/:id", async (req, res) => {
//     // const animalId = req.params.id;
//     // await Animal.destroy({where: {id: animalId}})
//     const animalToDelete = req.params.name;
//     try {

//         let animal = await Animal.findOne({
//             where: {
//                 name: animalToDelete,
//                 user_id: req.user.id
//             }
//         });

//         if (animal) {
//             const query = {
//                 where: {
//                     id: animal.id,
//                     user_id: req.user.id
//                 },
//             };

//             await Animal.destroy(query);

//             res.status(200).json({
//                 message: `This animal ${animalToDelete} has been deleted`,
//             });
//         } else {
//             res.status(200).json({ // request was received, it just couldn't find what the request was looking for
//                 message: "Animal not found"
//             })
//         }

//     } catch (error) {
//         res.status(500).json({
//             message: `There was an issue deleting this animal: ${error}`,
//             error,
//         });
//     }
// });

// router.put("/update/:id", validateSession, async (req, res) => { // PUT replaces whatever is there with what we give it; put means to update
//     const {
//         name,
//         legNumber,
//         predator
//     } = req.body.animal;

//     const query = {
//         where: {
//             id: req.params.id,
//             user_id: req.user.id,
//         }
//     };
//     const updatedAnimal = {
//         name: name,
//         legNumber: legNumber,
//         predator: predator
//     };
//     try {
//         const update = await Animal.update(updatedAnimal, query);
//         res.status(200).json({
//             message: "You have updated an animal in our database!",
//             update
//         });
//     } catch (err) {
//         res.status(500).json({
//             message: `There was an error updating the animal: ${error}`
//         });
//     }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const {
    Animal
} = require("../models");
// const animalModel = require("../models/animal");
const validateSession = require("../middleware/validate-session");

router.post("/create", validateSession, async (req, res) => {
    let {
        name,
        legNumber,
        predator
    } = req.body;
    // const {id} = req.user;

    try {
        const newAnimal = await Animal.create({
            name,
            legNumber: legNumber,
            predator,
            user_id: req.user.id,
            // user_id: id
        });
        res.status(201).json({
            anyWordIWantItToBe: newAnimal,
            message: "Animal has been created!",
        });
    } catch (error) {
        res.status(500).json({
            message: `Failed to create animal: ${error}`,
        });
    }
});

router.get("/", validateSession, async (request, response) => {
    try {
        const allAnimals = await Animal.findAll({
            where: {
                user_id: request.user.id
            },
        });
        response.status(200).json({
            allAnimals
        });
    } catch (error) {
        response.status(500).json({
            error: `You have an error: ${error}`,
        });
    }
});

router.delete("/delete/:name", validateSession, async (req, res) => {
    // router.delete("/delete/:id", async (req, res) => {
    // const animalId = req.params.id;
    // await Animal.destroy({where: {id: animalId}})
    const animalToDelete = req.params.name;
    try {
        let animal = await Animal.findOne({
            where: {
                name: animalToDelete,
                user_id: req.user.id,
            },
        });

        if (animal) {
            const query = {
                where: {
                    id: animal.id,
                    user_id: req.user.id,
                },
            };

            await Animal.destroy(query);

            res.status(200).json({
                message: `This animal ${animalToDelete} has been deleted`,
            });
        } else {
            res.status(200).json({
                message: "Animal not found",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `There was an issue deleting this animal: ${error}`,
            error,
        });
    }
});

router.put("/update/:id", validateSession, async (req, res) => {
    const {
        name,
        legNumber,
        predator
    } = req.body.animal;

    const query = {
        where: {
            id: req.params.id,
            user_id: req.user.id,
        },
    };

    const updatedAnimal = {
        name: name,
        legNumber: legNumber,
        predator: predator,
    };

    try {
        const update = await Animal.update(updatedAnimal, query);
        res.status(200).json({
            message: "Animal mutated!",
            update,
        });
    } catch (error) {
        res.status(500).json({
            message: `SomEThInG wEnt WroNg!`,
        });
    }
});

module.exports = router;