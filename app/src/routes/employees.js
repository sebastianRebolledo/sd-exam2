const express = require('express'); 
const router = express.Router();
    
 const mysqlConnection = require('../database');

 router.get('/',(req,res) => {
     mysqlConnection.query('SELECT * FROM employees',(err,rows,fields) =>{
         if(!err){
             res.json(rows);
         }else{
             console.log(err);
         }
     })
 });

 router.get('/:id',(req,res)=> {
     const { id } = req.params;
     mysqlConnection.query('SELECT * FROM employees WHERE id= ?',[id],(err,rows,flieds) => {
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
     }); 
 });

 router.post('/', (req,res) => {
     const { id, name, salary } = req.body;
     const query = ` 
       CALL employeeAddOrEdit(?,?,?);
     `;
     mysqlConnection.query(query,[id,name,salary], (err,rows,fields) => {
         if(!err){
             res.json({Status:'EMpleado guardado'})
         }else{
             console.log(err);
         }
     });
 });
 

 router.put('/:id',(req,res) =>{
     const {name,salary} = req.body;
     const {id} = req.params;
     const query = 'CALL employeeAddOrEdit(?,?,?)';
     mysqlConnection.query(query,[id,name,salary], (err,rows,fileds) => {
         if(!err){
             res.json({status: 'Empleado actualizado'})
         }else{
             console.log(err);
         }
     })
 });

 router.delete('/:id',(req,res)=>{
     const {id} = req.params;
     mysqlConnection.query('DELETE FROM employees WHERE id = ?',[id], (err, rows,flieds) => {
         if(!err){
             res.json({status: 'Empleado eliminado'});
         }else{
             console.log(err);
         }
     });
 });
module.exports = router;
