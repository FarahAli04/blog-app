
import axios from 'axios'


type payloadDataType = {
email:string,
password:string,

}
export async function signIn(payload:payloadDataType) {
    const {data} = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/signin`,payload)
    return data
}
