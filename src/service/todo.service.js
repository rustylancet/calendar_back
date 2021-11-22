const connection = require("../app/database");

class TodoService {
    async getTodoByUserId(user_id) {
        const statement = `
        SELECT * FROM todo 
        LEFT JOIN type 
        ON todo.type_id = type.type_id
        WHERE todo.user_id = ?`
        const [resultSql] = await connection.execute(statement, [user_id]).catch(err => {
            console.log(err);
        });
        return resultSql;
    }
    async createTodo(todo, user_id) {
        const {
            des, type_id
        } = todo;
        console.log(des);
        const statement = `INSERT INTO todo (des, type_id, user_id) VALUES (?, ?, ?)`;
        const [resultSql] = await connection.execute(statement, [des, type_id, user_id]).catch(err => {
            console.log(err);
        });
        return resultSql.insertId;
    }

    async deleteTodoById(todo_id, user_id) {
        const statement = `DELETE FROM todo WHERE todo_id = ? AND user_id = ?`;
        const [resultSql] = await connection.execute(statement, [todo_id, user_id]);
        return resultSql;
    }

    async changeTodoStatus(todo_id, status) {
        console.log('status:', status);
        const statement = `UPDATE todo SET todo_status = ? WHERE todo_id = ?`;
        const [resultSql] = await connection.execute(statement, [status, todo_id]).catch(err => {
            console.log(err);
        });
        return resultSql;
    }
    async updateTodoInfo(todo) {
        const { todo_id, type_id, des } = todo;
        const statement = `UPDATE todo SET type_id = ? , des = ? WHERE todo_id = ?`
        const [resultSql] = await connection.execute(statement, [type_id, des, todo_id]);
        return resultSql;
    }

    async getTodoByTypeId(user_id, type_id) {
        const statement = `
        SELECT * FROM todo
        LEFT JOIN type 
        ON todo.type_id = type.type_id
        WHERE todo.user_id = ? 
        AND todo.type_id = ?`
        const [resultSql] = await connection.execute(statement, [user_id, type_id]).catch(err => {
            console.log(err);
        });
        return resultSql;
    }
    async getTodoByStatusId(user_id, status) {
        const statement = `
        SELECT * FROM todo
        LEFT JOIN type 
        ON todo.type_id = type.type_id
        WHERE todo.user_id = ? 
        AND todo.todo_status = ?`
        const [resultSql] = await connection.execute(statement, [user_id, status]);
        return resultSql;
    }
    async getTodoSort(user_id) {
        const statement = `
        SELECT a.type_id,
        a.type_name,
        a.color,
        JSON_ARRAYAGG(JSON_OBJECT('todo_id', b.todo_id, 'des', b.des, 'color', a.color, 'status', b.todo_status)) as todoList
        FROM todo b
        LEFT JOIN type  a ON b.type_id = a.type_id
        LEFT JOIN user  c ON c.user_id = b.user_id
        AND b.user_id = ?
        GROUP BY a.type_id`
        const [resultSql] = await connection.execute(statement, [user_id]).catch(err => {
            console.log(err);
        });
        return resultSql;
        
    }
}

module.exports = new TodoService();