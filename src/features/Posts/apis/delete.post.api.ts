import axios from "axios";

export async function deletePost(postId:string) {
   const token = localStorage.getItem('tkn');
    const {data} =  await axios.delete(`${import.meta.env.VITE_BASE_URL}/posts/${postId}`,
        {
            headers:{
                "AUTHORIZATION" :`Bearer ${token}`
            }
        }
    )
    return data
}