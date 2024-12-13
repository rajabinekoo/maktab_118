"use client";

import axios from "axios";
import React from "react";

export const ChatList: React.FC = () => {
  const [inpValue, setInpValue] = React.useState<string>("");
  const [response, setResponse] = React.useState<string>("");

  async function prompt() {
    try {
      const response = await axios.post("/apis/llm", { prompt: inpValue });
      setResponse(response.data.html);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="w-screen min-h-screen bg-slate-100">
      <input
        type="text"
        value={inpValue}
        onChange={(e) => setInpValue(e.target.value)}
      />
      <button onClick={prompt}>Send</button>
      <div dangerouslySetInnerHTML={{ __html: response }}></div>
    </div>
  );
};
