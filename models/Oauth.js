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

export default mongoose.model("Oauth", oauthSchema);
