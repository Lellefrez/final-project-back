import mongoose from "mongoose"

// Schema, model
const { Schema, SchemaType, model } = mongoose;

// Definizione Schema Personaggio
const characterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
    Universe: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
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

// Crea un modello usando lo schema
const Character = mongoose.model('Character', characterSchema);

export default Character;