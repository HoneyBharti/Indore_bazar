import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authservice from "./authservice";

let userexist = JSON.parse(localStorage.getItem("user"))

const authslice = createSlice({

    name : "auth" ,
    initialState : {
        user : userexist || null ,
        orders : [],
        shopStatus : false,
        isloading : false,
        iserror : false,
        issuccess : false,
        message : ""
    },
    reducers :{}, 
    extraReducers: (builder)=>{
        builder
        .addCase(registeruser.pending , (state , action)=>{
            state.isloading = true
            state.iserror = false
            state.issuccess = false
        })

         .addCase(registeruser.fulfilled , (state , action)=>{
            state.isloading = false
            state.iserror = false
            state.issuccess = true
            state.user = action.payload
        })

         .addCase(registeruser.rejected , (state , action)=>{
            state.isloading = false
            state.iserror = true
            state.issuccess = false
            state.message = action.payload
        })


          .addCase(loginuser.pending , (state , action)=>{
            state.isloading = true
            state.iserror = false
            state.issuccess = false
        })

         .addCase(loginuser.fulfilled , (state , action)=>{
            state.isloading = false
            state.iserror = false
            state.issuccess = true
            state.user = action.payload
        })

         .addCase(loginuser.rejected , (state , action)=>{
            state.isloading = false
            state.iserror = true
            state.issuccess = false
            state.message = action.payload
        })

           .addCase(logoutuser.fulfilled , (state , action)=>{
            state.isloading = false
            state.iserror = false
            state.issuccess = false
            state.user = null
        })


           .addCase(getmyorders.pending , (state , action)=>{
            state.isloading = true
            state.iserror = false
            state.issuccess = false
    
        })

         .addCase(getmyorders.fulfilled , (state , action)=>{
            state.isloading = false
            state.iserror = false
            state.issuccess = true
            state.orders = action.payload
            
        })

           .addCase(getmyorders.rejected , (state , action)=>{
            state.isloading = false
            state.iserror = true
            state.issuccess = false
            state.message = action.payload
        })


          .addCase(cancelorder.pending , (state , action)=>{
            state.isloading = true
            state.iserror = false
            state.issuccess = false
    
        })

         .addCase(cancelorder.fulfilled , (state , action)=>{
            state.isloading = false
            state.iserror = false
            state.issuccess = true
            state.orders = state.orders.map(order=>  order._id === action.payload._id ? action.payload : order)
            
        })

           .addCase(cancelorder.rejected , (state , action)=>{
            state.isloading = false
            state.iserror = true
            state.issuccess = false
            state.message = action.payload
        })

          .addCase(shopownerrequest.pending , (state , action)=>{
            state.isloading = true
            state.iserror = false
            state.issuccess = false
    
        })

         .addCase(shopownerrequest.fulfilled , (state , action)=>{
            state.isloading = false
            state.iserror = false
            state.issuccess = true
            state.shopStatus = true
        })

           .addCase(shopownerrequest.rejected , (state , action)=>{
            state.isloading = false
            state.iserror = true
            state.issuccess = false
            state.message = action.payload
        })
    }
})

export const {} = authslice.actions
export default authslice.reducer


export const registeruser =createAsyncThunk("AUTH/REGISTER" , async(formData , thunkAPI)=>{

    try {
        
        return await authservice.register(formData)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})


export const loginuser =createAsyncThunk("AUTH/LOGIN" , async(formData , thunkAPI)=>{

    try {
        
        return await authservice.login(formData)
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const logoutuser =createAsyncThunk("AUTH/LOGOUT" , async( )=>{

    localStorage.removeItem("user")
    localStorage.removeItem("shop")

  
})

export const getmyorders = createAsyncThunk("GET/AUTH/ORDERS" , async(_ , thunkAPI)=>{

    let token = thunkAPI.getState().auth.user.token

    try {

  return await authservice.fetchmyorders(token)
        
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const cancelorder = createAsyncThunk("CANCEL/AUTH/ORDERS" , async(orderdetails , thunkAPI)=>{

    let token = thunkAPI.getState().auth.user.token

    try {

  return await authservice.ordercancel(token , orderdetails)
        
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})


export const shopownerrequest = createAsyncThunk("AUTH/SHOP/REQUEST" , async(shopdetails , thunkAPI)=>{

    let token = thunkAPI.getState().auth.user.token

    try {

  return await authservice.requestforshop(token, shopdetails )
        
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})