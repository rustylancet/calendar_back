const Router = require("koa-router");
const {
  searchAll,
  createType,
  updateType,
  deleteType
} = require("../controller/type.controller");
const {
  verifyAuth,
} = require("../middleware/user.middleware");
const typeRouter = new Router({ prefix: "/types" });

typeRouter.get("/", verifyAuth, searchAll); //查询所有类型
typeRouter.post("/", verifyAuth, createType); //新增类型
typeRouter.post("/update", verifyAuth, updateType); //修改类型
typeRouter.post("/del/:type_id", verifyAuth, deleteType); //新增类型

module.exports = typeRouter;
