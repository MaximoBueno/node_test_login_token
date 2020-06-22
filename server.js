require('dotenv').config()

const express = require('express')

const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())

const posts = [
    {
        username: "Max",
        title: "Post 1"

    },
    {
        username: "G",
        title: "Post 2"

    }
]


app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))
})

//
//node
//require('crypto').randomBytes(64).toString('hex')
app.post('/login', (req, res) => {
    //METHOD OF SERVER_LOGIN bcrypt and other function

    const username = req.body.username
    const user = {name: username}

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken: accessToken})

})

function authenticateToken(req, res, next){
    //Bearer TOKEN
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })

}

app.listen(9500)