// routes/battle.js
import express from "express";
import Battle from "../models/Battle.js";
import Character from "../models/Character.js";

const router = express.Router();

// Rotta Post Battle (Creazione Battaglia)
router.post('/', async (req, res) => {
    const { characters, background } = req.body;
    try {
        const battle = await Battle.create({ characters, background });

        // Aggiorna i personaggi con l'ID della nuova battaglia
        await Character.updateMany(
            { _id: { $in: characters } },
            { $push: { battles: battle._id } }
        );

        res.status(201).send(battle);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Rotta Put Battle Result (Aggiorna risultato Battaglia)
/*
router.put('/:battleId/result', async (req, res) => {
    const { battleId } = req.params;
    const { winner } = req.body;
    try {
        const battle = await Battle.findByIdAndUpdate(battleId, { winner }, { new: true });

        // Aggiorna le statistiche dei personaggi vincitore e perdente
        const { characters } = battle;
        const loserId = characters.find(charId => charId.toString() !== winner.toString());

        await Character.findByIdAndUpdate(winner, { $inc: { victories: 1 } });
        await Character.findByIdAndUpdate(loserId, { $inc: { defeats: 1 } });

        res.send(battle);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
*/
export default router;
