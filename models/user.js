
const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    user: {
        type: String,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    }
});

UserSchema.methods.toJSON = function() {
    const { __v, _id, ...user } = this.toObject();
    user.uuid = _id;
    return user;
}

module.exports = model( 'User', UserSchema );