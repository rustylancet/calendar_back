const Router = require("koa-router");
const {
  searchAll,
  createTodo,
  deleteTodo,
  changeTodoStatus,
  updateTodo,
  typeSearch,
  statusSearch,
  getBySort
} = require("../controller/todo.controller");
const {
  verifyAuth,
} = require("../middleware/user.middleware");

const todoRouter = new Router({ prefix: "/todos" });

todoRouter.get("/", verifyAuth, searchAll); //查询所有事项
todoRouter.post("/", verifyAuth, createTodo); //新增事项
todoRouter.post("/del", verifyAuth, deleteTodo); //删除事项
todoRouter.post("/status", verifyAuth, changeTodoStatus); //修改事项状态
todoRouter.post("/update", verifyAuth, updateTodo); //修改事项
todoRouter.get("/type/:type_id", verifyAuth, typeSearch); //查询指定类型事项
todoRouter.get("/sort", verifyAuth, getBySort); //事项根据类型排序
todoRouter.get("/status/:status", verifyAuth, statusSearch); //查询指定状态事项
module.exports = todoRouter;
