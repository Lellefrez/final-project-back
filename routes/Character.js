import express from "express";
import Character from "../models/Character.js";

const router = express.Router()
//rotta Get Characters (lettura tutti personaggi)
router.get('/', async (req, res) => {
    try {
        const characters = await Character.find();
        res.send(characters)
    } catch (err) {
        res.status(500).send(err.message)
    }
});

//rotta Get Character/:id (Personaggio specifico)
router.get('/:id', (req, res) => {
    const { id } = (req.params);
    res.send(`Richiesta Personaggio ${id}`)
});
//rotta Post Character (Creazione Personaggio)
router.post('/', (req, res) => {
    const characterToCreate = req.body;
    console.log('characterToCreate', characterToCreate);
    res.status(201).send(characterToCreate)
})
//rotta Put Character (Modifica Personaggio)
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const characterToUpdate = req.body;
    res.status(200).send(characterToUpdate)

})
//rotta Delete Character/:id ( Eliminazione Personaggio specifico)
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.status(204).send()
})
export default router;