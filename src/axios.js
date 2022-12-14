import axios from "axios";

// Basis URL
const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
});

export default instance;