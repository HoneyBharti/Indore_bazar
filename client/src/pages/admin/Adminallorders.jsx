import React, { useEffect } from "react";
import AdminSidebar from "../../components/admin/Adminsidebar";
import Adminheader from "../../components/admin/Adminheader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getallorders } from "../../features/admin/adminslice";
import { toast } from "react-toastify";


function AdminAllOrders() {


const dispatch = useDispatch()
    const navigate = useNavigate()
  
    const {user} = useSelector(state=> state.auth)
    const {adminloading , adminerror , adminsuccess , adminerrormsg , allorders } = useSelector(state => state.admin)
  
  
  
    useEffect(()=>{
  
if(user?.isAdmin){
        dispatch(getallorders())

}     

      if(!user.isAdmin){
        navigate("/login")
      }
  
  
      if(adminerror && adminerrormsg){
        toast.error(adminerrormsg, {position : "top-center"})
      }
  
    },[user , adminerror , adminerrormsg])


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
            Orders
          </h1>

          <div className="flex flex-col sm:flex-row gap-3">
            <select className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option>All Status</option>
              <option>Placed</option>
              <option>Delivered</option>
              <option>Cancelled</option>
              <option>Pending</option>
            </select>

            <input
              type="date"
              className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Orders Table */}
        <div className="px-8 pb-8">
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Shop</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Payment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Date</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">

                {/* Row 1 */}
              {
                allorders.map(order=>{
                  return(
                      <tr key={order._id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm font-medium text-slate-800">#{order._id[0] + order._id[order._id.length-1] + order._id[order._id.length-2] + order._id[order._id.length-3] }</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{order?.user?.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{order?.shop?.name}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-800">₹{order.totalbillamount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${order.status == "delivered" ? "bg-emerald-100 text-emerald-800" : "bg-yellow-100 text-yellow-800"}`}>
                     {order.status == "delivered" ? "Paid" : "Not Paid" }
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${order.status == "cancelled" ? "bg-red-100 text-red-800" : "bg-emerald-100 text-emerald-800"} `}>
                      {order.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{new Date(order.createdAt).toLocaleDateString("EN-IN")}</td>
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

export default AdminAllOrders;
