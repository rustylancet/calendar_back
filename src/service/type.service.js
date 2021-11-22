const connection = require("../app/database");

class TypeService {
    async getAllTypes(user_id) {
        const statement = `SELECT * FROM type WHERE user_id = ?;`;
        const [resultSql] = await connection.execute(statement, [user_id]);
        return resultSql;
    }

    async createType(type, user_id) {
        const { type_name, color } = type;
        const statement = `INSERT INTO type (type_name, color, user_id) VALUES (?, ?, ?);`
        const [resultSql] = await connection.execute(statement, [type_name, color, user_id]).catch(err => {
            console.log(err);
        });
        return resultSql;
    }
    async updateType(type) {
        const { type_id, type_name, color } = type;
        const statement = `UPDATE type SET type_name = ?,color = ? WHERE type_id = ?`
        const [resultSql] = await connection.execute(statement, [type_name, color, type_id]);
        return resultSql;
    }
    async deleteType(type_id, user_id) {
        const statement = `DELETE FROM type WHERE type_id = ? AND user_id = ?`
        const [resultSql] = await connection.execute(statement, [type_id, user_id]);
        return resultSql;
    }
}

module.exports = new TypeService();