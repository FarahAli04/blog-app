
import axios from 'axios'


type payloadDataType = {
email:string,
password:string,
rePassword:string,
name:string,
username:string,
dateOfBirth:string,
gender:'female'|"male"
}
export async function signUp(payload:payloadDataType) {
    const {data} = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/signup`,payload)
    return data
}
