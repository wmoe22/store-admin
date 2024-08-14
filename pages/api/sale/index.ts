import { NextApiRequest, NextApiResponse } from "next";
import { emitSaleNotification } from "../socket/io";

const handleNewSale = async (req: NextApiRequest, res: NextApiResponse) => {
  const io = res.socket.server.io;
  const saleData = req.body; // Get sale data from request body

  // Save the sale data to your database...

  // Emit the notification
  emitSaleNotification(io, saleData);

  res.status(200).json({ message: "Sale recorded and notification sent." });
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    handleNewSale(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
