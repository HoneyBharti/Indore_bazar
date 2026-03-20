import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import shopservice from "./shopservice";

let shopexists = JSON.parse(localStorage.getItem('shop'))

const shopslice = createSlice({

    name : "shop" ,
    initialState : {
        shoploading : false,
        shoperror: false,
        shopsuccess : false ,
        shoperrormssg : " ",
        shopproducts : [],
        shoporders : [],
        shopcoupons : [],
        shop : shopexists || {},
        edit : {
            product:{} , isedit : false
        }

    },
    reducers : { productedit : (state , action)=>{
        return {
            ...state ,
            edit : { product : action.payload , isedit : true}
        }
       
    }},
    extraReducers : (builder) =>{

        builder
        .addCase(getshopdetails.pending , (state , action)=>{
            state.shoploading = true
            state.shopsuccess = false
            state.shoperror = false
        })

          .addCase(getshopdetails.fulfilled , (state , action)=>{
            state.shoploading = false
            state.shopsuccess = true
            state.shoperror = false
            state.shop = action.payload
        })

          .addCase(getshopdetails.rejected , (state , action)=>{
            state.shoploading = false
            state.shopsuccess = false
            state.shoperror = true
            state.shoperrormssg = action.payload
        })

          .addCase(getshopproducts.pending , (state , action)=>{
            state.shoploading = true
            state.shopsuccess = false
            state.shoperror = false
        })

          .addCase(getshopproducts.fulfilled , (state , action)=>{
            state.shoploading = false
            state.shopsuccess = true
            state.shoperror = false
            state.shopproducts = action.payload
        })

          .addCase(getshopproducts.rejected , (state , action)=>{
            state.shoploading = false
            state.shopsuccess = false
            state.shoperror = true
            state.shoperrormssg = action.payload
        })

         .addCase(getshoporders.pending , (state , action)=>{
            state.shoploading = true
            state.shopsuccess = false
            state.shoperror = false
        })

          .addCase(getshoporders.fulfilled , (state , action)=>{
            state.shoploading = false
            state.shopsuccess = true
            state.shoperror = false
            state.shoporders = action.payload
        })

          .addCase(getshoporders.rejected , (state , action)=>{
            state.shoploading = false
            state.shopsuccess = false
            state.shoperror = true
            state.shoperrormssg = action.payload
        })

          .addCase(getshopcoupons.pending , (state , action)=>{
            state.shoploading = true
            state.shopsuccess = false
            state.shoperror = false
        })

          .addCase(getshopcoupons.fulfilled , (state , action)=>{
            state.shoploading = false
            state.shopsuccess = true
            state.shoperror = false
            state.shopcoupons = action.payload
        })

          .addCase(getshopcoupons.rejected , (state , action)=>{
            state.shoploading = false
            state.shopsuccess = false
            state.shoperror = true
            state.shoperrormssg = action.payload
        })

         .addCase(addproduct.pending , (state , action)=>{
            state.shoploading = true
            state.shopsuccess = false
            state.shoperror = false
        })

          .addCase(addproduct.fulfilled , (state , action)=>{
            state.shoploading = false
            state.shopsuccess = true
            state.shoperror = false
            state.shopproducts = [action.payload , ...state.shopproducts]
        })

          .addCase(addproduct.rejected , (state , action)=>{
            state.shoploading = false
            state.shopsuccess = false
            state.shoperror = true
            state.shoperrormssg = action.payload
        })

           .addCase(productupdate.pending , (state , action)=>{
            state.shoploading = true
            state.shopsuccess = false
            state.shoperror = false
        })

          .addCase(productupdate.fulfilled , (state , action)=>{
            state.shoploading = false
            state.shopsuccess = true
            state.shoperror = false
            state.shopproducts = state.shopproducts?.map(product=>{ product?._id === action.payload?._id ? action.payload : product})
            state.edit ={ product : { } , isedit : false}
        })

          .addCase(productupdate.rejected , (state , action)=>{
            state.shoploading = false
            state.shopsuccess = false
            state.shoperror = true
            state.shoperrormssg = action.payload
        })

         .addCase(orderupdate.pending , (state , action)=>{
            state.shoploading = true
            state.shopsuccess = false
            state.shoperror = false
        })

          .addCase(orderupdate.fulfilled , (state , action)=>{
            state.shoploading = false
            state.shopsuccess = true
            state.shoperror = false
            state.shoporders = state.shoporders.map(order=> order._id === action.payload._id ? action.payload : order)
        })

          .addCase(orderupdate.rejected , (state , action)=>{
            state.shoploading = false
            state.shopsuccess = false
            state.shoperror = true
            state.shoperrormssg = action.payload
        })


            .addCase(createcoupon.pending , (state , action)=>{
            state.shoploading = true
            state.shopsuccess = false
            state.shoperror = false
        })

          .addCase(createcoupon.fulfilled , (state , action)=>{
            state.shoploading = false
            state.shopsuccess = true
            state.shoperror = false
            state.shopcoupons = [action.payload , ...state.shopcoupons]
        })

          .addCase(createcoupon.rejected , (state , action)=>{
            state.shoploading = false
            state.shopsuccess = false
            state.shoperror = true
            state.shoperrormssg = action.payload
        })

    }
})

