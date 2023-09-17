import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  userInfo: null,
  isAuthenticated: false,
  buyNowProduct: null,
  allProducts:[],
  orders: [],
  cancelOrders: [],
  returnOrders: [],
};

export const amazonSlice = createSlice({
  name: 'amazon',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = state.products.find((product) => product.title === action.payload.title);
      if (product) {
        product.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter((product) => product.title !== action.payload);
    },
    resetCart: (state) => {
      state.products = [];
    },
    increaseQuantity: (state, action) => {
      const product = state.products.find(product => product.title === action.payload);
      product.quantity++;
    },
    decreaseQuantity: (state, action) => {
      const product = state.products.find((product) => product.title === action.payload);
      if (product.quantity === 1) {
        product.quantity = 1;
      } else {
        product.quantity--;
      }
    },

    // UserInfo Reducers Start Here
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    userSignOut: (state) => {
      state.userInfo = null;
    },

    // User Authentication
    setUserAuthentication: (state, action) => {
      state.isAuthenticated = action.payload;
    },

    // Buy Now Product Reducers
    buyNow: (state,action)=>{
      state.buyNowProduct = action.payload;
    }, 
    resetBuyNowProduct: (state) => {
      state.buyNowProduct = null;
    },

    addToOrders: (state, action) => {
      state.orders = action.payload;
      //  state.orders.push(action.payload);
    },
    cancelOrder: (state, action) => {
      state.cancelOrders = state.cancelOrders.push(action.payload);
      state.orders = state.orders.filter((product) => product.title !== action.payload);
    },
    resetOrders: (state) => {
      state.orders = [];
    },

    addTocancelOrders: (state, action) => {
      state.cancelOrders = action.payload;
    },
 
    resetCancelOrders: (state) => {
      state.cancelOrders = [];
    },


    addToreturnOrders: (state, action) => {
      state.returnOrders = action.payload;
    },
   
    resetReturnOrders: (state) => {
      state.returnOrders = [];
    },

  },
})

// Action creators are generated for each case reducer function
export const { addToCart, deleteProduct, resetCart, decreaseQuantity, increaseQuantity, setUserInfo, userSignOut, setUserAuthentication,buyNow,resetBuyNowProduct, addToOrders, cancelOrder, resetOrders, addToreturnOrders, addTocancelOrders, resetCancelOrders, resetReturnOrders} = amazonSlice.actions;
// addToUserCart, resetUserCart

export default amazonSlice.reducer;