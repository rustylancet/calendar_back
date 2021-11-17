const connection = require("../app/database");

class TypeService {
    async getAllTypes() {
        const statement = `SELECT * FROM type;`;
        const [resultSql] = await connection.execute(statement);
        return resultSql;
    }
}

module.exports = new TypeService();