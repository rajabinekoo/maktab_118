"use client";

import React from "react";
import { io, Socket } from "socket.io-client";
import { getToken } from "@/utils/token-management";
import { toast } from "react-toastify";

const serverUrl = process.env.NEXT_PUBLIC_WEBSOCKET_SERVER_URL;

export const SocketContext = React.createContext<{
  socket?: Socket;
  resetSocket: () => void;
}>({
  socket: undefined,
  resetSocket: () => undefined,
});

export const SocketProvider: React.FC<IChildren> = ({ children }) => {
  const [socket, setSocket] = React.useState<Socket | undefined>();

  const resetSocket = () => {
    const token = getToken();
    if (!token) return;
    setSocket(
      io(serverUrl, {
        autoConnect: true,
        extraHeaders: { authorization: token },
      })
    );
  };

  React.useEffect(() => {
    if (!!socket) return;
    resetSocket();
  }, [socket]);

  React.useEffect(() => {
    if (!socket) return;
    socket.on("error", (err: { message: string }) => {
      toast.error(err.message);
    });
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, resetSocket }}>
      {children}
    </SocketContext.Provider>
  );
};
