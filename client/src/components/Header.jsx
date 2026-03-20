import { Leaf } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutuser } from "../features/auth/authslice";

const Header = () => {

const dispatch = useDispatch()
const navigate = useNavigate()

const location = useLocation()

const {user} = useSelector(state => state.auth)


// useEffect(()=>{

//   if(!user){
//     navigate("/login")
//   }

// },[user])

  const handlelogout=()=>{

  dispatch(logoutuser())
  navigate("/")
 
}


  return (
    <header className={location.pathname.includes("admin") || location.pathname.includes("shop") ? "hidden" : "sticky top-0 z-50 bg-white border-b border-gray-200"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Leaf className="w-8 h-8 text-emerald-500" />
            <Link to={"/"} className="text-xl font-bold text-gray-900">
              IndoreMart
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to={"/products"} className="text-gray-600 hover:text-emerald-600 transition-colors">
              Products
            </Link>
            <Link to={"/marketplace"} className="text-gray-600 hover:text-emerald-600 transition-colors">
              Shops
            </Link>
            <Link to={"/cart"} className="text-gray-600 hover:text-emerald-600 transition-colors">
              Cart
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
           {
            user ? (<>  <Link to={user?.isAdmin ? "/admin/admindashboard" : user?.isShopowner ? "/shop/dashboard" : "/auth/profile"} className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors">
             Welcome {user.name}
            </Link>  <button onClick={handlelogout}  className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors">
              Logout
            </button></>) :
            
            (<>
             <Link to={'/login'} className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors">
              Login
            </Link>
            <Link to={"/register"} className="px-4 py-2 bg-emerald-500 text-white text-sm font-medium rounded-lg hover:bg-emerald-600 transition-colors">
              Sign Up
            </Link>
            </>)
           }
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
