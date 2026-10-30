import type React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({children}:{children:React.ReactNode}) {
const userToken = localStorage.getItem('tkn')
if(userToken)
    return <>{children}</>

    return <Navigate to={'/'}></Navigate>

}
