import { getSinglePostComment } from "./apis/comment.api";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CommentInterface } from "./interfaces/comment.interface";
import { timeAgo } from "../../utilites/timeAgo";
import { useContext, useState } from "react";
import { authContext } from "../../context/auth.context";
import { deleteComment, updateComment } from "./apis/updateComment.api";

export default function Comments({ id }: { id: string }) {
  const { data, isError, isLoading } = useQuery({ queryKey: ["comments", id], queryFn: () => getSinglePostComment(id), refetchOnMount: false });
  if (isError) return <p className="text-red-500">Could not load comments.</p>;
  if (isLoading) return <Loading />;
  return <div>{data?.data?.comments.map((comment: CommentInterface) => <CommentItem comment={comment} key={comment._id} />)}</div>;
}

function CommentItem({ comment }: { comment: CommentInterface }) {
  const context = useContext(authContext);
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(comment.content);
  const query = useQueryClient();
  const refresh = () => {
    query.invalidateQueries({ queryKey: ["comments", comment.post] });
    query.invalidateQueries({ queryKey: ["posts"] });
    query.invalidateQueries({ queryKey: ["post", comment.post] });
  };
  const save = useMutation({ mutationFn: updateComment, onSuccess: () => { refresh(); setEditing(false); toast.success("Comment updated"); }, onError: () => toast.error("Could not update comment") });
  const remove = useMutation({ mutationFn: deleteComment, onSuccess: () => { refresh(); toast.success("Comment deleted"); }, onError: (error: any) => toast.error(error?.response?.data?.message ?? "Could not delete comment") });
  const isOwner = context?.user?._id === comment.commentCreator._id;

  return <div className="bg-gray-800 p-4 rounded-lg shadow my-5">
    <div className="flex items-center mb-2">
      <img src={comment.commentCreator.photo} alt="User Avatar" className="w-10 h-10 rounded-full mr-3" />
      <div><h3 className="font-semibold text-white">{comment.commentCreator.name}</h3><p className="text-sm text-gray-400">Posted {timeAgo(comment.createdAt)} ago</p></div>
      {isOwner && <div className="ml-auto flex gap-3 text-sm">
        <button className="text-blue-300 hover:text-blue-100" onClick={() => { setContent(comment.content); setEditing((value) => !value); }}>Edit</button>
        <button className="text-red-300 hover:text-red-100" disabled={remove.isPending} onClick={() => remove.mutate({ postId: comment.post, commentId: comment._id })}>{remove.isPending ? "Deleting…" : "Delete"}</button>
      </div>}
    </div>
    {editing ? <div className="space-y-2">
      <textarea className="w-full rounded bg-gray-700 p-2 text-white" value={content} onChange={(event) => setContent(event.target.value)} maxLength={2000} rows={3} />
      <div className="flex justify-end gap-3"><button className="text-gray-300" onClick={() => setEditing(false)}>Cancel</button><button disabled={!content.trim() || save.isPending} className="text-blue-300 disabled:opacity-50" onClick={() => save.mutate({ postId: comment.post, commentId: comment._id, content: content.trim() })}>{save.isPending ? "Saving…" : "Save"}</button></div>
    </div> : <p className="text-white">{comment.content}</p>}
    <div className="flex items-center mt-2"><span className="text-gray-300 mr-3">{comment.likes.length} Likes</span><span className="text-gray-300">{comment.repliesCount} Replies</span></div>
  </div>;
}
