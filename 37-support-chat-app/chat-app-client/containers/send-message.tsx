"use client";

import React from "react";

import { Input } from "@/components/input";
import { SocketContext } from "@/providers/socket.provider";

export const SendMessage: React.FC = () => {
  const [message, setMessage] = React.useState<string>("");
  const { socket } = React.useContext(SocketContext);

  const onChangeMessage: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setMessage(event.target.value);
  };

  const onSubmit = async () => {
    if (!message?.trim?.() || !socket) return;
    socket.emit("newMessage", message);
  };

  return (
    <div className="space-y-5 w-full">
      <Input
        onChange={onChangeMessage}
        value={message}
        placeholder="your message"
        label="Content"
      />
      <button
        onClick={onSubmit}
        className="bg-slate-900 rounded-lg text-white w-full py-1"
      >
        <span className="text-sm font-semibold">Send</span>
      </button>
    </div>
  );
};
