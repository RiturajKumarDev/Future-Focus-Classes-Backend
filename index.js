const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const { default: mongoose } = require("mongoose");

const rootDir = require("./utils/pathUtil");
const { authRouter } = require("./routes/authRouter");
const { courseRouter } = require("./routes/courseRouter");
const { teacherRouter } = require("./routes/teacherRouter");
const { topResultRouter } = require("./routes/topResultRouter");
const jwtController = require("./controllers/jwtController");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(rootDir, 'public')));
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.use("/api", authRouter);
app.use("/api/course", jwtController.jwt, courseRouter);
app.use("/api/teachers", teacherRouter);
app.use("/api/toppers", topResultRouter);


app.use((req, res) => {
    res.status(404).json({ "message": "Page not fount!!" });
    // send("<h1 style='text-align:center'>404 Error!!</h1><h2 style='color:red;text-align:center'>Page not found!!</h2>");
});

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Running server on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log("Connection error : ", error);
    });
