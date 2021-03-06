const jwt = require("jsonwebtoken");
const errorTypes = require("../constants/error-types");
const userService = require("../service/user.service");
const { PUBLIC_KEY } = require("../app/config");

/**
 * 验证注册账号
 */
const verifyUser = async (ctx, next) => {
  console.log("验证注册账号的middleware~");
  // 1.获取用户名手机
  const { nickname } = ctx.request.body;
  // 2.判断这次注册的用户名是没有被注册过
  const result = await userService.getUserByNickname(nickname);
  // console.log('length:', result.length);
  if (result.length) {
    const error = new Error(errorTypes.USER_ALREADY_EXISTS);
    console.log('error', error);
    return ctx.app.emit('error', error, ctx);

  }
  await next();
};

/**
 *验证是否登陆成功
 */
const verifyLogin = async (ctx, next) => {
  console.log("验证登录的middleware~");
  console.log(ctx.request.body)
  // 1.获取用户名和密码
  const { nickname, password } = ctx.request.body;
  // console.log(nickname);
  // console.log(password);
  // 2.判断用户名和密码是否为空
  if (!nickname || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }

  // 3.判断用户是否存在的
  const result = await userService.getUserByNickname(nickname);
  const user = result;
  // console.log(result);
  if (!user) {
    const error = new Error(errorTypes.USER_DOES_NOT_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }
  // 4.判断密码是否和数据库中的密码是一致(加密)
  if (password !== user.password) {
    const error = new Error(errorTypes.PASSWORD_IS_INCORRENT);
    return ctx.app.emit("error", error, ctx);
  }

  ctx.user = user;
  await next();
};

/**
 * 验证是否有授权
 */
const verifyAuth = async (ctx, next) => {
  console.log("验证授权的middleware~");
  // console.log(ctx.headers);
  // 1.获取token
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    console.log('无授权');
    const error = new Error(errorTypes.UNAUTHORIZATION);
    return ctx.app.emit("error", error, ctx);
  }
  const token = authorization.replace("Bearer ", "");
  // console.log('token:', token);
  // 2.验证token(id/name/iat/exp)
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });

    ctx.user = result;
    console.log('认证结果：', result);
    await next();
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    ctx.app.emit("error", error, ctx);
    ctx.app.emit("error", err);
  }
};

module.exports = {
  verifyUser,
  verifyLogin,
  verifyAuth,
};
