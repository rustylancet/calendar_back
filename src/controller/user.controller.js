const fs = require("fs");
var Cookies = require("cookies");
const userService = require("../service/user.service");
const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../app/config");
const { log } = require("console");
const util = require("../constants/util")
const { AVATAR_PATH } = require("../constants/file-path");

class UserController {
  //用户注册
  async create(ctx, next) {
    const user = ctx.request.body;
    // log(ctx);
    const result = await userService.create(user);

    ctx.body = util.success(result);
  }

  /**
   * 用户登录
   */
  async login(ctx, next) {
    const { user_id, nickname } = ctx.user;
    const token = jwt.sign({ user_id, nickname }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24 * 7,
      algorithm: "RS256",
    });

    ctx.body = util.success({ user_id, nickname, token });
  }

  /**
   * 修改个人信息
   */
  async update(ctx, next) {
    const user = ctx.request.body;
    const { user_id } = ctx.user;
    // console.log(user);
    const result = await userService.updateUser(user, user_id);

    ctx.body = util.success(result);
  }

  /**
   * 获取用户个人信息
   */
  async userInfo(ctx, next) {
    const { user_id } = ctx.user;
    console.log("user_id:",user_id);
    const result = await userService.getUserById(user_id);

    ctx.body = util.success(result);
  }
}

module.exports = new UserController();
