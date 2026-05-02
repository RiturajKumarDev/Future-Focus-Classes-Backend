const express = require("express");
const authRouter = express.Router();
const { register, login, saveResult } = require("../controllers/authController");

authRouter.post("/register", register);
authRouter.post("/login", login);

exports.authRouter = authRouter;
