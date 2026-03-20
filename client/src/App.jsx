import react from "react"
import { BrowserRouter , Routes , Route} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Header from "./components/Header"
import AdminAllOrders from "./pages/admin/Adminallorders"
import AdminAllShops from "./pages/admin/Adminallshops"
import AdminAllUsers from "./pages/admin/Adminallusers"
import Admindashboard from "./pages/admin/Admindashboard"
import {ToastContainer} from "react-toastify"
// import Privatecomponent from "./components/Privatecomponent"
import Privateadmincomponent from "./components/Privateadmincomponent"
import ShopDashboard from "./pages/shop/ShopDashboard"
import ShopownerProducts from "./pages/shop/ShopownerProducts"
import ShopownerOrders from "./pages/shop/ShopownerOrders"
import ShopCoupons from "./pages/shop/ShopCoupons"
import ShopProfile from "./pages/shop/ShopProfile"
import Profilepage from "./pages/Profilepage"
import Singleproductpage from "./pages/Singleproductpage"
import Allproductpage from "./pages/Allproductpage"
import Allshops from "./pages/Allshops"
import Singleshop from "./pages/Singleshop"
import Cartpage from "./pages/Cartpage"
import Chatpage from "./pages/chatpage"

const App =()=>{

  return(
    <BrowserRouter>

    <Header/>

  <Routes>
    <Route path="/" element={<Home/>} />
     <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />

      {/* Admin Routes */}
           <Route path="/admin" element={<Privateadmincomponent/>}>

            <Route path="users" element={<AdminAllUsers/>} />
            <Route path="orders" element={<AdminAllOrders/>} />
            <Route path="shops" element={<AdminAllShops/>} />
            <Route path="admindashboard" element={<Admindashboard/>} />

           </Route>

            {/* Shop Owner Routes */}

             <Route path="/shop/dashboard" element={<ShopDashboard/>} />
            <Route path="/shop/products" element={<ShopownerProducts/>} />
            <Route path="/shop/orders" element={<ShopownerOrders/>} />
             <Route path="/shop/coupons" element={<ShopCoupons/>} />
              <Route path="/shop/profile" element={<ShopProfile/>} />


      <Route path="/auth/profile" element={<Profilepage/>} />
            <Route path="/products/:pid" element={<Singleproductpage/>} />
             <Route path="/products" element={<Allproductpage/>} />
              <Route path="/marketplace" element={<Allshops/>} />
               <Route path="/marketplace/:sid" element={<Singleshop/>} />
               <Route path="/cart" element={<Cartpage/>} />
              <Route path="/chat" element={<Chatpage/>} />

  </Routes>

 
<ToastContainer/>
    </BrowserRouter>
    
  )
}

export default App