import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

const model = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Content-Encoding': 'gzip',
    }
});

model.defaults.headers.get["Pragma"] = "no-cache";
model.defaults.headers.get["Cache-Control"] = "no-cache, no-store";

export default model;