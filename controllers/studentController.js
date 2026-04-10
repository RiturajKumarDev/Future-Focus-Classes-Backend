const Students = require("../modules/Users");

exports.getStudent = async (req, res, next) => {
    const { id } = req.params;
    try {
        const student = await Students.findById(id);
        res.status(204).json(student);
    } catch (err) {
        res.status(500).json({ message: "Server Error" + err });
    }
}
