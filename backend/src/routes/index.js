const { Router } = require('express');
const router = Router();

const User = require('../models/User');
const Question = require('../models/Questions');

const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    res.send('hello')
});

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const newUser = new User({email, password});
    await newUser.save();
		const token = await jwt.sign({_id: newUser._id}, 'secretkey');
    res.status(200).json({token});
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email});
    if (!user) return res.status(401).send('The email doen\' exists');
    if (user.password !== password) return res.status(401).send('Wrong Password');

		const token = jwt.sign({_id: user._id}, 'secretkey');

    return res.status(200).json({token});
});

router.get('/questions', (req,res)=>{
    Question.find({}).exec(function(err,questions){
        if(err){
            console.log('no funciona'); 
        }else{
            res.json(questions);
        }
    })
});

router.get('/private-tasks', verifyToken, (req, res) => {
    res.json([
        {
            _id: '1',
            name: "pregunta uno",
            description: '1 + 2',
            date: "2020-11-06T15:50:18.921Z"
        },
        {
            _id: '2',
            name: "pregunta dos",
            description: '1 + 3',
            date: "2020-11-06T15:50:18.921Z"
        },
        {
            _id: '3',
            name: "pregunta tres",
            description: '1 + 4',
            date: "2020-11-06T15:50:18.921Z"
        },
    ])
});

async function verifyToken(req, res, next) {
	try {
		if (!req.headers.authorization) {
			return res.status(401).send('No autorizado');
		}
		let token = req.headers.authorization.split(' ')[1];
		if (token === 'null') {
			return res.status(401).send('No autorizado');
		}

		const payload = await jwt.verify(token, 'secretkey');
		if (!payload) {
			return res.status(401).send('No autorizado');
		}
		req.userId = payload._id;
		next();
	} catch(e) {
		//console.log(e)
		return res.status(401).send('No autorizado');
	}
}

module.exports = router;
