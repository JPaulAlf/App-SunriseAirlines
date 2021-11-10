const express = require('express');
const conectarDB = require('./database');
const app = express();
const cors = require("cors");

//connect to DB 

conectarDB();

app.use(express.json());
app.use(cors());

app.use('/api/aeropuerto', require('./routes/aeropuerto'));
app.use('/api/avion', require('./routes/avion'));
app.use('/api/ruta', require('./routes/ruta'));
app.use('/api/usuario', require('./routes/usuario'));
app.use('/api/vuelo', require('./routes/vuelo'));
app.use('/api/reserva', require('./routes/reserva'));

app.listen(process.env.PORT || 4000,() => {


    console.log('The server is listening')

});