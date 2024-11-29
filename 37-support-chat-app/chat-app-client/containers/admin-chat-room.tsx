"use client";

import React from "react";
import { notFound, useParams } from "next/navigation";

import { Chat } from "@/components/chat";
import { SocketContext } from "@/providers/socket.provider";

export const AdminChatRoom: React.FC = () => {
  const { roomId } = useParams();
  const { socket, connected, resetSocket } = React.useContext(SocketContext);
  const [clientId, setClientId] = React.useState<string>("");
  const [chats, setChats] = React.useState<Array<IChatItem> | undefined>(
    undefined
  );

  const joinRoom = async (id: string) => {
    if (!socket) return;
    const response: IRoomChats = await socket.emitWithAck("joinByAdmin", id);
    setChats(response.list);
    setClientId(response.clientId);
  };

  React.useEffect(() => {
    if (!socket || !roomId) return;
    joinRoom(roomId as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, roomId]);

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

  if (!roomId) return notFound();

  return (
    <div className="w-full space-y-6">
      {(chats || []).map((el, index) => (
        <Chat key={index} {...el} mine={clientId === el.from} />
      ))}
    </div>
  );
};
