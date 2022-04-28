import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { getCurrencyStart, getCurrencySuccess, getCurrencyFailure } from "./currencyRedux";
import { publicRequest } from "../requestMethods";


const currencies = [
  {
    name: 'US Dollar',
    code: 'USD',
    symbol: '\uff04',
    rate: 1,
    countryName: 'United States of America',
    countryCode: 'US',
  },
  {
    name: 'Naira',
    code: 'NGN',
    symbol: '\u20a6',
    rate: 411,
    countryName: 'Nigeria',
    countryCode: 'NG',
  },
  {
    name: 'Pound',
    code: 'GBP',
    symbol: '\uffe1',
    rate: 0.7346,
    countryName: 'United Kingdom',
    countryCode: 'UK',
  },
  {
    name: 'Euro',
    code: 'EUR',
    symbol: '\u20ac',
    rate: 0.8641,
    countryName: 'Europe',
    countryCode: 'EU',
  },
];

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const getCurrency = async (id, dispatch) => {
  dispatch(getCurrencyStart());
  let currency = {};
  try {
    // const res = await publicRequest.get(`/currency/find/${id}`);
    currencies.map(cur => {
      if (cur.code === id) {
        currency = cur;
      }
    });
    dispatch(getCurrencySuccess(currency));
  } catch (err) {
    dispatch(getCurrencyFailure());
  }

};