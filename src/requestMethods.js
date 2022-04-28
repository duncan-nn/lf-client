import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/";
const BASE_URL = "https://lisafolawiyo-app.herokuapp.com/api/";

let TOKEN = "";

if (localStorage.getItem("persist:root")) {
    if (JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser) {
        TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;
    }
}

// JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser 
// ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken
// : "";

//console.log(TOKEN);

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header:{token:`Bearer ${TOKEN}`}
});