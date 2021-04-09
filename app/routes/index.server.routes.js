// Load the 'index' controller
const index = require('../controllers/index.server.controller');
const {
    check,
    validationResult
} = require('express-validator');

// Define the routes module' method
module.exports = function (app) {

    app.get('/', function (req, res) {
        res.render('index', {
            info: "see the results in console window"
        })
    });

    app.get('/run', index.trainAndPredict);

    // validation
    app.post('/run', [
        check('learningRate').isFloat({
            gt: 0,
            lt: 1
        }).withMessage("*Learning rate must be between 0 to 1"),
        check('sepal_length').isFloat({
            gt: 0
        }).withMessage("*Sepal length must be more than 0"),
        check('sepal_width').isFloat({
            gt: 0
        }).withMessage("*Sepal width must be more than 0"),
        check('petal_length').isFloat({
            gt: 0
        }).withMessage("*Petal length must be more than 0"),
        check('petal_width').isFloat({
            gt: 0
        }).withMessage("*Petal width must be more than 0"),
    ], (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            req.session.form = req.body;
            console.log(errors);
            req.flash('error', errors.array());

            res.redirect('/');
        } else {
            index.trainAndPredict(req, res);
        }
    });
};
