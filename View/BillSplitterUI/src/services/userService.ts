import {  User } from "../types";
import { fetchData } from "../utils/fetchHelper.ts";

export const fetchUsers = async (): Promise<User[]> => {
const token = sessionStorage.getItem('jwtToken');
  return await fetchData('/User/GetAllUser',{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }});
};

export const fetchGroups = async (): Promise<User[]> => {
const token = sessionStorage.getItem('jwtToken');
  return await fetchData(`/User/GetGroups`,{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }});
};