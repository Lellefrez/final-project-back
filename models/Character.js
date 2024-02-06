import mongoose from "mongoose"

const { Schema, SchemaType, model } = mongoose;

// Definizione Schema Personaggio
const characterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
    },
    universe: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minLength: 30
    },
    powerLevel: {
        type: Number,
        required: true
    },
    victories: {
        type: Number,
        default: 0
    },
    defeats: {
        type: Number,
        default: 0
    }
});


const Character = mongoose.model('Character', characterSchema);

export default Character;