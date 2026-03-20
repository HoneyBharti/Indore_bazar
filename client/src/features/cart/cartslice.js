import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartservice from "./cartservice";

const cartslice = createSlice({

    name : "cart",
    initialState : {
        cartitems : null ,
        cartloading : false,
        carterror : false,
        cartsuccess : false,
        carterrormsg : ""
    },
    reducers : {},
    extraReducers : (builder)=>{
        builder
        .addCase(addproductincart.pending , (state , action)=>{
            state.cartloading = true
            state.carterror = false 
            state.cartsuccess = false 
        })

          .addCase(addproductincart.fulfilled , (state , action)=>{
            state.cartloading = false
            state.carterror = false 
            state.cartsuccess = true
            state.cartitems = action.payload 
        })

          .addCase(addproductincart.rejected , (state , action)=>{
            state.cartloading = false
            state.carterror = true 
            state.cartsuccess = false 
            state.carterrormsg = action.payload
        })


          .addCase(getcart.pending , (state , action)=>{
            state.cartloading = true
            state.carterror = false 
            state.cartsuccess = false 
        })

          .addCase(getcart.fulfilled , (state , action)=>{
            state.cartloading = false
            state.carterror = false 
            state.cartsuccess = true
            state.cartitems = action.payload 
        })

          .addCase(getcart.rejected , (state , action)=>{
            state.cartloading = false
            state.carterror = true 
            state.cartsuccess = false 
            state.carterrormsg = action.payload
        })

              .addCase(removeitemfromcart.pending , (state , action)=>{
            state.cartloading = true
            state.carterror = false 
            state.cartsuccess = false 
        })

          .addCase(removeitemfromcart.fulfilled , (state , action)=>{
            state.cartloading = false
            state.carterror = false 
            state.cartsuccess = true
            state.cartitems = action.payload
        })

          .addCase(removeitemfromcart.rejected , (state , action)=>{
            state.cartloading = false
            state.carterror = true 
            state.cartsuccess = false 
            state.carterrormsg = action.payload
        })

            .addCase(updatecart.pending , (state , action)=>{
            state.cartloading = true
            state.carterror = false 
            state.cartsuccess = false 
        })

          .addCase(updatecart.fulfilled , (state , action)=>{
            state.cartloading = false
            state.carterror = false 
            state.cartsuccess = true
            state.cartitems = action.payload
        })

          .addCase(updatecart.rejected , (state , action)=>{
            state.cartloading = false
            state.carterror = true 
            state.cartsuccess = false 
            state.carterrormsg = action.payload
        })

         .addCase(createorder.pending , (state , action)=>{
            state.cartloading = true
            state.carterror = false 
            state.cartsuccess = false 
        })

          .addCase(createorder.fulfilled , (state , action)=>{
            state.cartloading = false
            state.carterror = false 
            state.cartsuccess = true
            state.cartitems = []
        })

          .addCase(createorder.rejected , (state , action)=>{
            state.cartloading = false
            state.carterror = true 
            state.cartsuccess = false 
            state.carterrormsg = action.payload
        })

    }
})

export default cartslice.reducer

export const addproductincart = createAsyncThunk("ADD/CART" , async(cartItems , thunkAPI)=>{

    let token = thunkAPI.getState().auth.user.token

    try {

    return await cartservice.addtocart(token , cartItems )

        
    } catch (error) {

        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
        
    }
})

export const getcart = createAsyncThunk("GET/CART" , async(_ , thunkAPI)=>{

    let token = thunkAPI.getState().auth.user.token

    try {

    return await cartservice.fetchcart(token )

        
    } catch (error) {

        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
        
    }
})


export const removeitemfromcart = createAsyncThunk("REMOVE/CART" , async(pid , thunkAPI)=>{

    let token = thunkAPI.getState().auth.user.token

    try {

    return await cartservice.removecart(token , pid )

        
    } catch (error) {

        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
        
    }
})

export const updatecart = createAsyncThunk("UPDATE/CART" , async(cartDetails , thunkAPI)=>{

    let token = thunkAPI.getState().auth.user.token

    try {

    return await cartservice.cartupdate(token , cartDetails )

        
    } catch (error) {

        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
        
    }
})


export const createorder = createAsyncThunk("CREATE/ORDER" , async(couponcode , thunkAPI)=>{

    let token = thunkAPI.getState().auth.user.token

    try {

    return await cartservice.ordercreate(token , {couponcode : couponcode} )

        
    } catch (error) {

        let message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
        
    }
})