// import axios from "axios";
// import UserType from "../types/Schema";

// const API_URL = "https://reqres.in/api/users";

// // ✅ Fetch All Users (with Pagination)
// export const getUsers = async (page: number, perPage: number) => {
//   return axios.get<{ data: UserType[] }>(`${API_URL}?page=${page}&per_page=${perPage}`);
// };

// // ✅ Fetch a Single User by ID
// export const getUserById = async (id: number) => {
//   return axios.get<{ data: UserType }>(`${API_URL}/${id}`);
// };

// // ✅ Update User (PUT)
// export const updateUser = async (id: number, userData: Partial<UserType>) => {
//   return axios.put(`${API_URL}/${id}`, userData);
// };

// // ✅ Update User (PATCH - Partial Update)
// export const patchUser = async (id: number, userData: Partial<UserType>) => {
//   return axios.patch(`${API_URL}/${id}`, userData);
// };

// // ✅ Delete User
// export const deleteUser = async (id: number) => {
//   return axios.delete(`${API_URL}/${id}`);
// };

// // ✅ Upload User Image (Mock Implementation)
// export const uploadUserImage = async (id: number, file: File) => {
//   const formData = new FormData();
//   formData.append("avatar", file);

//   return axios.post(`${API_URL}/${id}/upload`, formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
// };



import axios from "axios";
import UserType from "../types/Schema";

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
