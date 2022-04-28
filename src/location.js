import axios from "axios";

  export async function getUserIP() {
    try {
        const ip = await axios.get("http://api.ipify.org/");
        console.log(ip.data);
    } catch {}

  };