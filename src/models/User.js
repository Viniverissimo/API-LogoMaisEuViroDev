const mongoose = require('./database');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true,
    },
    password: {
        type: String,
        require: true,
        select: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    triggeredBy: {
        type: String,
        default: ('Vinicius Verissimo')
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;