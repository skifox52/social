import { Schema, model } from "mongoose";
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    mail: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
});
const UserModel = model("User", UserSchema);
export default UserModel;
