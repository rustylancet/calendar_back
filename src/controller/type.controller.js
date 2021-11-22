var Cookies = require("cookies");
const typeService = require("../service/type.service");
const { log } = require("console");
const util = require("../constants/util")

class TypeController {
    //获取所有类型
    async searchAll(ctx, next) {
        const { user_id } = ctx.user;
        const result = await typeService.getAllTypes(user_id);
        ctx.body = util.success(result);
    }

    async createType(ctx, next) {
        const { user_id } = ctx.user;
        const type = ctx.request.body;
        console.log(user_id, type);
        const result = await typeService.createType(type, user_id);
        ctx.body = util.success(result);
    }
    async updateType(ctx, next) {
        const { user_id } = ctx.user;
        const type = ctx.request.body;
        const result = await typeService.updateType(type, user_id);
        ctx.body = util.success(result);
    }
    async deleteType(ctx, next) {
        const { user_id } = ctx.user;
        const { type_id } = ctx.params;
        const result = await typeService.deleteType(type_id, user_id);
        ctx.body = util.success(result);
    }
}

module.exports = new TypeController();
