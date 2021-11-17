const Router = require("koa-router");
const {
  create,
  login,
  update,
  userInfo
} = require("../controller/user.controller");
const {
  verifyUser,
  verifyLogin,
  verifyAuth,
} = require("../middleware/user.middleware");

const userRouter = new Router({ prefix: "/users" });

userRouter.post("/", verifyUser, create); //注册
userRouter.post("/login", verifyLogin, login);//登录
userRouter.get("/", verifyAuth, userInfo);//获取用户信息
userRouter.post("/update/:user_id", verifyAuth, update);//修改用户信息


module.exports = userRouter;
