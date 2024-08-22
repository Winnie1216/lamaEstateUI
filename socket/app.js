import { Server } from "socket.io";

const io = new Server({
    cors: {
        origin: "http://localhost:5173",
    },
});

let onlineUser = [];

const addUser = (userId, socketId) => {
    // Check if user is already online
    const userExists = onlineUser.find((user) => user.userId === userId);
    if (!userExists) {
        onlineUser.push({ userId, socketId });
    }
};

const removeUser = (socketId) => {
    // Remove user from the onlineUser list by socketId
    onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    // Find user by userId
    return onlineUser.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
    console.log("A user connected");

    // Add new user
    socket.on("newUser", (userId) => {
        addUser(userId, socket.id);
    });

    // Handle sending message
    socket.on("sendMessage", ({ receiverId, data }) => {
        const receiver = getUser(receiverId);
        if (receiver) {
            io.to(receiver.socketId).emit("getMessage", data);
        } else {
            console.error("Receiver not found or not online");
        }
    });

    // Remove user on disconnect
    socket.on("disconnect", () => {
        console.log("User disconnected");
        removeUser(socket.id);
    });
});

io.listen(4000);
