const env = require("dotenv");
const GroupAPI = require("../utils/group");
const StatusCode = require("../utils/statusCode");
const { Group } = require("../models");

// .env 파일에 써둔 민감한 정보들을 불러옴
// process.env.{KEY} 형식으로 불러오면 됨
env.config();

module.exports = function (app) {
    // 그룹 생성
    app.get("/group/create/:name/:userId", (req, res) => {
        GroupAPI.generateCode()
            .then((code) => {
                return GroupAPI.createGroup(
                    req.params.name,
                    code,
                    req.params.userId
                );
            })
            .then((group) => {
                return res.status(StatusCode.OK).json({
                    msg: "그룹이 정상적으로 만들어졌습니다",
                });
            })
            .catch((reason) => {
                console.error(" 에러 발생:  ", reason);
                return res.status(StatusCode.InternalServerError).send(reason);
            });
    });

    // 그룹에 참여
    app.get("/group/join/:code/:userId", (req, res) => {
        const code = req.params.code;
        const userId = req.params.userId;

        return GroupAPI.joinGroup(code, userId)
            .then((result) => {
                if (result.nModified == 1)
                    return res
                        .status(StatusCode.OK)
                        .send("그룹에 정상적으로 참여했습니다");
                else if (result.n == 0)
                    return res
                        .status(StatusCode.NotFound)
                        .send("그룹이 존재하지 않습니다");
                else 
                    return res.status(StatusCode.Forbidden).send("이미 가입한 그룹입니다");
            })
            .catch((reason) => {
                console.error(" 에러 발생:  ", reason);
                return res.status(StatusCode.InternalServerError).send(reason);
            });
    });

    // 그룹에서 나가기
    app.get("/group/exit/:code/:userId", (req, res) => {
        const code = req.params.code;
        const userId = req.params.userId;

        return GroupAPI.exitGroup(code, userId)
            .then((result) => {
                if (result.nModified == 1)
                    return res
                        .status(StatusCode.OK)
                        .send("그룹에서 정상적으로 탈퇴했습니다");
                else if (result.n == 0)
                    return res
                        .status(StatusCode.NotFound)
                        .send("그룹이 존재하지 않습니다");
                else
                    return res
                        .status(StatusCode.Forbidden)
                        .send("가입한 그룹이 아닙니다");
            })
            .catch((reason) => {
                console.log(" 에러 발생 ");
                return res.send(reason);
            });
    });
};
