const env = require("dotenv");
const GroupAPI = require("../utils/group");
const StatusCode = require("../utils/statusCode");
const { Group } = require("../models");
const ResultCode = require("../utils/resultCode");

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
            .then((userUpdateResult) => {
                if (userUpdateResult.nModified == 1)
                    return res
                        .status(StatusCode.OK)
                        .send("그룹이 정상적으로 만들어졌으며, 유저의 groupCode도 업데이트 했습니다");
                else if (userUpdateResult.n == 0)
                    return res
                        .status(StatusCode.NotFound)
                        .send(
                            `그룹은 생성되었으나, 해당 유저 id ${req.params.userId} 는 존재하지 않습니다`
                        );
                else 
                    return res
                        .status(StatusCode.Forbidden)
                        .send("유저가 이미 가입되어 있는 그룹을 만들었습니다. 이런 일은 발생할 수 없습니다");
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
            .then((resultCode) => {
                if (resultCode == ResultCode.GroupAcceptedUser)
                    return res
                        .status(StatusCode.OK)
                        .send("그룹에 정상적으로 참여했습니다");
                else {
                    throw new Error(`resultCode: ${resultCode} 일때 이 코드에 진입할 수 없음`)
                }
            })
            .catch((reason) => {
                if (reason == ResultCode.NoSuchUser)
                    return res
                        .status(StatusCode.NotFound)
                        .send(
                            `ID가 ${userId} 인 유저는 존재하지 않습니다`
                        );
                else if (reason == ResultCode.CannotJoinToJoinedGroup)
                    return res
                        .status(StatusCode.Forbidden)
                        .send(`이미 가입한 그룹입니다`);
                else if (reason == ResultCode.GroupNotFound)
                    return res
                        .status(StatusCode.NotFound)
                        .send(`해당 그룹 (코드: ${code})은 존재하지 않습니다`);
                else {
                    console.error(" 에러 발생 ", reason);
                    return res.status(StatusCode.InternalServerError).send(reason);
                }
            });
    });

    // 그룹에서 나가기
    app.get("/group/exit/:code/:userId", (req, res) => {
        const code = req.params.code;
        const userId = req.params.userId;

        return GroupAPI.exitGroup(code, userId)
            .then((resultCode) => {
                if (resultCode == ResultCode.GroupEjectedUser)
                    return res
                        .status(StatusCode.OK)
                        .send("그룹에서 정상적으로 탈퇴했습니다");
                else {
                    throw new Error(`resultCode: ${resultCode} 일때 이 코드에 진입할 수 없음`)
                }
            })
            .catch((reason) => {
                if (reason == ResultCode.NoSuchUser)
                    return res
                        .status(StatusCode.NotFound)
                        .send(
                            `ID가 ${userId} 이고, 가입한 그룹 코드가 ${code} 인 유저는 존재하지 않습니다`
                        );
                else if (reason == ResultCode.CannotExitFromUnjoinedGroup)
                    return res
                        .status(StatusCode.Forbidden)
                        .send(`유저의 그룹 코드가 ${code}가 아닙니다`);
                else if (reason == ResultCode.GroupNotFound)
                    return res
                        .status(StatusCode.NotFound)
                        .send(`해당 그룹 (코드: ${code})은 존재하지 않습니다`);
                else if (reason == ResultCode.CannotExitFromUnjoinedGroup)
                    return res
                        .status(StatusCode.Forbidden)
                        .send(`해당 그룹 (코드: ${code})의 유저 목록에는 해당 유저 (ID: ${userId}) 가 존재하지 않습니다`);
                else {
                    console.error(" 에러 발생 ", reason);
                    return res.status(StatusCode.InternalServerError).send(reason);
                }
            });
    });
};
