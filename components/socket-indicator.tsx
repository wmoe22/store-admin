"use client";

import { useSocket } from "@/lib/providers/socket-provider";
import { Badge } from "./ui/badge";

const SocketIndicator = () => {
  const { isConnected } = useSocket();
  if (!isConnected) {
    return (
      <Badge variant={"low"} className="">
        Fallback: Polling every 1s
      </Badge>
    );
  }
  return (
    <Badge variant={"green"} className="flex items-center w-full">
      Live
    </Badge>
  );
};

export default SocketIndicator;
