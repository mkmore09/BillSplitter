import { Group, User, Expense } from "../types";
import { fetchData } from "../utils/fetchHelper.ts";

export const login = async (email: string, password: string): Promise<string> => {
  try {
    const data = await fetchData('/Auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });

    return data; 
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  sessionStorage.removeItem('jwt_token');
};


export const register = async (name: string, email: string, password: string): Promise<any> => {
  try{
  const response = await fetch('https://localhost:7267/api/User/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    throw new Error('Registration failed');
  }

  const data = await response.json();
  return data; // Return data (could be a success message or user details)
}
  catch(error){
    console.log(error);
  }
};