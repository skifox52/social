var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import UserModel from "../Models/UserModel.js";
import expressAsyncHandler from "express-async-handler";
import { hash, compare } from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";
const genToken = (id) => {
    return jwt.sign(id, process.env.JWT_KEY);
};
//POST a user
export const postUser = expressAsyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, password, mail, age } = req.body;
        if (!name || !password || !mail || !age) {
            res.status(400);
            throw new Error("Empty fields!");
        }
        const user = yield UserModel.find({ mail });
        if (user.length > 0) {
            res.status(400);
            throw new Error("User already exist");
        }
        const hashedPassword = yield hash(password, 10);
        const createdUser = yield UserModel.create({
            name,
            password: hashedPassword,
            mail,
            age,
        });
        res.status(201).json({
            _id: createdUser._id,
            name: createdUser.name,
            mail: createdUser.mail,
            age: createdUser.age,
            friends: createdUser.friends,
            token: genToken(createdUser._id.toString()),
        });
    }
    catch (err) {
        res.status(400);
        throw new Error(err);
    }
}));
//Login a user
export const loginUser = expressAsyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { mail, password } = req.body;
        if (!mail || !password) {
            res.status(400);
            throw new Error("Empty fields");
        }
        const user = yield UserModel.find({ mail });
        if (user.length == 0) {
            res.status(400);
            throw new Error("User doesn't exist!");
        }
        const comparedPassword = yield compare(password, user[0].password);
        if (!comparedPassword) {
            res.status(400);
            throw new Error("Wrong password!");
        }
        res.status(200).json({
            _id: user[0]._id,
            name: user[0].name,
            mail: user[0].mail,
            age: user[0].age,
            fiends: user[0].friends,
            token: genToken(user[0]._id.toString()),
        });
    }
    catch (error) {
        res.status(400);
        throw new Error(error);
    }
}));
//Find user by Id
export const findUserById = expressAsyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield UserModel.findById(userId).select("-password");
        if (!user) {
            res.status(400);
            throw new Error("User not found!");
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400);
        throw new Error(error);
    }
}));
//Find all users
export const findAllUsers = expressAsyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield UserModel.find().select("-password");
        console.log(req.user);
        res.status(200).json(users);
    }
    catch (error) {
        res.status(400);
        throw new Error(error);
    }
}));
//Put a user
export const putUser = expressAsyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const { password } = req.body;
        if (password) {
            req.body["password"] = yield hash(password, 10);
        }
        const newUser = yield UserModel.findByIdAndUpdate(userId, req.body).select("-password");
        res.status(200).json(newUser);
    }
    catch (error) {
        res.status(400);
        throw new Error(error);
    }
}));
//Delete a user
export const deleteUser = expressAsyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.Id;
        yield UserModel.findByIdAndDelete(userId);
        res.status(202).json("User deleted Successfully");
    }
    catch (error) {
        res.status(400);
        throw new Error(error);
    }
}));
//Add a friend
export const addFriend = expressAsyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { friendId } = req.body;
        const updatedUser = yield UserModel.updateOne({ _id: req.user }, { $push: { friends: friendId } });
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(400);
        throw new Error(error);
    }
}));
