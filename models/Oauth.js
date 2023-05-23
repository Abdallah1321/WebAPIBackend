import mongoose from "mongoose";

//create oauth schema
const oauthSchema = new mongoose.Schema({
    clientId: {
        type: String,
        required: true,
    },
    secret: {
        type: String,
        required: true
    },
    //key is not required because it is generated after getting the clientid and secret
    key: {
        type: String
    }
})

export default mongoose.model("Oauth", oauthSchema);
