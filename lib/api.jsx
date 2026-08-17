import { useAuthStore } from "@/stores/authStores";
import axios from "axios";


export const apiRequest = async({
    method = "GET",
    url,
    data = null,
    requiresAuth = true,
}) => {
    const accessToken = useAuthStore.getState().accessToken;
    const refreshToken = useAuthStore.getState().refreshToken;
    const config = {
        method,
        url,
        data,
        headers: {
            "Content-Type": "application/json",
        },
    };
    if(requiresAuth && accessToken && url !==  "/api/auth/refresh") {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    if(url === "/api/auth/refresh") {
        config.headers.Authorization = `Bearer ${refreshToken}`;
    }
        const res = await axios(config);
         return res.data;
    
};
