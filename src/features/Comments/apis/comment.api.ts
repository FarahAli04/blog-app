import axios from "axios";

export async function getSinglePostComment(postId:string) {
   const token = localStorage.getItem('tkn');
    const {data} =  await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/${postId}/comments?page1&limit=10`,
        {
            headers:{
                "AUTHORIZATION" :`Bearer ${token}`
            }
        }
    )
    return data
}