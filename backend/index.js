const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
require('dotenv').config();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true
}).then(() => { console.log("Conexion a la base de datos exitosa")})

app.use('/api/category', require('./routes/category'));
app.use('/api/instrument', require('./routes/instrument'));

const port = process.env.PORT;

app.listen(port, () =>{
    console.log(`El servidor esta siendo ejecutado en el puerto ${port}`);
})