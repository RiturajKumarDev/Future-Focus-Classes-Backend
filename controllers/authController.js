const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const Users = require("../modules/Users");

exports.register = [
    check('fullName')
        .notEmpty()
        .withMessage('Name is required')
        .trim()
        .isLength({ min: 2 })
        .withMessage("Name must be at least 2 characters long"),
    check("email")
        .isEmail()
        .withMessage("Please enter a valid email")
        .normalizeEmail(),
    check("password")
        .isLength({ min: 8 })
        .withMessage("Password should be atleast 8 characters long")
        .matches(/[A-Z]/)
        .withMessage("Password should contain atleast one uppercase letter")
        .matches(/[a-z]/)
        .withMessage("Password should contain atleast one lowercase letter")
        .matches(/[0-9]/)
        .withMessage("Password should contain atleast one number")
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage("Password should contain atleast one special character")
        .trim(),
    check('phone')
        .notEmpty()
        .withMessage('mobile is required')
        .trim()
        .isLength({ min: 10 })
        .withMessage("mobile must be at 10 digits")
        .matches(/[0-9]/)
        .withMessage('Mobile can only contain digits'),
    (req, res, next) => {
        const {
            fullName, role, batch, email, password,
            phone, subject, experience, quals, bio,
        } = req.body;
        const avatarArr = String(fullName).toUpperCase().split(" ");
        const avatar = (avatarArr[0][0] + (avatarArr[1][0] ? avatarArr[1][0] : ""));
        const qualifications = String(quals).toUpperCase().split(",");
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(422).json({
                "errors": errors.array().map(error => error.msg),
            });
        }

        bcrypt.hash(password, 12)
            .then(hashPassword => {
                const user = new Users({ ...req.body, avatar, quals: qualifications, password: hashPassword });
                user.save()
                    .then((result) => {
                        return res.status(201).json(result);
                    }).catch((error) => {
                        return res.status(422).json({ "errors": error.errmsg });
                    });
            })
            .catch(error => {
                return res.status(422).json({ "errors": error });
            });
    }
];

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) return res.status(422).json({ "errors": ['Invalid emial or password!!!'] });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(422).json({ "errors": ['Invalid emial or password!!!'] });
    const userData = user.toObject();
    delete userData.password;
    // Generate JWT
    const token = jwt.sign(userData,
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "7d"
        }
    );
    return res.status(200).json({
        token,
        user: userData
    });
};

exports.profile = async (req, res, next) => {
    res.json(req.user);
}
