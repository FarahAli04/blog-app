import axios from "axios";

export async function addComment({formData,postId}:{formData:FormData,postId:string}) {
   const token = localStorage.getItem('tkn');
    const {data} =  await axios.post(`${import.meta.env.VITE_BASE_URL}/posts/${postId}/comments`,formData,
        {
            headers:{
                "AUTHORIZATION" :`Bearer ${token}`
            }
        }
    )
    return data
}