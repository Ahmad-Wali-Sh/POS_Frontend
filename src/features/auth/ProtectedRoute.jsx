import { Spin } from "antd"
import useUser from "../store/auth/useUser"
import { useEffect } from "react"
import { useNavigate } from "react-router"

function ProtectedRoute({element}) {
    const { loggedUser } = useUser()

    const navigate = useNavigate()

    useEffect(() => {
        if(loggedUser()?.id) {
            console.log('User Exists')
        } 
        else {
            setTimeout(() => {
                navigate('/login')
            }, 1000)
        }
    }, [loggedUser])

    if (loggedUser()?.id) {
        return element
    }
    else {
        return (
            <main className="h-screen flex justify-center items-center">
                <Spin size="large"  />
            </main>
        )
    }
}

export default ProtectedRoute