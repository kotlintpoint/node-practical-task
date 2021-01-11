const path = require('path')
const express = require('express')
const hbs = require('hbs')
const http=require('http')
const Filter = require('bad-words')
const socketio = require('socket.io')
require('./db/mongoose')
const userRouter = require('./routers/user')
const {generateMessage, generateLocationMessage} = require('./utils/messages')
const {addUser, getUser, removeUser, getUsersInRoom} =require('./utils/users')
const { deal } = require('./utils/cards')

const app = express()
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.use(express.json())
app.use(userRouter)

const server = http.createServer(app)
const io = socketio(server)

io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.on('generateRoom',(callback)=>{
        
    })

    socket.on('join', (options, callback) => {
        const { error, user } = addUser({ id: socket.id, ...options })

        if (error) {
            return callback(error)
        }

        socket.join(user.room)

        socket.emit('message', generateMessage('Admin', 'Welcome!'))
        socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.username} has joined!`))
        const users=getUsersInRoom(user.room)
        io.to(user.room).emit('roomData', {
            room: user.room,
            users
        })
        // Distribute Cards
        if(users.length===2){
            deal(users,10)
            
            const otherUser=users.find(tempUser=> tempUser.id!==socket.id)
            socket.broadcast.to(user.room).emit('cardDistribute',otherUser)
            socket.emit('cardDistribute', user)
        }
        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        const filter = new Filter()

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }

        io.to(user.room).emit('message', generateMessage(user.username, message))
        callback()
    })

    socket.on('sendLocation', (coords, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('message', generateMessage('Admin', `${user.username} has left!`))
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }
    })
})


module.exports = server