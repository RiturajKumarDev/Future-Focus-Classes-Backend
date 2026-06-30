const express = require("express");
const authRouter = express.Router();
const { register, login, saveResult, profile } = require("../controllers/authController");
const jwtController = require("../controllers/jwtController");

authRouter.post("/users/register", register);
authRouter.post("/auth/login", login);
authRouter.get("/auth/me", jwtController.jwt, profile);

exports.authRouter = authRouter;
