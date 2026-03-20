import React, { useEffect } from "react";
import AdminSidebar from "../../components/admin/Adminsidebar";
import Adminheader from "../../components/admin/Adminheader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getallshops, shopupdate } from "../../features/admin/adminslice";
import { toast } from "react-toastify";


function AdminAllShops() {

  const dispatch = useDispatch()
    const navigate = useNavigate()
  
    const {user} = useSelector(state=> state.auth)
    const {adminloading , adminerror , adminsuccess , adminerrormsg , allshops } = useSelector(state => state.admin)
  
  
    useEffect(()=>{
  
if(user?.isAdmin){
        dispatch(getallshops())

}     

      if(!user.isAdmin){
        navigate("/login")
      }
  
  
      if(adminerror && adminerrormsg){
        toast.error(adminerrormsg, {position : "top-center"})
      }
  
    },[user , adminerror , adminerrormsg])


    const handleshopupdate=(shopdetails)=>{
       dispatch(shopupdate(shopdetails))
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
        <div className="p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold text-slate-800">
            Shops
          </h1>

          <select className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
            <option>All Status</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>

        {/* Shops Table */}
        <div className="px-8 pb-8">
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                    Shop Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                    Owner Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                    Created Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">

                {
                  allshops.map(shop=>{
                    return(
                        <tr key={shop._id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm font-medium text-slate-800">
                    {shop.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {shop.user.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {shop.address}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${shop.status == "accepted" ? "bg-emerald-100 text-emerald-800" : shop.status == "pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"} `}>
                      {shop.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {new Date(shop.createdAt).toLocaleDateString("EN-IN")}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button onClick={()=> handleshopupdate({shopid: shop._id , status: shop.status == "accepted" ? "rejected" : "accepted"})} className={` cursor-pointer font-medium ${shop.status == "accepted" ? "text-red-600 hover:text-red-800" : "text-emerald-600 hover:text-emerald-800"}`}>
                      {shop.status == "accepted" ? "Deactivate" : "Activate"}
                    </button>
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

export default AdminAllShops;
