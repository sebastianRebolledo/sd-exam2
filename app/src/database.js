//aqui creamos un obejto de conexion, vamos a usar un objeto de mysql para conectarse.
const mysql = require ('mysql');

const mysqlConnection = mysql.createConnection({
host : process.env.DATABASE_HOST || 'localhost',
user : process.env.MYSQL_USER || 'root',
password : process.env.MYSQL_PASSWORD || 'password',
database : process.env.MYSQL_DATABASE || 'company'
}) 

mysqlConnection.connect(function(err) {
    if(err){
        console.log(err);
        return;
    }else{
        console.log('DB is connected')
    }
});

module.exports = mysqlConnection;

