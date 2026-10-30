import axios from "axios";

export async function updatePost({ postId, formData }: { postId: string; formData: FormData }) {
  const token = localStorage.getItem("tkn");
  const { data } = await axios.put(`${import.meta.env.VITE_BASE_URL}/posts/${postId}`, formData, {
    headers: { AUTHORIZATION: `Bearer ${token}` },
  });
  return data;
}
