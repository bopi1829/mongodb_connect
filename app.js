// Imports
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const User = require('./models/user')
const { error } = require('console')

// Utilisation express()
const app = express()
app.use(express.json())

// Pour éviter les problème de CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})

// Connexion à mongoDB avec la méthode mongoose
mongoose.connect(process.env.DB_URL, 
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true 
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'))

// Création d'un middleware
app.use((req, res, next) => {
    res.json({ message: 'Votre requête a bien été reçue !'})
    next()
})

// Création de la méthode POST du CRUD
app.post('/api/user', (req, res, next) => {
    delete req.body._id
    const user = new User({
        ...req.body
    })
    user.save()
    .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
    .catch(error => res.status(400).json({ error }))
})

app.use('/api/user', (req, res, next) => {
    
})

module.exports = app
