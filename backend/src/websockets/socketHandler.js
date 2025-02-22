export const setupSocket = (io) => {
    io.on("connection", (socket) => {
      console.log(`Usuario conectado: ${socket.id}`);
  
      socket.on("joinRoom", (userId) => {
        socket.join(userId);
        console.log(`Usuario ${userId} se unió a su sala`);
      });
  
      socket.on("disconnect", () => {
        console.log(`Usuario desconectado: ${socket.id}`);
      });
    });
  };
  