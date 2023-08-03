import { createSlice } from "@reduxjs/toolkit";

const initialState={
    products:[],
    userInfo:null,
}

export const amazonSlice = createSlice({
    name:"amazon",
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const item =state.products.find((item)=>item.id===action.payload.id)
            if(item){
                item.quantity +=action.payload.quantity;
            }
            else{
                state.products.push(action.payload)
            }
            // state.products.push(action.payload)
        },
        removeFromCart:(state,action)=>{
            state.products= state.products.filter((item)=>item.id!==action.payload.id)
        },
        clearCart:(state)=>{
            state.products=[]
        },

        setUserInfo :(state,action)=>{
            state.userInfo= action.payload
        }
    }
})

export const{addToCart , removeFromCart, clearCart, setUserInfo} = amazonSlice.actions;
export default amazonSlice.reducer; 