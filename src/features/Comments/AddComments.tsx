import { TextInput } from "flowbite-react";
import type { Post } from "../../interfaces/post.interface";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment } from "./apis/addComment.api";
import { IoMdCloseCircle } from "react-icons/io";

export default function AddComments({ posts }: { posts: Post }) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", posts._id] });
      resetForm();
    },
  });

  function handleContent(e: React.ChangeEvent<HTMLInputElement>) {
    setContent(e.target.value);
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

  function resetForm() {
    setContent("");
    removeImage();
  }

  function handleComment() {
    if (!content.trim() && !image) return;

    const formData = new FormData();
    formData.append("content", content);
    if (image) formData.append("image", image);

    mutate({ formData, postId: posts._id });
  }

  return (
    <div className="px-4 pb-4 border-t insta-border mt-2 pt-3">
      <div className="flex flex-1 items-center space-x-3">
        <img
          className="w-7 h-7 rounded-full object-cover"
          src={posts.user.photo}
          alt="Your Avatar"
        />

        <TextInput
          type="text"
          placeholder="add comment..."
          className="w-full"
          value={content}
          onChange={handleContent}
        />

        <div className="icons flex text-gray-500 m-2">
          <label htmlFor={posts._id}>
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
            id={posts._id}
            className="hidden"
            onChange={handleImage}
          />
        </div>

        <button
          onClick={handleComment}
          disabled={isPending}
          className="text-sm font-semibold text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 cursor-pointer disabled:opacity-50"
        >
          {isPending ? "Adding..." : "Add Comment"}
        </button>
      </div>

      {imgPreview && (
        <div className="text-center my-2 relative">
          <img
            src={imgPreview}
            className="w-full h-62.5 mx-auto rounded-2xl object-cover"
            alt="Comment attachment preview"
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
    </div>
  );
}