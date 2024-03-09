const express = require('express');
const {MongoClient} = require('mongodb');
const UserRepository = require('./user-repository');
const bodyParser = require('body-parser');
const {ObjectId} = require('bson');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(
    cors({
      allowedHeaders: ['X-Total-Count', 'Content-type'],
      exposedHeaders: ['X-Total-Count', 'Content-type'],
    }),
);

let userRepository;
let client;
let connected = false;

app.use(async (req, res, next) => {
  if (!connected) {
    const uri = 'mongodb://127.0.0.1:27017/workshop_mongo';
    client = new MongoClient(uri);
    await client.connect();
    const collection = client.db('workshop_mongo').collection('user');
    userRepository = new UserRepository(collection);
    connected = true;
  }

  next();
});

app.get('/users', async (req, res) => {
  const users = await userRepository.findAll();
  res.setHeader('X-Total-Count', users.length);
  res.status(200).json(users);
});

app.post('/users', async (req, res) => {
  const user = await userRepository.insert(req.body);
  res.status(201).json(user);
});

app.get('/users/:id', async (req, res) => {
  try {
    const user = await userRepository.findOneById(ObjectId(req.params.id));
    res.json(user);
  } catch (e) {
    res.status(404).json({
      message: 'User not found',
      code: 404,
    });
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const user = await userRepository.update(
        ObjectId(req.params.id),
        req.body,
    ); // linha 46
    res.json(user);
  } catch (e) {
    res.status(404).json({
      message: 'User not found',
      code: 404,
    });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    await userRepository.delete(ObjectId(req.params.id)); // linha 70
    res.status(200).json(req.body);
  } catch (e) {
    console.log(e.message);
    res.status(404).json({
      message: 'User not found',
      code: 404,
    });
  }
});

module.exports = app;