export const {productedit} = shopslice.actions

export default shopslice.reducer


export const getshopdetails = createAsyncThunk("GET/SHOP/DETAILS" , async(_ , thunkAPI)=>{

    let token = thunkAPI.getState().auth.user.token
    try {

        return await shopservice.fetchshopdetails(token)
 
    } catch (error) {

        let message = error.response.data.message

        return thunkAPI.rejectWithValue(message)
    }
})

export const getshopproducts = createAsyncThunk("GET/SHOP/PRODUCTS" , async(_ , thunkAPI)=>{

    let shopid = JSON.parse(localStorage.getItem("shop"))._id

    try {

        return await shopservice.fetchshopproducts(shopid)
 
    } catch (error) {

        let message = error.response.data.message

        return thunkAPI.rejectWithValue(message)
    }
})

export const getshoporders = createAsyncThunk("GET/SHOP/ORDERS" , async(_ , thunkAPI)=>{

    let token = thunkAPI.getState().auth.user.token
    try {

        return await shopservice.fetchshoporders(token)
 
    } catch (error) {

        let message = error.response.data.message

        return thunkAPI.rejectWithValue(message)
    }
})

export const getshopcoupons = createAsyncThunk("GET/SHOP/COUPONS" , async(_ , thunkAPI)=>{

        let token = thunkAPI.getState().auth.user.token
     let shopid = thunkAPI.getState().shop.shop._id
    try {

        return await shopservice.fetchshopcoupons(token ,shopid)
 
    } catch (error) {

        let message = error.response.data.message

        return thunkAPI.rejectWithValue(message)
    }
})


export const addproduct = createAsyncThunk("ADD/SHOP/PRODUCT" , async(FormData , thunkAPI)=>{

        let token = thunkAPI.getState().auth.user.token
    try {

        return await shopservice.createproduct(token ,FormData)
 
    } catch (error) {

        let message = error.response.data.message

        return thunkAPI.rejectWithValue(message)
    }
})


export const productupdate = createAsyncThunk("UPDATE/SHOP/PRODUCT" , async(FormData , thunkAPI)=>{

        let token = thunkAPI.getState().auth.user.token
    try {

        return await shopservice.updateproduct(token ,FormData)
 
    } catch (error) {

        let message = error.response.data.message

        return thunkAPI.rejectWithValue(message)
    }
})


export const orderupdate = createAsyncThunk("UPDATE/SHOP/ORDER" , async(orderdetails , thunkAPI)=>{

        let token = thunkAPI.getState().auth.user.token
    try {

        return await shopservice.updateorder(token ,orderdetails)
 
    } catch (error) {

        let message = error.response.data.message

        return thunkAPI.rejectWithValue(message)
    }
})


export const createcoupon = createAsyncThunk("CREATE/SHOP/COUPON" , async(formData , thunkAPI)=>{

        let token = thunkAPI.getState().auth.user.token
    try {

        return await shopservice.couponcreate(token ,formData)
 
    } catch (error) {

        let message = error.response.data.message

        return thunkAPI.rejectWithValue(message)
    }
})


