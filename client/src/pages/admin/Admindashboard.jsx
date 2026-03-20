import React, { useEffect } from "react";
import AdminSidebar from "../../components/admin/Adminsidebar";
import Adminheader from "../../components/admin/Adminheader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getallorders, getallshops, getallusers } from "../../features/admin/adminslice";
import { toast } from "react-toastify";
import Shopapprovallistgroup from "../../components/admin/Shopapprovallistgroup";
import Loader from "../../components/Loader";



function Admindashboard() {


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user} = useSelector(state=> state.auth)
  const {adminloading , adminerror , adminsuccess , adminerrormsg , allusers , allshops , allorders} = useSelector(state => state.admin)



  useEffect(()=>{

     if(!user?.isAdmin){
      navigate("/")
      return
    }

// if(user?.isAdmin){
      dispatch(getallusers())
    dispatch(getallorders())
    dispatch(getallshops())
// }

   


    if(adminerror && adminerrormsg){
      toast.error(adminerrormsg, {position : "top-center"})
    }

  },[user , adminerror , adminerrormsg])


  if(adminloading){
    return <Loader/>
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Adminheader />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

              {/* Total Users */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <span className="text-emerald-600 font-bold text-xl">U</span>
                  </div>
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                    +12%
                  </span>
                </div>
                <p className="text-slate-500 text-sm">Total Users</p>
                <p className="text-3xl font-bold text-slate-800">{allusers?.length}</p>
              </div>

              {/* Total Orders */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-xl">O</span>
                  </div>
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    +8%
                  </span>
                </div>
                <p className="text-slate-500 text-sm">Total Orders</p>
                <p className="text-3xl font-bold text-slate-800">{allorders?.length}</p>
              </div>

              {/* Total Shops */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                    <span className="text-amber-600 font-bold text-xl">S</span>
                  </div>
                  <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded">
                    +23%
                  </span>
                </div>
                <p className="text-slate-500 text-sm">Total Shops</p>
                <p className="text-3xl font-bold text-slate-800">{allshops?.length}</p>
              </div>

              {/* Pending Approvals */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center">
                    <span className="text-rose-600 font-bold text-xl">!</span>
                  </div>
                  <span className="text-xs font-medium text-rose-600 bg-rose-50 px-2 py-1 rounded">
                    Urgent
                  </span>
                </div>
                <p className="text-slate-500 text-sm">Pending Approvals</p>
                <p className="text-3xl font-bold text-slate-800">{allshops?.filter(shop => shop?.status !== "accepted").length}</p>
              </div>

            </div>

            {/* Lower Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

              {/* Recent Orders */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4">
                  Recent Orders
                </h3>

                <div className="space-y-4">

               {
                allorders.map(order => {
                  return(
                       <div key={order._id} className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded flex items-center justify-center text-sm font-medium">
                        #{order?._id[0] +order?._id[1]+order?._id[2]+order?._id[3]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">
                           {order?.user?.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {order?.shop?.name}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-800">
                        ₹ {order?.totalbillamount}
                      </p>
                      <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                        {order?.status}
                      </span>
                    </div>
                  </div>
                  )
                })
               }

             

                

                </div>
              </div>

              {/* Shop Approvals */}
  

  <Shopapprovallistgroup allshops={allshops}/>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default Admindashboard;
