const connection = require("../app/database");

class UserService {
  /**
   * 注册
   * @param {用户信息} user 
   * @returns user_id
   */
  async create(user) {
    const {
      nickname, password
    } = user;
    const statement = `INSERT INTO user (nickname,  password) VALUES (?, ?);`;
    await connection.execute(statement, [
      nickname,
      password
    ]).catch(err => {
      console.log(err);
    });
    const statement2 = `SELECT max(user_id) AS user_id FROM user `;
    const [resultSql] = await connection.execute(statement2).catch(err => {
      console.log(err);
    });
    return resultSql[0].user_id;
  }
  /**
   * 更新用户个人信息
   * @param {用户信息} user 
   * @param {用户id} user_id 
   * @returns 
   */
  async updateUser(user, user_id) {
    const {
      nickname, password
    } = user;
    const statement = `UPDATE user SET nickname = ?, password = ? WHERE user_id = ? `;
    const resultSql = await connection.execute(statement, [
      nickname,
      password,
      user_id
    ]).catch(err => {
      console.log(err);
    });
    return resultSql;
  }

  /**
   * 根据昵称查询用户信息
   * @param {昵称} nickname 
   * @returns 
   */
  async getUserByNickname(nickname) {
    const statement = "SELECT * FROM `user` WHERE `nickname` = ?";
    const [resultSql] = await connection.execute(statement, [nickname]).catch(err => {
      console.log(err);
    });
    return resultSql[0];
  }

  /**
   * 根据用户ID查询用户信息
   * @param {用户ID} user_id 
   * @returns 
   */
  async getUserById(user_id) {
    const statement = "SELECT * FROM `user` WHERE `user_id` = ?";
    const [resultSql] = await connection.execute(statement, [user_id]).catch(err => {
      console.log(err);
    });
    return resultSql[0];
  }
}

module.exports = new UserService();
