import { Server as NetServer } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import { Server as ServerIO } from "socket.io";

type NextApiResponseServerIo = NextApiResponse & {
  socket: {
    server: {
      io?: ServerIO;
    };
  };
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    console.log("Initializing Socket.io");
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: "/api/socket/io",
      addTrailingSlash: false,
    });

    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("A user connected:", socket.id);
      io.emit("firstEvent", "hello how are you");
      io.emit("Another", "hello again");
      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });
  } else {
    console.log("Socket.io already running");
  }
  res.end();
};

export default ioHandler;

export const emitSaleNotification = (io: ServerIO, saleData: any) => {
  io.emit("new_sale", saleData);
};

export const emitLowStockNotification = (io: ServerIO, stockData: any) => {
  io.emit("low_stock", stockData);
};
