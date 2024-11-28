"use client";

import React from "react";
import { io, Socket } from "socket.io-client";
import { getToken } from "@/utils/token-management";

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

  const resetSocket = () => setSocket(undefined);

  React.useEffect(() => {
    if (!!socket) return;
    const token = getToken();
    if (!token) return;
    setSocket(
      io(serverUrl, {
        autoConnect: true,
        extraHeaders: { authorization: token },
      })
    );
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, resetSocket }}>
      {children}
    </SocketContext.Provider>
  );
};
