const express = require('express')
const { MongoClient } = require("mongodb");
const UserRepository = require('./user-repository')
const bodyParser = require('body-parser')
const { ObjectId } = require('bson')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(cors({
    allowedHeaders: ['X-Total-Count', 'Content-type'],
    exposedHeaders: ['X-Total-Count', 'Content-type'],
}))

let userRepository;
let client;
let connected = false

app.use(async (req, res, next) => {
    if (!connected) {
        const uri = 'mongodb://127.0.0.1:27017/workshop_mongo'
        client = new MongoClient(uri)
        await client.connect();
        const collection = client.db('workshop_mongo').collection('user');
        userRepository = new UserRepository(collection)
        connected = true
    }
    
    next()
})

app.get('/users', async (request, response) => {
    const users = await userRepository.findAll()
    response.setHeader('X-Total-Count', users.length)
    response.status(200).json(users)
})

app.post('/users', async (request, response) => {
    const user = await userRepository.insert(request.body)
    response.status(201).json(user);
})

app.get('/users/:id', async (request, response) => {
    try {
        const user = await userRepository.findOneById(ObjectId(request.params.id))
        response.json(user);
    } catch (e) {
        response.status(404).json({
            message: 'User not found',
            code: 404
        })
    }
})

app.put('/users/:id', async (request, response) => {
    try {
        const user = await userRepository.update(ObjectId(request.params.id), request.body)
        response.json(user);
    } catch (e) {
        response.status(404).json({
            message: 'User not found',
            code: 404
        })
    }
})

app.delete('/users/:id', async (request, response) => {
    try {
        await userRepository.delete(ObjectId(request.params.id))
        response.status(200).json(request.body)
    } catch (e) {
        console.log(e.message)
        response.status(404).json({
            message: 'User not found',
            code: 404
        })
    }
})

module.exports = app