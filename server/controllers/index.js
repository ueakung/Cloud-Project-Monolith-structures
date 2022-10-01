const AppError = require("../utils/appError");
const conn = require("../services/db");
const multer = require('multer')

//image upload is too hard (seek help!) (͡° ͜ʖ ͡°)
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const upload = multer({storage: storage})

exports.getAllUser = (req, res, next) => {
    conn.query("SELECT * FROM user", function (err, data, fields) {
        if(err) return next(new AppError(err))
        res.status(200).json({
            status: "success",
            length: data.length,
            data: data,
        });
    });
};

exports.createUser = (req, res, next) => {
    if (!req.body) return next(new AppError("No form data found", 404));
    const username = req.body.username;
    const password = req.body.password;
    conn.query(
        "INSERT INTO user (username, password) VALUES(?,?)",
        [username,password],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
            status: "success",
            message: "user created!",
            });
        }
    );
};

exports.checkLogin = (req, res, next) => {
    console.log("someone trying to check users");
    if (!req.body) return next(new AppError("No form data found", 404));
    const username = req.body.username;
    const password = req.body.password;
    console.log(`${username}, ${password}`)
    conn.query(
        "SELECT * FROM user WHERE username = ? AND password = ?",
        [username, password],
        function(err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                founduser: data.length
            });
        }
    );
};

exports.upload = (upload.single('image')), (req, res, next) => {
    next();
}

exports.addImage = (req, res, next) => {
    console.log(req.file);
    var date = new Date();
    var path = req.file.path;
    conn.query(
        "INSERT INTO answersheet (submitdate, path) VALUES(?,?)",
        [date, path],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
            status: "success",
            message: "image uploaded",
            });
        }
    );
};