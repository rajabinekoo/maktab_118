"use client";

import React from "react";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";

import { errorHandler } from "@/utils/error-handler";
import { useRemoveBlog } from "@/apis/mutations/auth";

export const RemoveBlog: React.FC = () => {
  const { id } = useParams();
  const { push } = useRouter();
  const remove = useRemoveBlog();

  const onClick = async () => {
    if (!id) return;
    try {
      await remove.mutateAsync(id as string);
      toast.success("Removed");
      push("/");
    } catch (e) {
      errorHandler(e as AxiosError);
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={remove.isPending}
      className="px-2 py-1 rounded-lg bg-red-500 text-white"
    >
      Remove
    </button>
  );
};
