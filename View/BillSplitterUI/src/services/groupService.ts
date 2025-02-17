import { Group, User, Expense } from "../types";
import { fetchData } from "../utils/fetchHelper.ts";

// Create a group
export const createGroup = async (groupName: string, userEmails: string[]): Promise<any> => {
  const token = sessionStorage.getItem('jwtToken');
  try {
    const data = await fetchData('/Group/CreateGroup', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ groupName, userEmails }),
    });

    return data; // Return data (could be a success message or group details)
  } catch (error) {
    console.error("Error creating group:", error);
    throw error;
  }
};

// Fetch groups
export const fetchGroups = async (): Promise<Group[]> => {
  const token = sessionStorage.getItem('jwtToken');
  return await fetchData('/Group/GetGroups',{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }});
};

// Fetch users by group
export const fetchUsersByGroup = async (groupId: number): Promise<User[]> => {
const token = sessionStorage.getItem('jwtToken');
  return await fetchData(`/Group/GetUsers/${groupId}`,{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }});
};

// Fetch expenses by group
export const fetchExpensesByGroup = async (groupId: number): Promise<Expense[]> => {
  const token = sessionStorage.getItem('jwtToken');
  return await fetchData(`/Group/GetExpenses/${groupId}`,{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }});
};
