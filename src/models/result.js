const { errorHandler } = require('../constants/error-handle')
// class BaseModel {
//     constructor(data, message, code) {
//         if (typeof data === 'string') {
//             this.message = data
//             data = null
//             message = null
//             code = null
//         }
//         if (data) {
//             this.data = data
//         }
//         if (message) {
//             this.message = message
//         }
//         if (code) {
//             this.code = code
//         }

//     }

// }

// class SuccessModel extends BaseModel {
//     constructor(data, message, code) {
//         super(data, message, code)
//         this.code = 400
//     }
// }
// class ErrorModel extends BaseModel {
//     constructor(data, message, code) {
//         super(data, message, code)
//         this.code = 404
//     }
// }
class BaseModel {
    constructor(data, errorHandler) {
        if (typeof data === 'string') {
            this.message = data
            data = null
        }
        if (data) {
            this.data = data
        }
        if (errorHandler) {
            this.status = errorHandler.status
            this.message = errorHandler.message
        }

    }

}

class SuccessModel extends BaseModel {
    constructor(data, message, code) {
        super(data, message, code)
        this.code = 400
    }
}
class ErrorModel extends BaseModel {
    constructor(data, message, code) {
        super(data, message, code)
        this.code = 404
    }
}
module.exports = {
    SuccessModel,
    ErrorModel
}