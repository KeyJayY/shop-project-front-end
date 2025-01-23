import axios from "axios";

export const verifyToken = async (token) => {
    try {
        const response = await axios.get("/auth/verifyToken", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.valid;
    } catch (error) {
        console.error("Błąd weryfikacji tokena:", error);
        return false;
    }
};