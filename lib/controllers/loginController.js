'use strict';

const errorHandler = require('../../middleware/500');
const client = require('../models/client.js');


const signup = (req, res) => {
    const user = req.body;
    const sql = `INSERT INTO users(username, password) VALUES ($1, $2) RETURNING *;`

    const values = [user.username, user.password];
    client.query(sql, values).then((data) => {
        res.status(201).json(data.rows);
    })
        .catch(error => {
            console.log(error);
            errorHandler(error, req, res);
        });
}


const signin = (req, res) => {
    const user = req.body;
    console.log(req.body)
    // const sql = `SELECT * FROM users WHERE password = ${user.password} AND username = ${user.username} `;
    const sql = `SELECT * FROM users WHERE "username"='${req.body.username}' AND "password" = '${user.password}';`;
    const values = [user.username];

    client.query((sql)).then(data => {
        return res.status(200).json(data.rows);
    })
        .catch(error => {
            errorHandler(error, req, res);
        });
}


module.exports = {
    signup,
    signin
};