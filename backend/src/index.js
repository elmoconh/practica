const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express().use(bodyParser.json());

require('./database');

// settings
app.set('port', process.env.PORT || 4000)

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use('/api', require('./routes/index'));

app.listen(app.get('port'));
console.log('Servidor corriendo en puerto ', app.get('port'));
