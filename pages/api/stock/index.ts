import { NextApiRequest, NextApiResponse } from "next";
import { emitLowStockNotification } from "../socket/io";

const handleLowStock = async (req: NextApiRequest, res: NextApiResponse) => {
  const io = res.socket.server.io;
  const stockData = req.body; // Get stock data from request body

  // Update stock data in your database...

  // Emit the notification
  emitLowStockNotification(io, stockData);

  res.status(200).json({ message: "Stock updated and notification sent." });
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    handleLowStock(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
