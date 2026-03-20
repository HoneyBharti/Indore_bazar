import React, { useEffect } from "react";
import AdminSidebar from "../../components/admin/Adminsidebar";
import Adminheader from "../../components/admin/Adminheader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getallusers, userupdate } from "../../features/admin/adminslice";
import { toast } from "react-toastify";


function AdminAllUsers() {


   const dispatch = useDispatch()
    const navigate = useNavigate()
  
    const {user} = useSelector(state=> state.auth)
    const {adminloading , adminerror , adminsuccess , adminerrormsg , allusers } = useSelector(state => state.admin)
  
  
  
    useEffect(()=>{
  
if(user?.isAdmin){
        dispatch(getallusers())

}     

      if(!user.isAdmin){
        navigate("/login")
      }
  
  
      if(adminerror && adminerrormsg){
        toast.error(adminerrormsg, {position : "top-center"})
      }
  
    },[user , adminerror , adminerrormsg])


    const handleupdateusers=(userdetails)=>{
      dispatch(userupdate(userdetails))
    }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Header */}
        <Adminheader />

        {/* Page Header */}
        <div className="mb-6 p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Users</h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage all platform users and their access
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Search users..."
              className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <select className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option>All Roles</option>
              <option>Customer</option>
              <option>Shop Owner</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="px-8 pb-8">
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                    User Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                    Email / Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                    Joined Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">

                {/* User Row 1 */}
               {
                allusers.map(user=>{
                  return(
                     <tr key={user._id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm font-medium text-slate-800">
                   {user.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                   {user.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {user.isShopowner ? "Shopowner" : "Customer"}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${user.isActive ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}`}>
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {new Date(user.createdAt).toLocaleDateString("EN-IN")}
                  </td>
                  <td className="px-6 py-4 text-sm">
                   {user.isActive ? ( <button onClick={()=> handleupdateusers({userid : user._id , isActive:false })} className="cursor-pointer text-red-600 hover:text-red-800 font-medium">
                      Deactivate
                    </button>) : ( <button onClick={()=> handleupdateusers({userid : user._id , isActive:true })}  className="cursor-pointer text-emerald-600 hover:text-emerald-800 font-medium">
                      Activate
                    </button>)}
                  </td>
                </tr>
                  )
                })
               }

       

              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminAllUsers;
