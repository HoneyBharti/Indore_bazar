import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productservice from "./productservice";


const productslice = createSlice({
    name : "product",
    initialState :{
        products : [],
        product : null,
        shops : [],
        shop : null ,
        productloading : false,
        producterror : false ,
        productsuccess : false,
        producterrormsg : ""
    },
    reducers : {} ,
    extraReducers : (builder) =>{
        builder
        .addCase(getallproducts.pending , (state , action)=>{
            state.productloading = true
            state.productsuccess= false
            state.producterror = false
        })

         .addCase(getallproducts.fulfilled , (state , action)=>{
            state.productloading = false
            state.productsuccess= true
            state.producterror = false
            state.products = action.payload
        })

         .addCase(getallproducts.rejected , (state , action)=>{
            state.productloading = false
            state.productsuccess= false
            state.producterror = true
            state.producterrormsg = action.payload
        })

         .addCase(getallshops.pending , (state , action)=>{
            state.productloading = true
            state.productsuccess= false
            state.producterror = false
        })

         .addCase(getallshops.fulfilled , (state , action)=>{
            state.productloading = false
            state.productsuccess= true
            state.producterror = false
            state.shops = action.payload
        })

         .addCase(getallshops.rejected , (state , action)=>{
            state.productloading = false
            state.productsuccess= false
            state.producterror = true
            state.producterrormsg = action.payload
        })

           .addCase(getsingleproduct.pending , (state , action)=>{
            state.productloading = true
            state.productsuccess= false
            state.producterror = false
        })

         .addCase(getsingleproduct.fulfilled , (state , action)=>{
            state.productloading = false
            state.productsuccess= true
            state.producterror = false
            state.product = action.payload
        })

         .addCase(getsingleproduct.rejected , (state , action)=>{
            state.productloading = false
            state.productsuccess= false
            state.producterror = true
            state.producterrormsg = action.payload
        })

          .addCase(getsingleshop.pending , (state , action)=>{
            state.productloading = true
            state.productsuccess= false
            state.producterror = false
        })

         .addCase(getsingleshop.fulfilled , (state , action)=>{
            state.productloading = false
            state.productsuccess= true
            state.producterror = false
            state.shop = action.payload
        })

         .addCase(getsingleshop.rejected , (state , action)=>{
            state.productloading = false
            state.productsuccess= false
            state.producterror = true
            state.producterrormsg = action.payload
        })

    }
})

export default productslice.reducer

export const getallproducts = createAsyncThunk("GET/PRODUCTS" , async(_ , thunkAPI)=>{

    try {

        return await productservice.fetchallproducts()
        
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }

})

export const getallshops = createAsyncThunk("GET/SHOPS" , async(_ , thunkAPI)=>{

    try {

        return await productservice.fetchallshops()
        
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }

})

export const getsingleproduct = createAsyncThunk("GET/PRODUCT" , async(pid, thunkAPI)=>{

    try {

        return await productservice.fetchsingleproduct(pid)
        
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }

})

export const getsingleshop = createAsyncThunk("GET/SHOP" , async(sid, thunkAPI)=>{

    try {

        return await productservice.fetchsingleshop(sid)
        
    } catch (error) {
        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }

})