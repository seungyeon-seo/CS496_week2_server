const env = require("dotenv");
const GroupAPI = require("../utils/group");
const StatusCode = require("../utils/statusCode");
const { Group, User } = require("../models");
const ResultCode = require("../utils/resultCode");

// .env 파일에 써둔 민감한 정보들을 불러옴
// process.env.{KEY} 형식으로 불러오면 됨
env.config();

module.exports = function (app) {
    // 그룹 생성

    app.get("/group/create/:name/:userId", (req, res) => {
        const name = req.params.name;
        const userId = req.params.userId;

        let newGroupCode;
        let userOId;
        GroupAPI.generateCode()
            .then((code) => {
                newGroupCode = code;
                return User.findOne({ id: userId }).exec();
            })
            .then((user) => {
                if (user == null) throw(`id가 ${userId}인 유저는 없습니다`)
                userOId = user._id;
                return User.updateOne(
                    { id: userId },
                    { $set: { groupCode: newGroupCode } }
                ).exec();
            })
            .then((result) => {
                let group = new Group();
                group.name = name;
                group.code = newGroupCode;
                group.users = [userOId];
                console.log("그룹 만들어서 넣는중");
                group.save();
                console.log(`그룹: ${group}`);
                return res.status(StatusCode.OK).json(group);
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
        let userOId;

        return Group.findOne({ code: code })
            .exec()
            .then((group) => {
                console.log(group);
                if (!group) throw new Error(ResultCode.GroupNotFound);
                return User.findOne({ id: userId }).exec();
            })
            .then((user) => {
                userOId = user._id;
                return User.updateOne(
                    { id: userId },
                    { $set: { groupCode: code } }
                ).exec();
            })
            .then((res) => {
                return Group.updateOne(
                    { code: code },
                    { $addToSet: { users: [userOId] } }
                ).exec();
            })
            .then((result) => Group.findOne({ code: code }))
            .then((group) => res.status(StatusCode.OK).json(group))
            .catch((reason) => {
                if (reason == ResultCode.GroupNotFound)
                    return res
                        .status(StatusCode.NotFound)
                        .send(`그룹 코드 ${code}인 그룹은 존재하지 않습니다`);
                return res.status(StatusCode.InternalServerError).send(reason);
            });
    });

    // 그룹에서 나가기
    app.get("/group/exit/:code/:userId", (req, res) => {
        const code = req.params.code;
        const userId = req.params.userId;
        let userOId;
        return Group.findOne({ code: code })
            .exec()
            .then((group) => {
                return User.findOne({ id: userId, groupCode: code }).exec();
            })
            .then((user) => {
                console.log(`user: ${user}`)
                userOId = user._id;
                return User.updateOne(
                    {
                        id: userId,
                    },
                    { $set: { groupCode: 0 } }
                ).exec();
            })
            .then((result) => {
                return Group.updateOne(
                    { code: code },
                    { $pull: { users: userOId } }
                ).exec();
            })
            .then((result) => {
                return res
                    .status(StatusCode.OK)
                    .send("그룹에서 정상적으로 탈퇴했습니다");
            })
            .catch((reason) => {
                    console.error(" 에러 발생 ", reason);
                    return res
                        .status(StatusCode.InternalServerError)
                        .send(reason);
            });
    });

    // 그룹의 멤버 모두 조회
    app.get("/group/members/:code", async (req, res) => {
        const userData = await Group.findOne({ code: req.params.code })
            .populate("users")
            .exec();

        console.log(userData);
        return res.json(userData.users);

        // .then((data) => {})
        // .catch((reason) => {
        //     console.error(" 에러 발생 ", reason);
        //     return res.status(StatusCode.InternalServerError).send(reason);
        // });
    });
};
