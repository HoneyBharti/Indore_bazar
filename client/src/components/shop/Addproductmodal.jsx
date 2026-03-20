import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addproduct, productupdate } from "../../features/shop/shopslice"


const Addproductmodal = ({showmodal , handlemodal}) => {

     const dispatch = useDispatch()

     const {shop ,edit} =useSelector(state=> state.shop)

    const [formdata , setformdata] = useState({
        name : "" ,
        description : "" ,
        category : "" ,
        productImage : "",
        price : "",
        stock : "",
        shopid : shop._id || null

    })

    const {name , description , category , productImage , price , stock ,shopid} = formdata

    const handlechange =(e)=>{

        if(e.target.name == "productImage"){
            setformdata({
                ...formdata,
                 [e.target.name] : e.target.files[0]
            })
        }else {
              setformdata({
        ...formdata,
        [e.target.name] : e.target.value
    })
        }

  
        
    }

    const handlesubmit =(e)=>{
        e.preventDefault()

        let formdatatosend = new FormData()
        formdatatosend.append('name' , name)
        formdatatosend.append('description' , description)
        formdatatosend.append('category' , category)
        formdatatosend.append('price' , price)
        formdatatosend.append('stock' , stock)
        formdatatosend.append('shopid' , shopid)
        formdatatosend.append('productImage' , productImage)


        !edit.isedit ?  dispatch(addproduct(formdatatosend)) :
        dispatch(productupdate({_id : edit.product._id , ...formdata}))


        setformdata({
              name : "" ,
        description : "" ,
        category : "" ,
        productImage : "",
        price : "",
        stock : "",
        shopid : shop._id
        })
        handlemodal() 
    }


      useEffect(()=>{

if(edit.isedit){
       
      setformdata(edit?.product)

}
        },[edit])

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
            <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col my-auto animate-in fade-in zoom-in duration-200">
                {/* Modal Header */}
                <div className="flex items-start justify-between p-6 border-b border-slate-100">
                    <div>
                        <h2 className="text-xl font-semibold text-slate-900">Add New Product</h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Enter the details below to add a new item to your shop inventory.
                        </p>
                    </div>
                    <button onClick={handlemodal} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                        <span className="sr-only">Close</span>
                    </button>
                </div>

                {/* Modal Body / Form */}
                <form encType="multipart/form-data" onSubmit={handlesubmit} className="p-6 overflow-y-auto max-h-[calc(100vh-200px)] space-y-6">
                    {/* Basic Info Section */}
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                        
                        <div className="col-span-1 md:col-span-2 ">
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Shop Id : </label>
                            <input
                               value={shopid}
                                name="shopid"
                                onChange={handlechange}
                                type="text"
                                placeholder="e.g. Fresh Organic Tomatoes"
                                className="disabled:bg-gray-300 w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                            />
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Product Name</label>
                            <input
                              name="name"
                              value={name}
                              onChange={handlechange}
                                type="text"
                                placeholder="e.g. Fresh Organic Tomatoes"
                                className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
                            <div className="relative">
                                <select 
                                name="category"
                                value={category}
                                onChange={handlechange}
                                 className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all">
                                    <option value="">Select Category</option>
                                    <option value="vegetables">Vegetables</option>
                                    <option value="fruits">Fruits</option>
                                    <option value="dairy">Dairy & Eggs</option>
                                    <option value="bakery">Bakery</option>
                                    <option value="cloths">Cloths</option>
                                    <option value="other">Other</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="m6 9 6 6 6-6" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
                            <textarea
                            name="description"
                            value={description}
                            onChange={handlechange}
                                type="text"
                                placeholder="Product Description"
                                className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Price (₹)</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">₹</span>
                                <input
                                name="price"
                                value={price}
                                onChange={handlechange}
                                    type="number"
                                    placeholder="0.00"
                                    className="w-full pl-8 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Stock Quantity</label>
                            <input
                              name="stock"
                              value={stock}
                              onChange={handlechange}
                                type="number"
                                placeholder="0"
                                className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                            />
                        </div>
                    </div>

                    {/* Product Image Section */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Product Image</label>
                        <label htmlFor="productImage" className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group">
                            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-3 group-hover:scale-110 transition-transform">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="17 8 12 3 7 8" />
                                    <line x1="12" x2="12" y1="3" y2="15" />
                                </svg>
                            </div>
                            <p className="text-sm font-medium text-slate-700">Upload product image</p>
                            <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</p>
                            <input 
                            id="productImage"
                               name="productImage"
                                accept="image/png,image/jpeg,image/webp"
                               onChange={handlechange}
                               
                                 type="file" className="text-center" />
                        </label>
                    </div>

                    <div className="flex items-center justify-between p-6 border-t border-slate-100 bg-slate-50/30">
                        <button type="button" onClick={handlemodal} className="px-5 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
                            Cancel
                        </button>
                        <button type="submit" className="px-5 py-2 text-sm font-medium text-white bg-emerald-600 border border-emerald-600 rounded-lg hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-200">
                         {edit.isedit ? "Update product" : "Add product"}
                        </button>
                    </div>
                </form>

                {/* Modal Footer */}
            </div>
        </div>
    )
}

export default Addproductmodal