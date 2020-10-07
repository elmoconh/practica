const { Router } = require('express');
const router = Router();


const Question = require('../models/Questions');




router.get('/question/:id', (req,res)=>{
  const ID = req.params.id;
    console.log('1 ' + req.params.id);
    console.log('2 ' + ID);

  Question.findOne({ID}).exec(function(err,questions){
        if(err){
            console.log('no funciona'); 
        }else{
            console.log(questions);
            res.json(questions);
        }
    })
});


module.exports = router;
