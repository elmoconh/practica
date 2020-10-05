const ctrlAuth = require('../controllers/authentication');
const ctrlProfile = require('../controllers/profile');
const ctrlQuestion = require('../controllers/question');
const express = require('express');
const jwt = require('express-jwt');
const router = express.Router();

const qModel = require('../models/Questions');
const auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});


// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

router.get('/questions', (req,res)=>{
    qModel.find({}).exec(function(err,questions){
        if(err){
            console.log('no funciona'); 
        }else{
            res.json(questions);
        }
    })
});

module.exports = router;
