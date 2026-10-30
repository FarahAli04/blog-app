import axios from "axios";

export async function changePassword(payload: { password: string; newPassword: string }) {
  const token = localStorage.getItem("tkn");
  const { data } = await axios.patch(`${import.meta.env.VITE_BASE_URL}/users/change-password`, payload, {
    headers: { AUTHORIZATION: `Bearer ${token}` },
  });
  return data;
}
