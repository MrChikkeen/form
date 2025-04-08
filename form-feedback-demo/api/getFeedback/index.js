const sql = require('mssql');

module.exports = async function (context, req) {
    const config = {
        user: 'YOUR_SQL_USERNAME',
        password: 'YOUR_PASSWORD',
        server: 'YOUR_SERVER.database.windows.net',
        database: 'demo-db',
        options: {
            encrypt: true
        }
    };

    try {
        await sql.connect(config);
        const result = await sql.query`SELECT * FROM Feedback`;
        context.res = {
            body: result.recordset
        };
    } catch (err) {
        context.res = {
            status: 500,
            body: "Lỗi truy vấn SQL: " + err.message
        };
    }
};