import {configureStore} from "@reduxjs/toolkit";
import auth from "./auth/authslice"
import admin from "./admin/adminslice"
import shop from "./shop/shopslice"
import product from "./product/productslice"
import cart from "./cart/cartslice"
import chat from "./chat/chatslice"

const store = configureStore({

    reducer : {auth , admin , shop , product , cart , chat}

})

export default store