import { useRef, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddPost } from "./apis/add.post.api";

export default function CreatePost() {
  const [body, setBody] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: AddPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      handleCancel();
    },
  });

  function handleBody(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setBody(e.target.value);
  }

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (imgPreview) URL.revokeObjectURL(imgPreview);
    setImage(file);
    setImgPreview(URL.createObjectURL(file));
  }

  function removeImage() {
    if (imgPreview) URL.revokeObjectURL(imgPreview);
    setImage(null);
    setImgPreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleCancel() {
    setBody("");
    removeImage();
  }

  function handlePost() {
    if (!body.trim() && !image) return;

    const formData = new FormData();
    formData.append("body", body);
    if (image) formData.append("image", image);

    mutate(formData);
  }

  return (
    <div>
      <div className="heading text-center font-bold text-2xl m-5 text-gray-800">
        New Post
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: "\n  body {background:white !important;}\n",
        }}
      />
      <div className="editor mx-auto w-1/2 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg">
        <textarea
          onChange={handleBody}
          className="description bg-gray-100 sec p-3 h-30 border border-gray-300 outline-none"
          spellCheck="false"
          placeholder="Describe everything about this post here"
          value={body}
        />

        <div className="icons flex text-gray-500 m-2">
          <label htmlFor="inputFile">
            <svg
              className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            id="inputFile"
            className="hidden"
            onChange={handleImage}
          />
        </div>

        {imgPreview && (
          <div className="text-center my-2 relative">
            <img
              src={imgPreview}
              className="w-full h-62.5 mx-auto rounded-2xl object-cover"
              alt="Post attachment preview"
            />
            <button
              type="button"
              onClick={removeImage}
              aria-label="Remove image"
              className="absolute top-5 right-5"
            >
              <IoMdCloseCircle className="cursor-pointer" size={22} />
            </button>
          </div>
        )}

        <div className="buttons flex">
          <button
            type="button"
            className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            onClick={handlePost}
            disabled={isPending}
            className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500 disabled:opacity-50"
          >
            {isPending ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
}