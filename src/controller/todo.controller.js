var Cookies = require("cookies");
const todoService = require("../service/todo.service");
const util = require("../constants/util")

class TodoController {
    //获取所有类型
    async searchAll(ctx, next) {
        const { user_id } = ctx.user;
        console.log(user_id);
        const result = await todoService.getTodoByUserId(user_id);

        ctx.body = util.success(result);
    }
    async createTodo(ctx, next) {
        const { user_id } = ctx.user;
        const todo = ctx.request.body;
        const result = await todoService.createTodo(todo, user_id);
        ctx.body = util.success(result);
    }
    async deleteTodo(ctx, next) {
        const { user_id } = ctx.user;
        const { todo_id } = ctx.request.body;
        const result = await todoService.deleteTodoById(todo_id, user_id);
        ctx.body = util.success(result);
    }
    async changeTodoStatus(ctx, next) {
        const { todo_id, status } = ctx.request.body;
        // console.log(status);
        const result = await todoService.changeTodoStatus(todo_id, status);
        ctx.body = util.success(result);
    }
    async updateTodo(ctx, next) {
        const todo = ctx.request.body;
        await todoService.updateTodoInfo(todo);
        ctx.body = util.success();
    }
    async typeSearch(ctx, next) {
        const { type_id } = ctx.params;
        //  console.log(type_id);
        const { user_id } = ctx.user;
        const result = await todoService.getTodoByTypeId(user_id, type_id);
        ctx.body = util.success(result);
    }
    async statusSearch(ctx, next) {
        const { user_id } = ctx.user;
        const { status } = ctx.params;
        const result = await todoService.getTodoByStatusId(user_id, status);
        ctx.body = util.success(result);
    }

    async getBySort(ctx, next) {
        const { user_id } = ctx.user;
        const result = await todoService.getTodoSort(user_id);
        ctx.body = util.success(result);
    }
}

module.exports = new TodoController();
