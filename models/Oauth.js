import mongoose from "mongoose";

const oauthSchema = new mongoose.Schema({
    clientId: {
        type: String,
        required: true,
    },
    secret: {
        type: String,
        required: true
    },
    key: {
        type: String
    }
})

model.exports = mongoose.model('Oauth', oauthSchema)