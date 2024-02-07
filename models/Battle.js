
import mongoose from "mongoose";

const { Schema, SchemaType, model } = mongoose;

const battleSchema = new mongoose.Schema({
    characters: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Character',
            required: true,
        },
    ],
    background: {
        type: String,
    },
    winner: {
        type: Schema.Types.ObjectId,
        ref: 'Character',
    },
});

const Battle = mongoose.model('Battle', battleSchema);

export default Battle;
