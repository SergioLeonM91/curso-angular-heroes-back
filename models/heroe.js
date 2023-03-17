
const { Schema, model } = require('mongoose');

const HeroeSchema = Schema({
    superhero: {
        type: String,
        required: [true, 'Superhero is required']
    },
    publisher: {
        type: String,
        required: [true, 'Publisher is required']
    },
    alter_ego: {
        type: String,
        required: [true, 'Alter Ego is required']
    },
    first_appearance: {
        type: String,
        required: [true, 'First Appearance is required']
    },
    characters: {
        type: String,
        required: [true, 'Characters is required']
    },
    alt_img: {
        type: String
    }
});

HeroeSchema.methods.toJSON = function() {
    const { __v, _id, ...hero } = this.toObject();
    hero.uuid = _id;
    return hero;
}

module.exports = model( 'Heroe', HeroeSchema );