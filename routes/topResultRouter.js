const express = require("express");
const topResultRouter = express.Router();
const { addTopper, getResults } = require("../controllers/topResultController");

topResultRouter.post("/save", addTopper);
topResultRouter.get("/all", getResults);

exports.topResultRouter = topResultRouter;
