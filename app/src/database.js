//aqui creamos un obejto de conexion, vamos a usar un objeto de mysql para conectarse.
const mysql = require ('mysql');

const mysqlConnection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'password',
    database: 'company'


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

