const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()

mongoose.connect(process.env.DB_URL, 
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true 
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'))

app.use(express.json())

app.use((req, res, next) => {
    res.json({ message: 'Votre requête a bien été reçue !'})
    next()
})

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})

app.post('/api/crud', (req, res, next) => {
    console.log(req.body)
    res.status(201).json({ message: 'Objey créé ! '})
})

module.exports = app
