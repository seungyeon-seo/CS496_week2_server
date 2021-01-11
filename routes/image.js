const multer = require("multer");
const path = require("path");
const StatusCode = require("../utils/statusCode");
const fs = require("fs");
const { User } = require("../models");

const form =
    "<!DOCTYPE HTML><html><body>" +
    "<form method='post' action='/upload' enctype='multipart/form-data'>" +
    "<input type='file' name='upload'/>" +
    "<input type='submit' /></form>" +
    "</body></html>";

module.exports = (app) => {
    fs.readdir("upload", (err) => {
        if (err) {
            console.error("upload 폴더가 없어 upload 폴더를 생성합니다");
            fs.mkdirSync("upload");
        }
    });

    // 이미지 데이터를 저장할 파일을 만듦
    const upload = multer({
        storage: multer.diskStorage({
            destination(req, file, cb) {
                cb(null, "upload/");
            },
            filename: (req, file, cb) => {
                const ext = path.extname(file.originalname);
                console.log("ext: " + ext)
                cb(
                    null,
                    path.basename(file.originalname, ext) +
                        new Date().valueOf() +
                        ext +
                        ".JPEG"
                );
            },
        }),
    });

    app.get("/", (req, res) => {
        res.writeHead(StatusCode.OK, { "Content-Type": "text/html" });
        res.end(form);
    });

    // 파일 업로드
    app.post("/upload/:userId", upload.single("upload"), (req, res) => {
        console.log(`파일: `, req.file);
        console.log(`UserId: ${req.params.userId}`)
        User.findOneAndUpdate(
            { id: req.params.userId },
            { profilePath: req.file.path }
        )
            .exec()
            .catch((reason) => {
                console.log(" 알 수 없는 에러 발생:  ", reason);
                return res.status(StatusCode.InternalServerError).send(reason);
            });

        res.json({url: `/upload/${req.file.filename}`})
    });

};
