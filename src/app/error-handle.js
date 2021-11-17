const errorTypes = require('../constants/error-types');

const errorHandler = (error, ctx) => {
  let status, message;
  ctx.body = {
    status: null,
    message: null
  }
  switch (error.message) {
    case errorTypes.SUCCESS:
      status = 200; // Bad Request
      message = "操作成功~";
      break;
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400; // Bad Request
      message = "用户名或者密码不能为空~";
      break;
    case errorTypes.USER_ALREADY_EXISTS:
      status = 409; // conflict
      message = "用户名已经存在~";
      break;
    case errorTypes.USER_DOES_NOT_EXISTS:
      status = 400; // 参数错误
      message = "用户名不存在~";
      break;
    case errorTypes.PASSWORD_IS_INCORRENT:
      status = 400; // 参数错误
      message = "密码是错误的~";
      break;
    case errorTypes.UNAUTHORIZATION:
      status = 401; // 参数错误
      message = "无效的token~";
      break;
    case errorTypes.UNPERMISSION:
      status = 401; // 参数错误
      message = "您不具备操作的权限~";
      break;
    default:
      status = 404;
      message = "NOT FOUND";
  }

  ctx.body.status = status;
  ctx.body.message = message;
}

module.exports = errorHandler;
