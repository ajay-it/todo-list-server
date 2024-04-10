import userModel from "../model/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getAllTodos } from "./todo-controller.js";
import Todo from '../model/Todo.js';

const SECRET_KEY = "TODOSAPI";

export const signup = async (req, res) => {

    const { username, email, password } = req.body;
    try {

        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await userModel.create({
            email: email,
            password: hashedPassword,
            username: username
        });

        const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY)
        res.status(200).json({ user: result, token: token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {

        const existingUser = await userModel.findOne({ email: email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);

        if (!matchPassword) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY)
        // res.status(200).json({ user: existingUser, token: token });

        const todos = await Todo.find({}).sort({ 'createdAt': -1 })
        return res.status(200).json(todos);

    } catch (error) {

    }

}
