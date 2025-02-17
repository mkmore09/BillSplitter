import { Group, User, Expense } from "../types";
import { fetchData } from "../utils/fetchHelper.ts";

export const addExpense = async (description: string,amount :number,groupId:number ,userEmails: string[]): Promise<any> => {
  const token = sessionStorage.getItem('jwtToken');
  try {
    const data = await fetchData('/Expense/AddExpense', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({  description,amount, groupId,userEmails }),
    });

    return data; // Return data (could be a success message or group details)
  } catch (error) {
    console.error("Error creating group:", error);
    throw error;
  }
};