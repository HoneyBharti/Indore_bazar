import { useDispatch } from "react-redux"
import { shopupdate } from "../../features/admin/adminslice"

const Shopapprovallistgroup =({allshops})=>{

  const  approvallist = allshops.filter(shop => shop.status !== "accepted")


  const dispatch = useDispatch()

   const handleshopupdate=(shopdetails)=>{
         dispatch(shopupdate(shopdetails))
      }

    return(
                            <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4">
                  Shop Approval Requests
                </h3>

                <div className="space-y-4">

               {
                approvallist.map(list=>{
                    return(
                           <div key={list._id} className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <div>
                      <p className="text-xs font-medium text-slate-500">
                        {list.name}
                      </p>
                       <p className="text-xs font-medium text-slate-500">
                        Owner : {list.user.name}
                      </p>
                      <p className="text-xs text-slate-500">
                       {list.address}
                      </p>
                       <p className="text-xs text-red-500">
                       Status : {list.status}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={()=> handleshopupdate({shopid : list._id , status: "accepted"})} className="px-3 py-1 text-xs font-medium bg-emerald-500 text-white rounded hover:bg-emerald-600">
                        Approve
                      </button>
                      <button onClick={()=>handleshopupdate({shopid : list._id , status: "rejected"})} className="px-3 py-1 text-xs font-medium bg-red-500 text-white rounded hover:bg-red-600">
                        Reject
                      </button>
                    </div>
                  </div>
                    )
                })
               }

                 

                </div>
              </div>
    )
}

export default Shopapprovallistgroup