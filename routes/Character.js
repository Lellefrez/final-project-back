import express from "express";
const router = express.Router()
//rotta Get Characters (lettura tutti personaggi)
router.get('/', (req, res) => {
    res.send(`Richiesta Personaggi`)
});

//rotta Get Character/:id (Personaggio specifico)
router.get('/:id', (req, res) => {
    const { id } = (req.params);
    res.send(`Richiesta Personaggio ${id}`)
});
export default router;