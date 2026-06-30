const TopResults = require("../modules/TopResults");

exports.addTopper = async (req, res, next) => {
    const { rank, studentName, rollNumber, batch, schoolName, score, icon } = req.body;
    const topResult = new TopResults({ rank, studentName, rollNumber, batch, schoolName, score, icon });
    topResult.save()
        .then(result => {
            return res.status(201).json(topResult);
        }).catch(error => {
            return res.status(422).json({ "errors": error.errmsg });
        });
}

exports.getResults = async (req, res, next) => {
    TopResults.find()
        .then((studentResults) => {
            return res.status(201).json(studentResults);
        })
        .catch(error => {
            return res.status(422).json({ "errors": error.errmsg });
        })
}
