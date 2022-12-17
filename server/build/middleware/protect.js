var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
import "dotenv/config";
import expressAsyncHandler from "express-async-handler";
import UserModel from "../Models/UserModel.js";
const protect = expressAsyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const userToken = jwt.verify(token, process.env.JWT_KEY);
            const userById = yield UserModel.findById(userToken);
            req.user = userById === null || userById === void 0 ? void 0 : userById._id.toString();
            next();
        }
        catch (error) {
            res.status(401);
            throw new Error("Not authorized, no token");
        }
    }
    if (!token) {
        res.status(401);
        throw new Error("Unauthorized, No token");
    }
}));
export default protect;
