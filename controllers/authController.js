const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const Users = require("../modules/Users");

exports.register = [
    check('fullName')
        .notEmpty()
        .withMessage('Name is required')
        .trim()
        .isLength({ min: 2 })
        .withMessage("Name must be at least 2 characters long")
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Name can only contain letters'),
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
    check("confirmPassword")
        .custom((value, { req }) => {
            if (value != req.body.password)
                throw new Error("Passwords do not match");
            return true;
        }),
    check('mobile')
        .notEmpty()
        .withMessage('mobile is required')
        .trim()
        .isLength({ min: 10 })
        .withMessage("mobile must be at 10 digits")
        .matches(/[0-9]/)
        .withMessage('Mobile can only contain digits'),
    check("gender")
        .notEmpty()
        .withMessage("Please select a user type")
        .isIn(["male", "female", "other"])
        .withMessage("Invalud gender type"),
    check('city')
        .notEmpty()
        .withMessage('city is required')
        .trim()
        .isLength({ min: 2 })
        .withMessage("city must be at least 2 characters long"),
    check('pincode')
        .notEmpty()
        .withMessage('pincode is required')
        .trim()
        .isLength({ min: 6 })
        .withMessage("Parent must be at 6 digits")
        .matches(/[0-9]/)
        .withMessage('pincode can only contain digits'),
    check('address')
        .notEmpty()
        .withMessage('address is required')
        .trim()
        .isLength({ min: 10 })
        .withMessage("address must be at least 10 characters long"),
    (req, res, next) => {
        const user = {
            userType, fullName, email, mobile, dob, gender, password,
            // For student
            classTh, parentName, parentMobile,
            // For Teacher
            qualification, specialization, experience, teachingSubjects, resume,
            // Address
            city, pincode, address,
        } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(422).json({
                "errors": errors.array().map(error => error.msg),
            });
        }

        bcrypt.hash(password, 12)
            .then(hashPassword => {
                const user = new Users({ ...req.body, password: hashPassword });
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
    res.status(201).json(user);
};
