import { Button, Input, Tooltip } from "antd"
import { FaSearch } from "react-icons/fa";
import { FaWifi } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import { IoMdPersonAdd } from "react-icons/io";
import { BsFillPostcardFill } from "react-icons/bs";
import NavButton from "./NavButton";
import { GiPlagueDoctorProfile } from "react-icons/gi";
import { IoIosLogOut } from "react-icons/io";
import { AiOutlineProduct } from "react-icons/ai";
import { FaUser } from "react-icons/fa";

function Layout({children}) {
    return (
        <main className='h-screen text-white w-full '>
            <header className='h-1/12  flex justify-between items-center px-5 bg-slate-800'>
                <h1 className='text-2xl font-bold'>Full Stack POS</h1>
                <div className="w-4/12">
                    <Input variant="outlined" placeholder="Search Items..." prefix={<FaSearch />} />
                </div>
                <div className="flex items-center gap-3">
                    <Button shape="square">
                        <FaWifi color='green' />
                    </Button>
                    <Button shape="sqaure">
                        <IoMdRefresh color='grey' />
                    </Button>
                    <Button variant="filled" type="primary">Select Table</Button>
                </div>

            </header>
            <main className='h-11/12  flex'>
                <nav className='w-1/20  text-center pt-4 flex flex-col p-2 gap-1 justify-between bg-slate-700'>
                    <section className="flex flex-col gap-2">
                        <NavButton link={'/products'} title={'Products'} icon={<AiOutlineProduct />} />
                        <NavButton link={'/pos'} title={'POS'} icon={<BsFillPostcardFill />} />
                        <NavButton link={'/customers'} title={'Customers'} icon={<IoMdPersonAdd />} />
                        <NavButton link={'/employee'} title={'Employee'} icon={<FaUser />} />
                    </section>
                    <section className="gap-2 flex flex-col">
                        <NavButton link={'/profile'} title={'Profile'} icon={<GiPlagueDoctorProfile />} />
                        <NavButton link={'/login'} title={'Logout'} icon={<IoIosLogOut />} isDanger={true} />
                    </section>
                </nav>
                <section className='w-19/20'>{children}</section>
            </main>
        </main>
    )
}

export default Layout