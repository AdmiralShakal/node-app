const db = require('../db');
const limit = 5;

class DateController {
  async createDate(req, res) {
    const { data, name, count, distance } = req.body;
    const newData = await db.query(
      `INSERT INTO dates (data, name, count, distance values($1,$2,$3,$4) RETURNING *`,
      [data, name, count, distance],
    );
    res.json(newData.rows[0]);
  }

  async getData(req, res) {
    const page = parseInt(req.query.page);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    results.next = {
      page: page + 1,
      limit: limit,
    };

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    const data = await db.query('SELECT * FROM dates');
    results.results = data.rows.slice(startIndex, endIndex);
    res.json(results);
  }

  async getDataSorted(req, res) {
    //works like getData, but returns sorted data from db
    const page = req.query.page;
    const column = req.query.column;
    const type = req.query.type;
    const num = req.query.num;

    const data = {};
    const results = {};

    results.page = page;
    results.next = {
      page: page + 1,
      limit: limit,
    };

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    if (type === 'MORE') {
      data = await db.query('SELECT * FROM dates where $1 > $2 ', [column, num]);
    } else if (type === 'LOWER') {
      data = await db.query('SELECT * FROM dates where $1 < $2 ', [column, num]);
    } else if (type === 'CONCT') {
      data = await db.query('SELECT * FROM dates where $1 LIKE $2', [column, num]);
    } else data = await db.query('SELECT * FROM dates where $1 = $2', [column, num]);

    results.results = data.rows.slice(startIndex, endIndex);
    res.json(results);
  }

  async updateData(req, res) {
    const { name, count, distance } = req.body;
    const newData = await db.query(
      `UPDATE dates set name = $1, count =$2, distance = $3 where data = $4 RETURNING *`,
      [name, count, distance, data],
    );
    res.json(newData.rows[0]);
  }
  async deleteData(req, res) {
    const { data } = req.body;
    const newData = await db.query(`DELETE from dates where data = $1`, [data]);
    res.json(newData.rows[0]);
  }
}

module.exports = new DateController();
