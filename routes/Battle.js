// routes/battle.js
import express from "express";
import Battle from "../models/Battle.js";
import Character from "../models/Character.js";

const router = express.Router();

// Rotta Post Battle (Creazione Battaglia)
router.post('/', async (req, res) => {
    const { characters, background } = req.body;
    try {
        const randomWinner = Math.floor(Math.random() * 2);
        const winner = characters[randomWinner];
        const loser = characters.filter((item) => item !== winner)[0]
        const battle = await Battle.create({ characters, background, winner });

        // Aggiorna i personaggi con l'ID della nuova battaglia
        await Character.updateMany(
            { _id: { $in: characters } },
            { $push: { battles: battle._id } }
        );

        //   Aggiorna n vittorie / sconfitte
        await Character.findByIdAndUpdate(winner, { $inc: { victories: 1 } });
        await Character.findByIdAndUpdate(loser, { $inc: { defeats: 1 } });


        res.status(201).send(battle);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Rotta GET Battles (Lettura tutte Battaglie)
router.get('/', async (req, res) => {
    try {
        const battles = await Battle.find().select('-__v').populate("characters winner", "name surname image");
        res.send(battles);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
// Rotta Get Battle/:id (Battaglia Personaggio specifico)
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const battles = await Battle.find({ characters: id }).select('-__v');
        if (!battles) {
            res.status(404).send('Battaglia non trovata');
        } else {
            res.send(battles);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});



export default router;
