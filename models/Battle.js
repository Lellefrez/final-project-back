
import mongoose from "mongoose";

const { Schema, SchemaTypes, model } = mongoose;

const battleSchema = new mongoose.Schema({
    characters: [
        {
            type: SchemaTypes.ObjectId,
            ref: 'Character',
            required: true,
        },
    ],
    background: {
        type: String,
    },
    winner: {
        type: SchemaTypes.ObjectId,
        ref: 'Character',
    },
});

const Battle = mongoose.model('Battle', battleSchema);

export default Battle;
