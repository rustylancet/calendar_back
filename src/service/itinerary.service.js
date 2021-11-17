const connection = require("../app/database");

class ItineraryService {
    /**
     * 获取当月行程
     */
    async createItinerary(itinerary, user_id) {
        const {
            des, type_id, start, end
        } = itinerary;
        const statement = `INSERT INTO itinerary (user_id, des, type_id, start, end) VALUES (?, ?, ?, ?, ?);`;
        const [resultSql] = await connection.execute(statement, [
            user_id, des, type_id, start, end
        ]).catch(err => {
            console.log(err);
        });
        return resultSql.insertId;
    }

    async getItinerary(timeFrom, timeEnd, user_id) {
        const statement = `
        SELECT * FROM itinerary 
        LEFT JOIN type ON itinerary.type_id = type.type_id
        WHERE ((start between ? and ?) OR (end between ? and ?)) 
        AND user_id = ? `
        const [resultSql] = await connection.execute(statement, [
            timeFrom, timeEnd, timeFrom, timeEnd, user_id
        ]).catch(err => {
            console.log(err);
        });
        console.log('resultSql:',resultSql);
        return resultSql;
    }

    async getItineraryInfoById(itinerary_id) {
        const statement = `
        SELECT * FROM itinerary 
        LEFT JOIN type ON itinerary.type_id = type.type_id
        WHERE itinerary_id = ? `
        const [resultSql] = await connection.execute(statement, [itinerary_id]).catch(err => {
            console.log(err);
        });
        return resultSql;
    }

    async updateItinerary(itinerary) {
        const { itinerary_id, des, type_id, start, end } = itinerary
        const statement = `UPDATE itinerary SET des = ?,type_id = ?, start = ?, end = ? WHERE itinerary_id = ?`
        const [resultSql] = await connection.execute(statement, [des, type_id, start, end, itinerary_id]).catch(err => {
            console.log(err);
        });
        return resultSql;
    }

    async deleteItinerary(itinerary_id) {
        const statement = `DELETE FROM itinerary WHERE itinerary_id = ?`
        const [resultSql] = await connection.execute(statement, [itinerary_id]).catch(err => {
            console.log(err);
        });
        return resultSql;
    }
}
module.exports = new ItineraryService();