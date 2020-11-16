const ctrlAuth = require('../controllers/authentication');
const ctrlProfile = require('../controllers/profile');
const express = require('express');
const jwt = require('express-jwt');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
//const Historial = mongoose.model('historial');
const auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});


// perfil
router.get('/profile', auth, ctrlProfile.profileRead);

// autenticacion
router.post('/register', ctrlAuth.register);
router.post('/login' , ctrlAuth.login);


//Historial
router.post('/historial/:quest/:user', (req, res) => {
  const  q = req.params.quest;
  const user = req.params.user;
  console.log("pasó por acá " + q);
  const hist = JSON.parse(q);
  
 User.updateOne({email: user},{ $push:{historial:hist}},function(err, res) {
    if (err) throw err;
    console.log("Historial Actualizado");
  });
});


module.exports = router;
