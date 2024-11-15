/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import React from "react";

export const Thumbnail: React.FC = () => {
  const [url, setUrl] = React.useState<string>();
  const inputRef = React.useRef();

  const onClick = () => {
    (inputRef.current as any)?.click();
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUrl(URL.createObjectURL(file));
  };

  return (
    <div>
      <label className="text-slate-500 text-xs capitalize font-semibold">
        Thumbnail
      </label>
      <div
        onClick={onClick}
        className="relative mt-2 border border-slate-300 rounded-md flex items-center justify-center h-52 hover:bg-slate-50 cursor-pointer"
      >
        {!!url && (
          <Image
            src={url}
            fill={true}
            alt={"thumbnail"}
            className="object-cover object-center rounded-md"
          />
        )}
        <input
          onChange={onChange}
          ref={inputRef as any}
          type="file"
          className="hidden"
        />
        <p className="text-slate-500 text-xs font-medium">
          Select your thumbnail
        </p>
      </div>
    </div>
  );
};
