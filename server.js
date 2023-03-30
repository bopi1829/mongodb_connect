const http = require('http')

const server = http.createServer((req, res) => {
    res.send('La réponse du serveur !')
})

server.listen(process.env.PORT || 3000)
