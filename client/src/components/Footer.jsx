import { useLocation } from "react-router-dom"

const Footer=()=>{

  const { pathname } = useLocation()

    if (pathname.includes("chat")) {
        return (
            <></>
        )
    } 

    return (
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-emerald-500 rounded-lg"></div>
                                <span className="text-xl font-bold">FreshMart</span>
                            </div>
                            <p className="text-gray-400 text-sm">
                                Your trusted multi-shop grocery delivery platform. Fresh products delivered in minutes.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a className="hover:text-emerald-400 transition-colors">About Us</a></li>
                                <li><a className="hover:text-emerald-400 transition-colors">Careers</a></li>
                                <li><a className="hover:text-emerald-400 transition-colors">Blog</a></li>
                                <li><a className="hover:text-emerald-400 transition-colors">Press</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Support</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a className="hover:text-emerald-400 transition-colors">Help Center</a></li>
                                <li><a className="hover:text-emerald-400 transition-colors">Contact Us</a></li>
                                <li><a className="hover:text-emerald-400 transition-colors">Terms of Service</a></li>
                                <li><a className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Partner With Us</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a className="hover:text-emerald-400 transition-colors">Become a Store</a></li>
                                <li><a className="hover:text-emerald-400 transition-colors">Delivery Partner</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-gray-400">© 2024 FreshMart. All rights reserved.</p>
                        <div className="flex gap-4">
                            <a className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors">
                                <span className="text-sm">f</span>
                            </a>
                            <a className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors">
                                <span className="text-sm">t</span>
                            </a>
                            <a className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors">
                                <span className="text-sm">in</span>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
    )
}

export default Footer