
var Cookies = require("cookies");
const typeService = require("../service/type.service");
const { log } = require("console");
const util = require("../constants/util")

class TypeController {
    //获取所有类型
    async searchAll(ctx, next) {
        const result = await typeService.getAllTypes();

        ctx.body = util.success(result);
    }

}

module.exports = new TypeController();
