
import axios from "axios";
import UserType from "../types/users/Schema";

const BASE_URL = "https://reqres.in/api/users";

export const getUsers = (page = 1, perPage = 3) => {
  return axios.get(`${BASE_URL}?page=${page}&per_page=${perPage}`);
};

export const getUserById = (id: number) => {
  return axios.get(`${BASE_URL}/${id}`);
};

export const updateUser = (id: number, UserData: Partial<UserType>) => {
  return axios.put(`${BASE_URL}/${id}`, UserData);
};

export const addUser = (userData: Omit<UserType, "id">) => 
    axios.post(`${BASE_URL}`, userData);

export const deleteUser = (id: number) => {
  return axios.delete(`${BASE_URL}/${id}`);
};
