import { Navigate } from "react-router-dom"

export default function MainRouting({children}:{children:React.ReactNode}) {
  const token = localStorage.getItem('tkn')
  if(token){
    return <Navigate to={'feed'}></Navigate>
  }
  return children
}
