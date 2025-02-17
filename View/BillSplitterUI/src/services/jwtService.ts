import { jwtDecode } from "jwt-decode"; // ✅ Use named import


export const getUserDataFromToken = () => {
  const token = sessionStorage.getItem("jwtToken"); // Retrieve token from Session Storage
  if (!token) return null; // Return null if no token is found

  try {
    const decodedToken: any = jwtDecode(token);
    return decodedToken; // Return decoded payload
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};