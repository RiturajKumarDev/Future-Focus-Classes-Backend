const Results = require("../modules/Results");


exports.saveResult = async (req, res, next) => {
    const { name, achievement, course, before, after, testimonial, year } = req.body;
    const studentResult = new Results({ name, achievement, course, before, after, testimonial, year, image: "👨‍🎓" });
    studentResult.save()
        .then(result => {
            return res.status(201).json(studentResult);
        }).catch(error => {
            return res.status(422).json({ "errors": error.errmsg });
        });
}

exports.getResults = async (req, res, next) => {
    Results.find()
        .then((studentResults) => {
            return res.status(201).json(studentResults);
        })
        .catch(error => {
            return res.status(422).json({ "errors": error.errmsg });
        })
}
