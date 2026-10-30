import axios from "axios";

export async function updateComment({ commentId, content }: { commentId: string; content: string }) {
  const token = localStorage.getItem("tkn");
  const { data } = await axios.put(`${import.meta.env.VITE_BASE_URL}/comments/${commentId}`, { content }, {
    headers: { AUTHORIZATION: `Bearer ${token}` },
  });
  return data;
}

export async function deleteComment(commentId: string) {
  const token = localStorage.getItem("tkn");
  const { data } = await axios.delete(`${import.meta.env.VITE_BASE_URL}/comments/${commentId}`, {
    headers: { AUTHORIZATION: `Bearer ${token}` },
  });
  return data;
}
