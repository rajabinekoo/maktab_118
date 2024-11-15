"use client";

import React from "react";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { Input } from "./input";
import { Textarea } from "./textarea";
import { Switch } from "./switch-input";
import { Thumbnail } from "./thumbnail";
import { classNames } from "@/utils/classname";
import { useCreateBlog } from "@/apis/mutations/auth";
import { errorHandler } from "@/utils/error-handler";
import {
  createBlogSchema,
  createBlogSchemaType,
} from "@/server/validations/blogs.validation";

export const CreateBlogForm: React.FC = () => {
  const createBlogForm = useForm<createBlogSchemaType>({
    resolver: zodResolver(createBlogSchema),
  });

  const create = useCreateBlog()
  const { push } = useRouter();

  const onSubmit = (data: createBlogSchemaType) => {
    try {
      console.log(data);
      toast.success("Created");
      push("/");
    } catch (e) {
      errorHandler(e as AxiosError);
    }
  };

  return (
    <form
      onSubmit={createBlogForm.handleSubmit(onSubmit)}
      className="space-y-4 mt-8"
    >
      <Thumbnail />
      <Controller
        name="title"
        control={createBlogForm.control}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            error={error?.message}
            label="title"
            placeholder="title"
          />
        )}
      />
      <Controller
        name="description"
        control={createBlogForm.control}
        render={({ field, fieldState: { error } }) => (
          <Textarea
            {...field}
            error={error?.message}
            label="description"
            placeholder="description"
          />
        )}
      />
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-500 font-semibold">Hide</p>
          <p className="text-xs text-slate-400 font-semibold">
            You can hide this blog
          </p>
        </div>
        <Switch control={createBlogForm.control} name="hide" />
      </div>
      <Controller
        name="text"
        control={createBlogForm.control}
        render={({ field, fieldState: { error } }) => (
          <Textarea
            {...field}
            error={error?.message}
            label="text"
            placeholder="text"
          />
        )}
      />
      <button
        type="submit"
        className={classNames(
          "py-2 px-1 w-full bg-slate-800 hover:bg-slate-700",
          "text-white text-sm rounded-md font-semibold"
        )}
      >
        Submit
      </button>
    </form>
  );
};
