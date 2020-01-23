const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema ({
    login: String, 
    password: String,
    token: String,
    profile: {role: String, name: String, age: Number}
});

const User = mongoose.model('User', UserSchema);

module.exports = User;