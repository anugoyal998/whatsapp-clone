import {Server} from 'socket.io';
const PORT = process.env.PORT || 9000
const io = new Server(PORT, {
    cors: {
        origin: 'http://localhost:3000'
    }
})

let users = []

const addUser = (userid,socketid) => {
    !users.some(user => user.userid === userid) && users.push({userid,socketid})
}

const getUser = (userid) =>{
    return users.find(user=> user.userid === userid)
}

const removeUser = (socketid) =>{
    return users.filter(user=> user.socketid !== socketid)
}

io.on('connection',(socket)=> {
    console.log('user connected')
    //connect
    socket.on('addUser',userid=> {
        addUser(userid, socket.id)
        io.emit('getUsers', users)
    })
    //send message
    socket.on('sendMessage',({senderid,recieverid, text})=> {
        const user = getUser(recieverid)
        console.log(text)
        user && io.to(user.socketid).emit('getMessage',{
            senderid, text
        })
    })
    //user disconnected
    socket.on('disconnect', () =>{
        console.log("User disconnected")
        removeUser(socket.id)
        io.emit('getUsers',users)
    })

    //video call
    socket.emit("me", socket.id)

    socket.on('disconnectCall', () =>{
        socket.broadcast.emit("callEnded")
    })

    socket.on("callUser", (data)=> {
        io.to(data.userToCall).emit("callUser", {signal: data.signalData, from: data.from, name: data.name})
    })

    socket.on("answerCall",(data)=> {
        io.to(data.to).emit("callAccepted", data.signal)
    })
    //video call
})