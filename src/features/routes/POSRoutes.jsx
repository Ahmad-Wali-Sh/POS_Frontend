import { Route, Routes } from "react-router"
import POS from "../pos/POS"
import Customers from "../customers/Customers"
import Login from "../auth/Login"
import Layout  from "../layout/Layout"
import Product from "../products/Pages/Product"
import ProtectedRoute from "../auth/ProtectedRoute"
import Employee from "../employee/Employee"
import Profile from "../profile/Profile"

function POSRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Layout><POS /></Layout>}/>
        <Route path="/pos" element={<Layout><POS /></Layout>}/>
        <Route path="/customers" element={<Layout><Customers /></Layout>}/>
        <Route path="/products" element={<Layout><Product /></Layout>}/>
        <Route path="/employee" element={<Layout><Employee /></Layout>}/>
        <Route path="/profile" element={<Layout><Profile /></Layout>}/>
        <Route path="/login" element={<Login />}  />
        <Route path="*" element={<Error />}/>
    </Routes>
  )
}

export default POSRoutes