const { Group, User } = require("../models");
const StatusCode = require("./statusCode");
const ResultCode = require("./resultCode");

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function generateString(length) {
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }

    return result;
}

function generateCodeHelper(callback) {
    const code = generateString(5);
    console.log("code: ", code);
    Group.findOne({ code: code }, (err, result) => {
        if (err) callback(err);
        else if (result) return generateCodeHelper(callback);
        else callback(null, code);
    });
}

function generateCode() {
    return new Promise((resolve, reject) => {
        generateCodeHelper((err, code) => {
            if (err) reject(err);
            else resolve(code);
        });
    });
}

function createGroup(name, code, userId) {
    return new Promise((resolve, reject) => {
        console.log("code: " + code + "인 그룹을 만드는 중...");
        let group = new Group();
        group.name = name;
        group.code = code;
        group.users = [userId];
        console.log("그룹 만들어서 넣는중");
        group.save((err) => {
            if (err) reject("그룹을 DB에 저장할 수 없습니다\n" + err);
            return resolve(group);
        });
    })
        .then((group) => {
            return User.updateOne(
                {
                    id: userId,
                },
                { $set: { groupCode: code } }
            ).exec();
        })
        .catch((reason) => new Promise((resolve, reject) => reject(reason)));
}

function joinGroup(code, userId) {
    return User.updateOne(
        {
            id: userId,
        },
        { $set: { groupCode: code } }
    )
        .exec()
        .then((result) => {
            console.log(result);
            return new Promise((resolve, reject) => {
                if (result.nModified == 1)
                    return resolve(ResultCode.UserJoinedGroup);
                else if (result.n == 0) return reject(ResultCode.NoSuchUser);
                else return reject(ResultCode.CannotJoinToJoinedGroup);
            });
        })
        .then((resultCode) => {
            return Group.updateOne(
                { code: code },
                { $addToSet: { users: [userId] } }
            ).exec();
        })
        .then((result) => {
            return new Promise((resolve, reject) => {
                if (result.nModified == 1)
                    return resolve(ResultCode.GroupAcceptedUser);
                else if (result.n == 0) return reject(ResultCode.GroupNotFound);
                else return reject(ResultCode.CannotJoinToJoinedGroup);
            });
        })
        .catch((reason) => new Promise((resolve, reject) => reject(reason)));
}

function exitGroup(code, userId) {
    return User.updateOne(
        {
            id: userId,
            groupCode: code,
        },
        { $set: { groupCode: 0 } }
    ).exec()
    .then((result) => {
        console.log(result)
        return new Promise((resolve, reject) => {
        if (result.nModified == 1)
            return resolve(ResultCode.UserLeftGroup)
        else if (result.n == 0)
            return reject(ResultCode.NoSuchUser)
        else
            return reject(ResultCode.CannotExitFromUnjoinedGroup);
    })})
    .then( resultCode => {
        return Group.updateOne({ code: code }, { $pull: { users: userId } })
        .exec()
    })
    .then((result) => {
        return new Promise((resolve, reject) => {
        if (result.nModified == 1)
            return resolve(ResultCode.GroupEjectedUser)
        else if (result.n == 0)
            return reject(ResultCode.GroupNotFound)
        else
            return reject(ResultCode.CannotExitFromUnjoinedGroup);
    })})
    .catch((reason) => new Promise((resolve, reject) => reject(reason)));

}

const GroupAPI = {
    generateCode,
    joinGroup,
    exitGroup,
    createGroup,
    generateString,
};

module.exports = GroupAPI;
