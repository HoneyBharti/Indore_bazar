import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminservice from "./adminservice";


const adminslice = createSlice({
 name : "admin",

    initialState : {
       
        adminloading : false ,
        adminerror : false ,
        adminsuccess : false ,
        adminerrormsg: "",
        allusers : [],
        allshops : [],
        allorders : []

    },
    reducers : {},
    extraReducers : (builder) => {
        builder 
        .addCase(getallusers.pending , (state , action)=>{
            state.adminloading = true,
            state.adminsuccess = false ,
            state.adminerror = false
        })
          .addCase(getallusers.fulfilled , (state , action)=>{
            state.adminloading = false,
            state.adminsuccess = true ,
            state.adminerror = false,
            state.allusers = action.payload
        })

          .addCase(getallusers.rejected , (state , action)=>{
            state.adminloading = false,
            state.adminsuccess = false ,
            state.adminerror = true,
            state.adminerrormsg = action.payload
        })

         .addCase(getallorders.pending , (state , action)=>{
            state.adminloading = true,
            state.adminsuccess = false ,
            state.adminerror = false
        })
          .addCase(getallorders.fulfilled , (state , action)=>{
            state.adminloading = false,
            state.adminsuccess = true ,
            state.adminerror = false,
            state.allorders = action.payload
        })

          .addCase(getallorders.rejected , (state , action)=>{
            state.adminloading = false,
            state.adminsuccess = false ,
            state.adminerror = true,
            state.adminerrormsg = action.payload
        })

         .addCase(getallshops.pending , (state , action)=>{
            state.adminloading = true,
            state.adminsuccess = false ,
            state.adminerror = false
        })
          .addCase(getallshops.fulfilled , (state , action)=>{
            state.adminloading = false,
            state.adminsuccess = true ,
            state.adminerror = false,
            state.allshops = action.payload
        })

          .addCase(getallshops.rejected , (state , action)=>{
            state.adminloading = false,
            state.adminsuccess = false ,
            state.adminerror = true,
            state.adminerrormsg = action.payload
        })

         .addCase(shopupdate.pending , (state , action)=>{
            state.adminloading = true,
            state.adminsuccess = false ,
            state.adminerror = false
        })
          .addCase(shopupdate.fulfilled , (state , action)=>{
            state.adminloading = false,
            state.adminsuccess = true ,
            state.adminerror = false,
            state.allshops = state.allshops.map(shop=> shop._id == action.payload._id ? action.payload : shop)
        })

          .addCase(shopupdate.rejected , (state , action)=>{
            state.adminloading = false,
            state.adminsuccess = false ,
            state.adminerror = true,
            state.adminerrormsg = action.payload
        })


          .addCase(userupdate.pending , (state , action)=>{
            state.adminloading = true,
            state.adminsuccess = false ,
            state.adminerror = false
        })
          .addCase(userupdate.fulfilled , (state , action)=>{
            state.adminloading = false,
            state.adminsuccess = true ,
            state.adminerror = false,
            state.allusers = state.allusers.map(user=> user._id == action.payload._id ? action.payload : user)
        })

          .addCase(userupdate.rejected , (state , action)=>{
            state.adminloading = false,
            state.adminsuccess = false ,
            state.adminerror = true,
            state.adminerrormsg = action.payload
        })
    }
})


export default adminslice.reducer


export const getallusers = createAsyncThunk( "FETCH/ADMIN/USERS" , async(_ , thunkAPI)=>{

    let token = thunkAPI.getState().auth.user.token

    try {

        return await adminservice.fetchallusers(token)
        
    } catch (error) {

        let message = error.response.data.message

        return thunkAPI.rejectWithValue(message)
        
    }

})



export const getallorders = createAsyncThunk( "FETCH/ADMIN/ORDERS" , async(_ , thunkAPI)=>{

    let token = thunkAPI.getState().auth.user.token

    try {

        return await adminservice.fetchallorders(token)
        
    } catch (error) {

        let message = error.response.data.message

        return thunkAPI.rejectWithValue(message)
        
    }

})

export const getallshops = createAsyncThunk( "FETCH/ADMIN/SHOPS" , async(_ , thunkAPI)=>{

    let token = thunkAPI.getState().auth.user.token

    try {

        return await adminservice.fetchallshops(token)
        
    } catch (error) {

        let message = error.response.data.message

        return thunkAPI.rejectWithValue(message)
        
    }

})


export const shopupdate = createAsyncThunk( "UPDATE/ADMIN/SHOPS" , async(shopdetails , thunkAPI)=>{

  
    let token = thunkAPI.getState().auth.user.token

    try {

        return await adminservice.updateshop(shopdetails, token)
       
        
    } catch (error) {

        let message = error.response.data.message

        return thunkAPI.rejectWithValue(message)
        
    }

})


export const userupdate = createAsyncThunk( "UPDATE/ADMIN/USERS" , async(userdetails , thunkAPI)=>{

  
    let token = thunkAPI.getState().auth.user.token

    try {

        return await adminservice.updateuser(userdetails, token)
       
        
    } catch (error) {

        let message = error.response.data.message

        return thunkAPI.rejectWithValue(message)
        
    }

})