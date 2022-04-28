import {createSlice} from "@reduxjs/toolkit";

const currencySlice = createSlice({
    name: "currency",
    initialState : {
        currency: {
            name: 'US Dollar',
            code: 'USD',
            symbol: '\uff04',
            rate: 1,
            countryName: 'United States of America',
            countryCode: 'US',
        },
        isFetching: false,
        error: false,
    },
    reducers: {
       //GET CURRENCY
      getCurrencyStart: (state) => {
        state.isFetching = true;
        state.error = false;
      },
      getCurrencySuccess: (state, action) => {
        state.isFetching = false;
        state.currency = action.payload;
      },
      getCurrencyFailure: (state) => {
        state.isFetching = false;
        state.error = true;
      },
    },
});

export const { getCurrencyStart, getCurrencySuccess, getCurrencyFailure } = currencySlice.actions;
export default currencySlice.reducer;