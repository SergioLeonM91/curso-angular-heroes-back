const { response } = require('express');
const { User } = require('../models');

const login = async(req, res) => {

    const { id } = req.params;

    const user = await User.findById( id );

    res.json(user);
}

const register = (req, res) => {

    res.json({
        msg: 'register API controller'
    });
}

module.exports = {
    login,
    register
}