import axios from "axios";

export async function AddPost(formData:FormData) {
   const token = localStorage.getItem('tkn');
    const {data} =  await axios.post(`${import.meta.env.VITE_BASE_URL}/posts`,formData,
        {
            headers:{
                "AUTHORIZATION" :`Bearer ${token}`
            }
        }
    )
    return data
}