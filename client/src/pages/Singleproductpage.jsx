import { ShoppingCart, MapPin, Phone, Clock, Link } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { useEffect } from "react"
import Loader from "../components/Loader"
import { getsingleproduct } from "../features/product/productslice"
import { addproductincart, getcart } from "../features/cart/cartslice"


export default function Singleproductpage() {

    const { user } = useSelector(state => state.auth)
    const { product, productloading, productsuccess, producterror, producterrormsg } = useSelector(state => state.product)
    const { cartitems } = useSelector(state => state.cart)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { pid } = useParams()


    let isEligibleForCart = cartitems?.products?.length === 0 ? true : product?.shop?._id === cartitems?.products[0]?.product?.shop




    const handleAddToCart = (productId) => {
        dispatch(addproductincart({ productid: productId, qty: 1 }))
        navigate("/cart")
    }

    

    useEffect(() => {

        dispatch(getsingleproduct(pid))
        dispatch(getcart())

        if (producterror && producterrormsg) {
            toast.error(producterrormsg)
        }


    }, [producterror, producterrormsg])


    if (productloading || !product) {
        return <Loader />
    }



    return (
        <div className="min-h-screen bg-white">
            {/* Header */}

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Product Image */}
                    <div className="flex items-center justify-center bg-gray-50 rounded-lg p-4 md:p-8">
                        <div className="relative w-full aspect-square">
                            <img
                                src={product.productImage || "/placeholder.svg"}
                                alt={product.name}
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col justify-start space-y-6">
                        {/* Category & Shop */}
                        <div>
                            <span className="text-xs font-semibold text-teal-600 uppercase tracking-wide">{product.category}</span>
                            <p className="text-sm text-teal-600 font-medium mt-1">{product?.shop.name}</p>
                        </div>

                        {/* Product Name */}
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{product.name}</h1>
                            <p className="text-gray-600 text-base mt-2">{product.description}</p>
                        </div>

                        {/* Price & Stock */}
                        <div className="border-t border-b border-gray-200 py-6">
                            <div className="flex items-baseline gap-2 mb-4">
                                <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-teal-600 rounded-full"></div>
                                <span className="text-sm text-gray-600">
                                    {product.stock} {product.stock > 1 ? "items" : "item"} in stock
                                </span>
                            </div>
                        </div>

                        {
                            !user ? (
                                <h1 className="text-teal-600 text-xl font-bold">You Must Login To Purchase This Product</h1>
                            ) : (
                                <button disabled={!isEligibleForCart ? true : false} onClick={() => handleAddToCart(product._id)} className="disabled:bg-gray-500 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                                    <ShoppingCart size={20} />
                                    {isEligibleForCart ? "Add to Cart" : "Remove Other Shops Items First"}
                                </button>
                            )
                        }


                        {/* Shop Information Card */}
                        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                            <h3 className="font-semibold text-gray-900 text-lg mb-4">Shop Information</h3>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">{product.shop.name}</p>
                                    <p className="text-sm text-gray-600 mt-1">{product.shop.description}</p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <MapPin size={18} className="text-teal-600 flex-shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-xs font-semibold text-gray-600 uppercase">Address</p>
                                        <p className="text-sm text-gray-900 mt-1">{product.shop.address}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Phone size={18} className="text-teal-600 flex-shrink-0" />
                                    <div>
                                        <p className="text-xs font-semibold text-gray-600 uppercase">Phone</p>
                                        <p className="text-sm text-gray-900">{product.shop.shopphone}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Clock size={18} className="text-teal-600 flex-shrink-0" />
                                    <div>
                                        <p className="text-xs font-semibold text-gray-600 uppercase">Availability</p>
                                        <p className="text-sm text-gray-900">24/7 Available</p>
                                    </div>
                                </div>

                                <div className="bg-white border border-gray-300 rounded px-3 py-2 flex items-center gap-1 inline-flex">
                                    <span className="text-yellow-400">★</span>
                                    <span className="text-sm font-semibold text-gray-900">4.5</span>
                                    <span className="text-xs text-gray-600">· 10-15 min</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}