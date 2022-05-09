"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
const User_1 = require("./model/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.listen(config_1.default.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Running on port 5000...");
    yield mongoose_1.default.connect(config_1.default.MONGO_URI);
    console.log("Mongoose connected");
}));
app.get("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    console.log(req.body);
    if (!username || !password) {
        return res.status(400).send("Your input is invalid");
    }
    else if (username.trim().length > 6 && password.trim().length > 6) {
        return res.status(400).send("Your input is invalid");
    }
    try {
        const existedUser = yield User_1.User.findOne({ username });
        if (existedUser)
            return res.status(402).send("Username already existed");
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hashedPassword = yield bcryptjs_1.default.hash(req.body.password, salt);
        const newUser = yield User_1.User.create({
            username,
            password: hashedPassword,
            authType: "local",
        });
        res.status(201).send(newUser);
    }
    catch (error) {
        console.log(error);
        res.send(error);
    }
}));
