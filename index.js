const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config();

//Creando el servidor
const app = express();

//coneccion base de datos
dbConnection();

//directorio publico
app.use(express.static('public'));

//Cors
app.use(cors());

//Lectura y Parseo del Body
app.use(express.json());

//Rutas
app.use('/api/auth', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
