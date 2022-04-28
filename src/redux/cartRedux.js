import {createSlice} from "@reduxjs/toolkit";

function getTotal (state) {
    let amount = 0;
        state.products.map((x) => {
            amount += x.price * x.quantity;
        });
    return amount;
}

function getQuantity (state) {
    let count = 0;
        state.products.map((x) => {
            count += 1;
        });
    return count;
}

const cartSlice = createSlice({
    name: "cart",
    initialState : {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            const exist = state.products.find((x) => x._id === action.payload._id && x.size === action.payload.size);

            if (exist) {
                let newproducts = state.products.map((x) => {
                    if ( x._id === action.payload._id && x.size === action.payload.size) {
                       return {...x, quantity: action.payload.quantity}
                    }
                    return x;
                });
                state.products = newproducts;
            } else {
                state.products.push(action.payload);
                state.quantity = getQuantity(state);
            }
            state.total = getTotal(state);
        },
        removeProduct: (state, action) => {
            state.products.splice(
                state.products.findIndex((x) =>  x._id === action.payload._id && x.size === action.payload.size),
                1
              );
            state.quantity = getQuantity(state);
            state.total = getTotal(state);
        },
        increaseCart: (state, action) => {
            //alert(JSON.stringify(action.payload));
            let newproducts = state.products.map((x) => {
                if ( x._id === action.payload._id && x.size === action.payload.size) {
                   return {...x, quantity: action.payload.quantity + 1}
                }
                return x;
            });
            state.products = newproducts;
            state.total = getTotal(state);
        },
        decreaseCart: (state, action) => {
            if(action.payload.quantity < 2) {
                state.products.splice(
                    state.products.findIndex((x) =>  x._id === action.payload._id && x.size === action.payload.size),
                    1
                  );
                state.quantity = getQuantity(state);
                state.total = getTotal(state);
            }else {
                let newproducts = state.products.map((x) => {
                    if ( x._id === action.payload._id && x.size === action.payload.size) {
                       return {...x, quantity: action.payload.quantity - 1}
                    }
                    return x;
                });
                state.products = newproducts;
                state.total = getTotal(state);
            }

        },
        clearCart: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        },
    },
});

export const { addProduct, removeProduct, increaseCart, decreaseCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;