const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",        
    password: "1234",        
    database: "checkindb" 
});

db.connect((err) => {
    if (err) {
        console.log("Erro ao conectar ao MySQL:", err);
        return;
    }
    console.log("Conectado ao MySQL");
});

module.exports = db;