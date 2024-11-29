"use client";

import React from "react";
import { io, Socket } from "socket.io-client";
import { getToken } from "@/utils/token-management";
import { toast } from "react-toastify";

const serverUrl = process.env.NEXT_PUBLIC_WEBSOCKET_SERVER_URL;

export const SocketContext = React.createContext<{
  socket?: Socket;
  connected?: boolean;
  resetSocket: () => void;
}>({
  socket: undefined,
  connected: false,
  resetSocket: () => undefined,
});

export const SocketProvider: React.FC<IChildren> = ({ children }) => {
  const [socket, setSocket] = React.useState<Socket | undefined>();
  const [connected, setConnected] = React.useState<boolean>(false);

  const resetSocket = () => {
    const token = getToken();
    if (!token) return;
    setConnected(() => false);
    const s = io(serverUrl, {
      autoConnect: true,
      extraHeaders: { authorization: token },
    });
    s.on("connect", () => {
      setConnected(true);
    });
    s.on("error", (err: { message: string }) => {
      toast.error(err.message);
    });
    setSocket(s);
  };

  return (
    <SocketContext.Provider value={{ socket, resetSocket, connected }}>
      {children}
    </SocketContext.Provider>
  );
};
