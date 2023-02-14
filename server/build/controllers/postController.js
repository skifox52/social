var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import expressAsyncHandler from "express-async-handler";
import PostModel from "../Models/PostModel.js";
import UserModel from "../Models/UserModel.js";
//Get all posts
export const getPosts = expressAsyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allPosts = yield PostModel.find();
        res.status(200).json(allPosts);
    }
    catch (error) {
        res.status(400);
        throw new Error(error);
    }
}));
//Post a post
export const postPost = expressAsyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            res.status(400);
            throw new Error("Empty fields!");
        }
        const userId = req.user;
        yield PostModel.create({ title, content, author: userId });
        res.status(201).json("Post created successfully");
    }
    catch (error) {
        res.status(400);
        throw new Error(error);
    }
}));
//Get a post by [ID] of a certain user
export const findById = expressAsyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const posts = yield PostModel.find({ author: userId });
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(400);
        throw new Error(error);
    }
}));
//Delete a users Post
export const deleteUserPost = expressAsyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield PostModel.findByIdAndDelete(id);
        res.status(202).json(`Post ${id} deleted successfully!`);
    }
    catch (error) {
        res.status(400);
        throw new Error(error);
    }
}));
export const updatePost = expressAsyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content } = req.body;
        if (!title && !content) {
            res.status(200).json("Nothing has been changed!");
        }
        const { id } = req.params;
        const user = yield PostModel.findById(id);
        console.log(user);
        if (!user) {
            res.status(400).json("Post dosn't exist!");
        }
        yield PostModel.findByIdAndUpdate(id, req.body);
        res.status(200).json(`User ${id} has been updated successfully!`);
    }
    catch (error) {
        res.status(400);
        throw new Error(error);
    }
}));
//Get posts of friends
export const getPostsByFriends = expressAsyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const friends = yield UserModel.findById(req.user).select("friends");
        const friendsId = friends === null || friends === void 0 ? void 0 : friends.friends.map((fr) => fr.toString());
        const postsPromise = yield (friendsId === null || friendsId === void 0 ? void 0 : friendsId.map((id) => PostModel.find({ author: id })));
        const postArray = yield Promise.all(postsPromise);
        res.status(200).json(postArray);
    }
    catch (error) {
        res.status(400);
        throw new Error(error);
    }
}));
