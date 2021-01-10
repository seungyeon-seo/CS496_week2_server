const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const StatusCode = require("../utils/statusCode");
const fs = require("fs");
const { dirname } = require("path");

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
    app.post("/upload", upload.single("upload"), (req, res) => {
        console.log(`파일: `, req.file);
        res.json({url: `/upload/${req.file.filename}`})
        // return res.redirect("/upload/" + req.file.filename);
        // return res.status(StatusCode.OK).send("파일 업로드 완료!");
    });

    const upload2 = multer()
    

    // app.get("/upload/:imageStorage", (req, res) => {
    //     file = req.params.imageStorage;
    //     console.log(`이미지 데이터를 저장할 파일 이름: `, file);
    //     console.log(`현재 위치: ${__dirname}`);
    //     const img = fs.readFileSync(__dirname + "/upload/" + file);
    //     res.writeHead(StatusCode.OK, { "Content-Type": "image/png" });
    //     res.end(img, "binary");
    // });
};
