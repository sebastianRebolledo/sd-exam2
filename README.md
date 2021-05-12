##Integrantes 
-Carlos Heyder
-Sebastian Rebolledo
-Jaime Cardona

###Construcción API REST
La api REST la elaboramos mediante node js, a continuación mostraremos como hicimos los metodos de la api:

**CREATE**:  

    router.post('/', (req,res) => {
         const { id, name, salary } = req.body;
         const query = ` 
           CALL employeesAddOrEdit(?,?,?);
         `;
         mysqlConnection.query(query,[id,name,salary], (err,rows,fields) => {
             if(!err){
                 res.json({Status:'EMpleado guardado'})
             }else{
                 console.log(err);
             }
         });
     });

aqui podemos observar primero que todo la utilización de las rutas que nos permitira especificar que metodo queremos realizar, otra observación importante es la parte del query, que es la linea de comando que sera mandada a la base de datos mediante el mysqlConnection, ya mediante el condicional if verificamos si hubo errores. En el caso de no haber errores se mostrarte que el proceso fue exitoso mediante un JSON de lo contrario se mostrara el error en la consola. Se utiliza un request de tipo POST.

**DELETE**:

     router.delete('/:id',(req,res)=>{
         const {id} = req.params;
         mysqlConnection.query('DELETE FROM employees WHERE id = ?',[id], (err, rows,fields) => {
             if(!err){
                 res.json({status: 'Empleado eliminado'});
             }else{
                 console.log(err);
             }
         });
     });


Para hacer el metodo delete, lo que hicimos fue que el numero que se pusiera en el route se utilizaria en el query, es decir si se queria borrar un empleado con el id 1 se tenia que pasar en la ruta /1. Si el proceso marcha bien se mostrara un mensaje mediante JSON informando de que el empleado fue borrado, de lo contrario en consola se mostrara el error. Se utiliza el request tipo DELETE.

**EDIT**:

     router.put('/:id',(req,res) =>{
         const {name,salary} = req.body;
         const {id} = req.params;
         const query = 'CALL employeesAddOrEdit(?,?,?)';
         mysqlConnection.query(query,[id,name,salary], (err,rows,fields) => {
             if(!err){
                 res.json({status: 'Empleado actualizado'})
             }else{
                 console.log(err);
             }
         })
     });


En el edit el usuario tendra que hacer dos cosas, primero pasar el id del empleado que desea modificar en la ruta y segundo mandar un body de tipo JSON con los cambios que desea hacerle al empleado. Si el metodo no presenta errores se emitira un mensaje tipo JSON confirmandole que el empleado fue modificado de lo contrario se mostrara el error en la consola. Se utiliza un petición de tipo PUT.

**SELECT**

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

En este caso el usuario tiene que pasar el id del empleado que desea consultar medinate la ruta, si el metodo es exitoso se desplagara un JSON con toda la información del empleado de lo contrario se mostrara el error en la consola.

###Dockerfile

    FROM node:14
    COPY ["package.json","package-lock.json","/usr/src/"]
    WORKDIR /usr/src
    RUN npm install
    COPY [".","/usr/src"]
    EXPOSE 3000
    CMD ["node","src/index.js"]
    COPY wait.sh /wait.sh
    RUN chmod +x /wait.sh

Lo primero que hacemos es traer la imagen sobre la cual vamos a trabajar que es la node version 14, en el copy pasamos todos los archivos al directorio /usr/src/ del container, despues de eso nos paramos sobre el directorio /usr/src que es en el directorio en el que vamos a trabajar, traemos la dependencia npm, exponemos el puerto 3000 y finalmente arrancamos la aplicación.

###docker-compose

    version: "3.9"
    
    services:
      mysql_server_test:
        image: mysql:8.0
        environment: 
          - MYSQL_DATABASE=company
          - MYSQL_ROOT_PASSWORD=password
        mem_limit: 500M
        cpus: 1.0
        scale: 2
        volumes: 
           - ./database:/docker-entrypoint-initdb.d/
        ports:
          - "3306-3308:3306"
        restart: always
        networks:
          - fullstack
        command: --default-authentication-plugin=mysql_native_password
        
      app_test: 
        image: sereme98/parcial2distribuidos:0.0.1
        ports: 
          - 3000-3002:3000
        scale: 2
        depends_on: 
          - mysql_server_test
        networks:
          - fullstack
        environment:
          - DATABASE_HOST=mysql_server_test
        mem_limit: 500M
        cpus: 1.0
        restart: on-failure
        
    networks:
      fullstack:
        driver: bridge
    volumes:
      dbdata:
    

Lo mas importante de la parte del mysql_server_test es como mediante del mem_limit y el cpus limitamos la cantidad de recursos que son asignados, mediante scale desplegamos el numero de contenedores que deseamos es muy imortante que al momento de hacer scale tengamos en cuenta que debemos poner un rango de puertos, ya que si no lo hacemos nos arrojara error ya que los dos contenedores intentaran alojarse en un mismo puerto, la parte de la app es muy parecida. Tambien creamos una network para lograr que los dos contenedores se pudieran comunicar.
