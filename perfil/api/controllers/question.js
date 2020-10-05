const mongoose = require('mongoose');
const Question = mongoose.model('Question');
module.exports.question = (req, res) =>{
    Question.find().exec(function(err,questions){
        if(err){
            console.log('no funciona'); 
        }else{
            res.json(questions);
        }
    })
}