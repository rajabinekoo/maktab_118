"use client";

import React from "react";

import { Chat } from "@/components/chat";
import { SocketContext } from "@/providers/socket.provider";
import { SendMessage } from "./send-message";

export const ChatRoom: React.FC = () => {
  const { socket, connected, resetSocket } = React.useContext(SocketContext);
  const [clientId, setClientId] = React.useState<string>("");
  const [chats, setChats] = React.useState<Array<IChatItem> | undefined>(
    undefined
  );

  const join = async () => {
    if (!socket) return;
    const response: IJoinResDto = await socket.emitWithAck("join", "");
    setChats(response.chats);
    setClientId(response.clientId);
  };

  React.useEffect(() => {
    if (!socket) return;
    join();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  React.useEffect(() => {
    if (!socket || !connected) return;
    socket.on("receiveMessage", (data) => {
      try {
        const chat: IChatItem = JSON.parse(data);
        setChats((prev) => [...(prev || []), chat]);
      } catch {}
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, connected]);

  React.useEffect(() => {
    resetSocket();
  }, []);

  return (
    <div className="space-y-7">
      <p className="text-center font-semibold">Chat</p>
      <div className="w-full space-y-6">
        {(chats || []).map((el, index) => (
          <Chat key={index} {...el} mine={clientId === el.from} />
        ))}
      </div>
      <SendMessage />
    </div>
  );
};
