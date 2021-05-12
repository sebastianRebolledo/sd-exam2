//aqui creamos un obejto de conexion, vamos a usar un objeto de mysql para conectarse.
const mysql = require ('mysql');

const mysqlConnection = mysql.createConnection({
host : process.env.DATABASE_HOST || 'localhost',
user : process.env.MYSQL_USER || 'root',
password : process.env.MYSQL_PASSWORD || 'password',
database : process.env.MYSQL_DATABASE || 'company'
})


function sleep(milliseconds) {
 var start = new Date().getTime();
 for (var i = 0; i < 1e7; i++) {
  if ((new Date().getTime() - start) > milliseconds) {
   break;
  }
 }
} 

mysqlConnection.connect(function(err) {
	sleep(5000)
    if(err){
        console.log(err);
        return;
    }else{
        console.log('DB is connected')
    }
});

module.exports = mysqlConnection;

