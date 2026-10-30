import axios from "axios";

export async function getSinglePost(postId:string) {
   const token = localStorage.getItem('tkn');
    const {data} =  await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/${postId}`,
        {
            headers:{
                "AUTHORIZATION" :`Bearer ${token}`
            }
        }
    )
    return data
}