const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        // sno: {
        //     type: Number,
        //     required: true
        // },
        name: {
            type: String,
            required: true
        },
        username: {
            type:String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    }
)

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;