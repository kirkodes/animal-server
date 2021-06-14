const express = require("express");
const router = express.Router();
const { Animal } = require("../models");

router.post("/create", async (req, res) => {
    let { name, legNumber, predator } = req.body.animal;

    try {
        const newAnimal = await Animal.create({
            name,
            legNumber,
            predator
        });

        res.status(200).json({
            message: "Animal has been successfully created.",
            animal: newAnimal,
        });
    } catch (error) {
        res.status(500).json({ 
            message: `There was an error, ${error}; the animal was not saved.`
        });
    }
});

router.get("/", async (req, res) => {
    try {
        const allAnimals = await Animal.findAll(); // findAll() is a sequelize method to find all of the items. this method returns a promise which we await the response of
        res.status(200).json({
            message: "Here are all the animals in our database:",
            allAnimals
        });
    } catch (err) {
        res.status(500).json({
            message: `There was an error retrieving the animals ${err}`
        });
    }
});

router.delete("/delete/:name", async (req, res) => {
    const animalToDelete = req.params.name;

    try {
        const query = {
            where: {
                name: animalToDelete,
            }
        };
        await Animal.destroy(query);
        res.status(200).json({
            message: `This animal, ${animalToDelete}, has been deleted`
        });
    } catch (err) {
        res.status(500).json({
            message: `There was an issue deleting this animal: ${error}`,
            error: err
        });
    }
});

router.put("/update/:id", async (req, res) => { // PUT replaces whatever is there with what we give it; put means to update
    const { name, legNumber, predator } = req.body.animal;
    const animalId = req.params.id;

    const query = {
        where: {
            id: animalId
        }
    };
    const updatedAnimal = {
        name: name,
        legNumber: legNumber,
        predator: predator
    };
    try {
        const update = await Animal.update(updatedAnimal, query);
        res.status(200).json({
            message: "You have updated an animal in our database!",
            update
        });
    } catch (err) {
        res.status(500).json({
            message: `There was an error updating the animal: ${error}`
        });
    }
});

module.exports = router;