import mongoose from "mongoose";


const UserSchema = mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}, { timestamps: true });

const user = mongoose.model('user', UserSchema);

export default user;