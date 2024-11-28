"use client";

import React from "react";

import { RoomItem } from "@/components/room";
import { SocketContext } from "@/providers/socket.provider";

export const RoomsList: React.FC = () => {
  const { socket } = React.useContext(SocketContext);
  const [rooms, setRooms] = React.useState<IRoomItem[] | undefined>(undefined);

  const fetchRooms = async () => {
    if (!socket) return;
    const response: IFetchRoomsDto = await socket.emitWithAck("fetchRooms", "");
    setRooms(response.list);
  };

  React.useEffect(() => {
    if (!socket || !!rooms) return;
    fetchRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, rooms]);

  return (
    <div className="space-y-5 w-full">
      <p className="text-lg font-semibold text-center">Rooms</p>
      {(rooms || []).map((el, index) => (
        <RoomItem key={index} {...el} />
      ))}
    </div>
  );
};
