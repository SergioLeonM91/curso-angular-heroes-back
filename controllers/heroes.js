const { response } = require('express');
const { isValidObjectId } = require("mongoose");
const { Heroe } = require('../models');

const listing = async(req, res) => {

    const filter = {};
    const [heroes] = await Promise.all([
        Heroe.find(filter)
    ]);

    res.json(heroes);
}

const add = async(req, res) => {

    const { hero } = req.body;
    const { superhero, ...body } = hero;

    const name = superhero.toUpperCase();
    const heroDB = await Heroe.findOne({superhero: name});

    if( heroDB ) {
        return res.status(400).json({
            msg: `The superhero ${heroDB.superhero} already exists on DB`
        })
    }

    const data = {
        superhero: name,
        ...body
    }

    const newHero = new Heroe(data);

    await newHero.save();

    res.status(201).json(newHero);
}

const edit = async(req, res) => {

    const { id } = req.params;
    const { hero } = req.body;
    const { superhero, ...body } = hero;

    const name = superhero.toUpperCase();

    const data = {
        superhero: name,
        ...body
    }

    const modifiedHero = await Heroe.findByIdAndUpdate( id, data, { new: false } );

    res.json(modifiedHero);
}


const search = async(req, res) => {
    const { term, limit } = req.body;
    const regex = new RegExp( term, 'i' );

    const [heroes] = await Promise.all([
        Heroe.find({
            $or: [{superhero: regex}, {alter_ego: regex}]
        })
        .limit(limit)
    ]);

    res.json(heroes);
}

const show = async(req, res) => {

    const { id } = req.params;
    const hero = await Heroe.findById(id);

    res.json(hero);
}

const deleteHero = async(req, res) => {
    const { id } = req.params;
console.log(id);
    // Delete with flag
    const hero = await Heroe.findByIdAndDelete( id );

    res.json(hero);
}

module.exports = {
    listing,
    add,
    edit,
    search,
    show,
    deleteHero
}