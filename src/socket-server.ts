// import { Server } from "socket.io";
// const io = new Server(server, {
//   cors: { origin: "*" },
// });

// io.on("connection", (socket) => {
//   console.log("A user connected");

//   socket.on("sendMessage", (messageData) => {
//     // save to DB
//     io.to(messageData.recipientId).emit("receiveMessage", messageData);
//   });

//   socket.on("join", (userId) => {
//     socket.join(userId); // join room based on user ID
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });
// });
