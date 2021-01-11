// DB 수정 후 result code

// exitGroup 에서 사용하는 result code
const GroupEjectedUser = 2;
const UserLeftGroup = 4;
const CannotExitFromUnjoinedGroup = 1;




const GroupNotFound = 0
const NoSuchUser = 3

// joinGroup에서 사용하는 result code
const GroupAcceptedUser = 5;
const UserJoinedGroup = 6;
const CannotJoinToJoinedGroup = 7;

const ResultCode = {
    GroupNotFound,
    CannotExitFromUnjoinedGroup,
    GroupEjectedUser,
    NoSuchUser,
    UserLeftGroup,
    GroupAcceptedUser,
    UserJoinedGroup,
    CannotJoinToJoinedGroup,
};

module.exports = ResultCode;
