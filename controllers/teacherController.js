const Users = require("../modules/Users");

exports.getTeachers = async (req, res, next) => {
    try {
        const users = await Users.find({ userType: 'teacher' });
        res.status(201).json(users);
    } catch (err) {
        res.status(500).json({ "errors": err.errmsg });
    }
}
