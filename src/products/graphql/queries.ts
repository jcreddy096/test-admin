import axios from "axios";

// Define the types for the response data structure
interface Brand {
  id: number;
  title: string;
  active: boolean;
}

interface FindBrandsResponse {
  count: number;
  brands: Brand[];
}

const graphqlData = `
query findBrands($skip:Int!, $limit: Int, $search: BaseSearch, $sort: BaseSort, $filter: BaseFilter){
  findBrands(skip: $skip, limit: $limit, search: $search, sort: $sort, filter: $filter){
    count
    brands{
      id
      title
      active
    }
  }
}`;

export const queries = async (
  skip: number,
  limit?: number,
  search?: { title: string },
  sort?: "asc" | "desc",
  filter?: { active: boolean }
): Promise<FindBrandsResponse | undefined> => {
  try {
    const res = await axios({
      url: "https://test-api.nine.deals/graphql",
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: {
        query: graphqlData,
        variables: {
          skip,
          limit,
          search,
          sort,
          filter,
        },
      },
    });

    // Cast response to the expected type
    const data = res.data as { data: { findBrands: FindBrandsResponse } };
    return data.data.findBrands;
  } catch (err) {
    console.error(err);
    return undefined
  }
};




// import axios from "axios";
// import { useState } from "react";
// import { FindProductsResponse } from "../types/schema";

// // GraphQL query string to fetch products
// const graphqlQuery = `
//   query findProducts($skip: Int!, $limit: Int, $search: BaseSearch, $sort: BaseSort, $filter: BaseFilter) {
//     findProducts(skip: $skip, limit: $limit, search: $search, sort: $sort, filter: $filter) {
//       count
//       products {
//         id
//         title
//         description
//         dealPrice
//         listPrice
//         mrp
//         rating
//         reviews
//         images
//       }
//     }
//   }
// `;

// const useFetchProducts = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchProducts = async (
//     skip: number,
//     limit: number,
//     search: { title: string } | undefined,
//     sort: "asc" | "desc" | undefined,
//     filter: { active: boolean } | undefined
//   ) => {
//     const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2EwNjc3ODQyNmQ4YTYxZmVhMGU5MzAiLCJlbWFpbCI6ImludGVybnNAbWljcm9mb3guY28iLCJpYXQiOjE3Mzg3NDIxNjcsImV4cCI6MTc0MTMzNDE2N30.IjhVPhLugWCHjoTVFON-MGT-2b88JyDzCuGxuQ7sSmY"; // Replace with your actual token

//     setLoading(true);
//     setError(null);

//     try {
//       const res = await axios.post(
//         "https://test-api.nine.deals/graphql",
//         {
//           query: graphqlQuery,
//           variables: {
//             skip,
//             limit,
//             search,
//             sort,
//             filter,
//           },
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "Bearer " + AUTH_TOKEN,
//           },
//         }
//       );

//       // Parse the response data
//       const data = res.data as { data: { findProducts: FindProductsResponse } };

//       if (data.data.findProducts) {
//         setProducts(data.data.findProducts.products);
//       }
//     } catch (err) {
//       setError("Failed to fetch products");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { products, loading, error, fetchProducts };
// };

// export default useFetchProducts;
