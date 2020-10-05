require('./users');
require('./Questions');
const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost:27017/practica';

mongoose.set('useCreateIndex', true);
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(db => console.log('Base de datos Conectada'))
    .catch(err => console.log(err));;

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connection error: ${err}`);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});
