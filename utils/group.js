const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const { Group } = require("../models");

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

const GroupAPI = {
    generateCode,
    generateString,
};

module.exports = GroupAPI;
