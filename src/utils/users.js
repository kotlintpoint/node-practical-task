const users = []
const rooms= [] 

const addUser = ({ id, username }) => {
    // Clean the data
    username = username.trim().toLowerCase()
    //room = room.trim().toLowerCase()

    // Check Room with less than 2 users.... Create Room dynamically
    const roomList=rooms.filter(room=>{
        const userList=users.filter(user=>user.room===room)
        return userList.length < 2
    })
    console.log(`RoomList - ${roomList}`)
    room=roomList.length > 0 ? roomList[0] : `room-${rooms.length}`
    

    // Validate the data
    if (!username || !room) {
        return {
            error: 'Username and room are required!'
        }
    }

    // Check for existing user
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })

    // Validate username
    if (existingUser) {
        return {
            error: 'Username is in use!'
        }
    }

    // Store user
    const user = { id, username, room, hand:[] }
    users.push(user)
    if(roomList.length === 0){
        rooms.push(room)
    }
    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => {
    return users.find((user) => user.id === id)
}

const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase()
    return users.filter((user) => user.room === room)
}

Array.prototype.countRoom = function(value) {
    return this.reduce(function (count, object) {
        if(value===object.room) count += 1
      return count;
    });
  };

const getRoomName=()=>{

    const rooms=users.map(u => u.room)

    // Check for existing user
    const result = rooms.filter(room=>{
        return users.countRoom(room) < 2
    })

    console.log(result)
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}
