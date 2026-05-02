const express = require("express");
const path = require("path");
const cors = require("cors");
const { default: mongoose } = require("mongoose");

const rootDir = require("./utils/pathUtil");
const { studentRouter } = require("./routes/studentRouter");
const { authRouter } = require("./routes/authRouter");
const { courseRouter } = require("./routes/courseRouter");
const { teacherRouter } = require("./routes/teacherRouter");
const { studentResultRouter } = require("./routes/studentResultRouter");

const DB_PATH = "mongodb+srv://root:RiTUR%40JKUM%40R1105@riturajkumardev.nxnptwm.mongodb.net/FutureFocusClasses?retryWrites=true&w=majority&appName=RiturajKumarDev";

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(rootDir, 'public')));
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.use("/api/student", authRouter);
app.use("/api/course", courseRouter);
app.use("/api/student", studentRouter);
app.use("/api/teacher", teacherRouter);
app.use("/api/result", studentResultRouter);


app.use((req, res) => {
    res.status(404).json({ "message": "Page not fount!!" });
    // send("<h1 style='text-align:center'>404 Error!!</h1><h2 style='color:red;text-align:center'>Page not found!!</h2>");
});

const PORT = 3000;
mongoose.connect(DB_PATH)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Running server on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log("Connection error : ", error);
    });
