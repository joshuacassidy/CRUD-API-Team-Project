const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());

const GameName = require('./models/gamename');
const keys = require('./config/keys');
mongoose.connect(keys.mongoURI);
const db = mongoose.connection;

app.get('/api/gamenames/:id', (req, res) => {
	GameName.getGameNames(req.params.id,(err, gameNames) => {
		if(err){
			throw err;
		}
		res.json(gameNames);
	});
});

app.get('/api/gamenames/:id/:_id', (req, res) => {
	GameName.getGameNameById(req.params._id, (err, gamename) => {
		if(err){
			throw err;
		}
		res.json(gamename);
	});
});

app.post('/api/gamenames/:id', (req, res) => {
    const gamename = req.body;
    gamename.userId = req.params.id
	GameName.addGameName(gamename, (err, gamename) => {
		if(err){
			throw err;
		}
		res.json(gamename);
	});
});

app.put('/api/gamenames/:id/:_id', (req, res) => {
	const id = req.params._id;
	const gamename = req.body.name;
	GameName.updateGameName(id, gamename, (err, gamename) => {
		if(err){
			throw err;
		}
		res.json(gamename);
	});
});

app.delete('/api/gamenames/:id/:_id', (req, res) => {
	const id = req.params._id;
	GameName.removeGameName(id, (err, gamename) => {
		if(err){
			throw err;
		}
		res.json(gamename);
	});
});

app.listen(process.env.PORT||3000);
console.log('Hosted on Local host 3000');
