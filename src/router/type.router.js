const Router = require("koa-router");
const {
  searchAll
} = require("../controller/type.controller");

const typeRouter = new Router({ prefix: "/types" });

typeRouter.get("/", searchAll); //注册


module.exports = typeRouter;
