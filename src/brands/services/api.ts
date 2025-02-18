
import axios from "axios";

const API_URL = "https://test-api.nine.deals/graphql";
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2EwNjc3ODQyNmQ4YTYxZmVhMGU5MzAiLCJlbWFpbCI6ImludGVybnNAbWljcm9mb3guY28iLCJpYXQiOjE3Mzg3NDIxNjcsImV4cCI6MTc0MTMzNDE2N30.IjhVPhLugWCHjoTVFON-MGT-2b88JyDzCuGxuQ7sSmY"; 



type GraphQLResponse<T> = {
    data: T;
  }
  
  type FindBrandsResponse = {
    findBrands: {
      count: number;
      brands: { id: string; title: string; active: boolean }[];
    };
  }



const graphqlRequest = async <T> (query: string, variables = {}): Promise<T> => {
  try {
    const response = await axios.post<GraphQLResponse<T>>(
      API_URL,
      { query, variables },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("GraphQL Error:", error);
    throw error;
  }
};

export const fetchBrands = async () :  Promise<FindBrandsResponse> => {
  const query = `
    query {
      findBrands {
        count
        brands {
          id
          title
          active
        }
      }
    }
  `;
  return await graphqlRequest<FindBrandsResponse>(query);
};

export const addBrand = async (brand: { title: string; active: boolean }) => {
  const mutation = `
    mutation($title: String!, $active: Boolean!) {
      addBrand(input: { title: $title, active: $active }) {
        id
        title
        active
      }
    }
  `;
  return await graphqlRequest(mutation, brand);
};


export const updateBrand = async (id: string, brand: { title: string; active: boolean }) => {
  const mutation = `
    mutation($id: ID!, $title: String!, $active: Boolean!) {
      updateBrand(id: $id, input: { title: $title, active: $active }) {
        id
        title
        active
      }
    }
  `;
  return await graphqlRequest(mutation, { id, ...brand });
};

export const deleteBrand = async (id: string) => {
  const mutation = `
    mutation($id: ID!) {
      deleteBrand(id: $id) {
        success
      }
    }
  `;
  return await graphqlRequest(mutation, { id });
};


