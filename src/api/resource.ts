import axios from "axios";
import { ResourceType } from "../types/resource/schema";

const BASE_URL = "https://reqres.in/api/{resource}";

export const getResources = (resource: string, page = 1, perPage = 3) => {
  return axios.get(`${BASE_URL.replace("{resource}", resource)}?page=${page}&per_page=${perPage}`);
};

export const getResourceById = (resource: string, id: number) => {
  return axios.get(`${BASE_URL.replace("{resource}", resource)}/${id}`);
};

export const updateResource = (resource: string, id: number, resourceData: Partial<ResourceType>) => {
  return axios.put(`${BASE_URL.replace("{resource}", resource)}/${id}`, resourceData);
};

export const patchResource = (resource: string, id: number, resourceData: Partial<ResourceType>) => {
  return axios.patch(`${BASE_URL.replace("{resource}", resource)}/${id}`, resourceData);
};                           


export const addResource = (resource: string, resourceData: Omit<ResourceType, "id">) => {
  return axios.post(`${BASE_URL}/${resource}`, resourceData);
};


export const deleteResource = (resource: string, id: number) => {
  return axios.delete(`${BASE_URL.replace("{resource}", resource)}/${id}`);
};
