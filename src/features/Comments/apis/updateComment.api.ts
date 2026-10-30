import axios from "axios";

export async function updateComment({ postId, commentId, content }: { postId: string; commentId: string; content: string }) {
  const token = localStorage.getItem("tkn");
  const { data } = await axios.put(`${import.meta.env.VITE_BASE_URL}/posts/${postId}/comments/${commentId}`, { content }, {
    headers: { AUTHORIZATION: `Bearer ${token}` },
  });
  return data;
}

export async function deleteComment({ postId, commentId }: { postId: string; commentId: string }) {
  const token = localStorage.getItem("tkn");
  const { data } = await axios.delete(`${import.meta.env.VITE_BASE_URL}/posts/${postId}/comments/${commentId}`, {
    headers: { AUTHORIZATION: `Bearer ${token}` },
  });
  return data;
}
