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
import { errorHandler } from "@/utils/error-handler";
import {
  createBlogSchemaClient,
  createBlogSchemaClientType,
} from "@/server/validations/blogs.validation";
import { FileUploadProgress } from "./file-upload-progress";
import { createBlog } from "@/apis/client/blogs";

export const CreateBlogForm: React.FC = () => {
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [progress, setProgress] = React.useState<number>(0);
  const [abortController, setAbortController] =
    React.useState<AbortController>();
  const createBlogForm = useForm<createBlogSchemaClientType>({
    mode: "all",
    resolver: zodResolver(createBlogSchemaClient),
  });

  const { push } = useRouter();

  const onSubmit = async (data: createBlogSchemaClientType) => {
    setIsPending(() => true);
    try {
      const formData = new FormData();
      formData.set("text", data.text);
      formData.set("title", data.title);
      formData.set("hide", data.hide);
      formData.set("thumbnail", data.thumbnail);
      formData.set("description", data.description);
      const controller = new AbortController();
      setAbortController(controller);
      await createBlog({
        data: formData,
        signal: controller.signal,
        progressCb: (newProgress) =>
          setProgress(Number(newProgress || 0) * 100),
      });
      toast.success("Created");
      // push("/");
    } catch (e) {
      errorHandler(e as AxiosError);
    }
    setIsPending(() => false);
  };

  const onCancel = () => {
    if (!abortController) return;
    abortController.abort();
    setProgress(0);
  };

  return (
    <form
      onSubmit={createBlogForm.handleSubmit(onSubmit)}
      className="space-y-4 mt-8"
    >
      <Thumbnail name="thumbnail" control={createBlogForm.control} />
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
        disabled={isPending}
        className={classNames(
          "py-2 px-1 w-full bg-slate-800 hover:bg-slate-700 disabled:bg-slate-500",
          "text-white text-sm rounded-md font-semibold"
        )}
      >
        Submit
      </button>
      {isPending && (
        <FileUploadProgress progressPercentage={progress} cancel={onCancel} />
      )}
    </form>
  );
};
