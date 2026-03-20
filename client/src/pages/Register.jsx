import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registeruser } from "../features/auth/authslice";

function Register() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user ,isloading , issuccess , iserror , message} = useSelector(state=> state.auth)


    const [formData , setformData] = useState({name : "" , email: "" , phone: "" , address: "" , password: "" , confirmpassword: ""})

    const {name , email , address , password , confirmpassword , phone} = formData


    const handlechange=(e)=>{

        setformData({
            ...formData ,
            [e.target.name] : e.target.value
        })

    }

    const handlesubmit=(e)=>{
        e.preventDefault()

        if(password !== confirmpassword){
            toast.error("Passwords Not Match!" , {position : "top-center"})
        }else{
            dispatch(registeruser(formData))
        }
    }

    useEffect(()=>{

        if(user){
            navigate("/")
        }

        if(iserror && message){
            toast.error(message , {position : "top-center"})
        }

    },[user ,iserror , message])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-zinc-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Create your account
          </h1>
          <p className="text-slate-600 text-sm">
            Join thousands getting groceries delivered instantly
          </p>
        </div>

        {/* Form (UI Only) */}
        <form onSubmit={handlesubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handlechange}
              placeholder="Enter your full name"
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all text-slate-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handlechange}
              placeholder="Enter your email"
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all text-slate-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Phone
            </label>
            <input
              type="text"
               name="phone"
               value={phone}
              onChange={handlechange}
              placeholder="Enter your phone"
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all text-slate-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Address
            </label>
            <input
              type="text"
               name="address"
               value={address}
              onChange={handlechange}
              placeholder="Enter your address"
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all text-slate-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>
            <input
              type="password"
               name="password"
               value={password}
              onChange={handlechange}
              placeholder="Create a password"
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all text-slate-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
               name="confirmpassword"
               value={confirmpassword}
              onChange={handlechange}
              placeholder="Confirm your password"
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all text-slate-800"
            />
          </div>

          <button
            type= "submit"
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold py-3.5 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg shadow-emerald-500/30 mt-2"
          >
            Create Account
          </button>

          <p className="text-xs text-slate-500 text-center leading-relaxed">
            By registering, you agree to our{" "}
            <span className="text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer">
              Privacy Policy
            </span>
          </p>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <p className="text-center text-sm text-slate-600">
            Already have an account?{" "}
            <span className="text-emerald-600 hover:text-emerald-700 font-semibold cursor-pointer">
              Login
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Register;
