let IS_PROD = true;
const server = process.env.NODE_ENV === 'production' 
    ? (process.env.REACT_APP_API_URL || "https://apnacollegebackend.onrender.com")
    : "http://localhost:8000";


export default server;