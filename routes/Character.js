import express from "express";
import Character from "../models/Character.js";

const router = express.Router();

// Rotta Get Characters (lettura tutti i personaggi)
router.get('/', async (req, res) => {
    try {
        const characters = await Character.find().select('-__v');
        res.send(characters);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Rotta Get Character/:id (Personaggio specifico)
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const character = await Character.findById(id);
        if (!character) {
            res.status(404).send('Personaggio non trovato');
        } else {
            res.send(character);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Rotta Post Character (Creazione Personaggio)
router.post('/', async (req, res) => {
    const characterToCreate = req.body;
    try {
        // Controllo se il nome del personaggio è già presente
        const existingCharacter = await Character.findOne({ name: characterToCreate.name });
        if (existingCharacter) {
            return res.status(400).send('Il personaggio con questo nome esiste già.');
        }
        const character = await Character.create(characterToCreate);
        res.status(201).send(character);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


// Rotta Put Character (Modifica Personaggio)
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const characterToUpdate = req.body;
    try {
        const updatedCharacter = await Character.findByIdAndUpdate(id, characterToUpdate, { new: true });
        if (!updatedCharacter) {
            res.status(404).send('Personaggio non trovato');
        } else {
            res.send(updatedCharacter);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Rotta Delete Character/:id (Eliminazione Personaggio specifico)
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Character.findByIdAndDelete(id);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err.message);
    }
});

export default router;
