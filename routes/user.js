const AuthAPI = require("../utils/auth");
const env = require("dotenv");
const { User } = require("../models");
const StatusCode = require("../utils/statusCode");

// .env 파일에 써둔 민감한 정보들을 불러옴
// process.env.{KEY} 형식으로 불러오면 됨
env.config();

const FAILURE = process.env.CODE_FAILURE;
const SUCCESS = process.env.CODE_SUCCESS;

module.exports = function (app) {
    app.get("/user/:token", (req, res) => {
        const token = req.params.token;
        console.log("token: ", token);
        AuthAPI.verifyToken(token)
            .then((user_id) => {
                console.warn(user_id);
                return res
                    .status(StatusCode.OK)
                    .json({
                        msg: "클라이언트의 토큰이 확인되었습니다",
                        id: user_id,
                    });
            })
            .catch((reason) => {
                console.log(" 에러 발생 ");
                return res.json(reason);
            });
    });

    app.get("/user/login/:token", (req, res) => {
        const token = req.params.token;
        // AuthAPI.verifyToken(token)
            AuthAPI.fakeVerifyToken(token)
            .then((user_id) => {
                console.warn(user_id);
                return User.findOne({ id: user_id }).exec();
            })
            .then((user) => {
                if (!user)
                    return res
                        .status(StatusCode.Forbidden)
                        .send("해당 유저가 존재하지 않습니다");
                else return res.status(StatusCode.OK).json(user);
            })
            .catch((reason) => {
                console.error(" 알 수 없는 에러 발생:  ", reason);
                return res.status(StatusCode.InternalServerError).send(reason);
            });
    });

    app.get("/user/register/:token/:nickName/:phone", (req, res) => {
        const token = req.params.token;
        let user_id;
        console.log("register...")
        // AuthAPI.verifyToken(token)
            AuthAPI.fakeVerifyToken(token)
            .then((id) => {
                console.warn(id);
                user_id = id;
                return User.findOne({ id: id }).exec();
            })
            .then((user) => {
                console.log(`유저 가입 중 - id: ${user_id}`);
                if (user)
                    return res
                        .status(StatusCode.Conflict)
                        .send("해당 유저는 이미 가입되어 있습니다");
                else {
                    let user = new User();
                    user.nickName = req.params.nickName;
                    user.id = user_id;
                    user.contacts = []
                    user.phone = req.params.phone
                    user.groupCode = req.params.groupCode
                    user.save((err) => {
                        if (err)
                            throw new Error(
                                "유저를 DB에 저장할 수 없습니다\n" + err
                            );
                        return res.status(StatusCode.OK).json(user);
                    });
                }
            })
            .catch((reason) => {
                console.error(" 에러 발생:  ", reason);
                return res.status(StatusCode.InternalServerError).send(reason);
            });
    });

    app.get("/user/check/:nickName", (req, res) => {
        User.findOne({ nickName: req.params.nickName })
            .exec()
            .then((isDuplicated) => {
                if (isDuplicated)
                    return res
                        .status(StatusCode.Conflict)
                        .send(
                            "유저를 등록할 수 없습니다. 이미 존재하는 닉네임입니다"
                        );
                else
                    return res
                        .status(StatusCode.OK)
                        .send("사용하실 수 있는 닉네임입니다!");
            })
            .catch((reason) => {
                console.log(" 알 수 없는 에러 발생:  ", reason);
                return res.status(StatusCode.InternalServerError).send(reason);
            });
    });


    app.get("/user/location/:userId/:latitude/:longitude", (req, res) => {
        User.findOneAndUpdate(
            { id: req.params.userId },
            {
                latitude: req.params.latitude,
                longitude: req.params.longitude,
            }
        )
            .exec()
            .then( () => User.findOne({ id: req.params.userId }).exec())
            .then( user =>{ 
                console.log("유저 location 업데이트");
                return res.status(StatusCode.OK).json(user)})
            .catch((reason) => {
                console.log(" 알 수 없는 에러 발생:  ", reason);
                return res.status(StatusCode.InternalServerError).send(reason);
            });
    });


    app.get("/user/status/:userId/:status", (req, res) => {
        console.log("유저 status 업데이트");
                User.findOneAndUpdate(
                    { id: req.params.userId },
                    {
                        status: req.params.status
                    }
                )
                    .exec()
                    .then(() => User.findOne({ id: req.params.userId }).exec())
                    .then((user) => res.status(StatusCode.OK).json(user))
                    .catch((reason) => {
                        console.log(" 알 수 없는 에러 발생:  ", reason);
                        return res
                            .status(StatusCode.InternalServerError)
                            .send(reason);
                    });

    })
};
