import { Button, Input } from "antd"
import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { TbPassword } from "react-icons/tb";
import useEmployees from "../store/auth/useEmployees";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import useUser from "../store/auth/useUser";

function Login() {
    const [form, setForm] = useState({
        username: '',
        password: ''
    })
    const { validateUser } = useEmployees()
    const { setUser } = useUser()
    const navigate = useNavigate()

    const UserLogin = () => {
        const user = validateUser(form.username, form.password)
        if (user?.id) {
            setUser(user)
            toast.success('Credientials is Correct, Redirecting...')
            navigate('/pos')
        } else {
            toast.error('Username or Password is incorrect.')
        }
    }
    return (
        <main className="h-screen flex">
            <section className="w-1/2 h-full " style={{
                backgroundImage: 'url(/images/products/keyboard2.png)',
                backgroundSize: 'cover'
            }}>
            </section>
            <section className="w-1/2 h-full bg-[#161616]  flex justify-center items-center">

                <div className=" w-7/10 h-5/10 p-10 flex flex-col gap-5">
                    <div>
                        <Input value={form.username} onChange={(e) => {
                            setForm({ ...form, username: e.target.value })
                        }} placeholder="Enter Your Username" prefix={<FaUserAlt />} />
                    </div>
                    <div>
                        <Input value={form.password} onChange={(e) => {
                            setForm({ ...form, password: e.target.value })
                        }} placeholder="Enter Your Password" type='password' prefix={<TbPassword />} />
                    </div>

                    <Button onClick={UserLogin} type="primary">Login</Button>
                </div>
            </section>
        </main>
    )
}

export default Login