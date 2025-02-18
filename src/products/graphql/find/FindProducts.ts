// import axios from "axios";

// const graphqlData = `
// query findProducts($skip:Int!, $limit: Int, $search: BaseSearch, $sort: ProductSort, $filter: ProductFilter){
//   findProducts(skip: $skip, limit: $limit, search: $search, sort: $sort, filter: $filter){
//     count
//     products{
//       id
//       title
//       active
//       brand
//       dealPrice
//       listPrice
//       mrp
//       code
//       description
//       rating
//       reviews
//       slug
//     }
//   }
// }`;

// export const FindProducts = async (skip: number, limit?: number, search?: {title: string}, 
//     sort?: {createdAt: "asc" | "desc", dealPrice: "asc" | "desc"}, 
//     filter?: {active?: boolean;
//     expired?: boolean;
//     handPicked?: boolean;}) => {
//   try {
//     const response = await axios({
//       url: "https://test-api.nine.deals/graphql",
//       method: "post",
//       headers: { "Content-Type": "application/json" },
//       data: {
//         query: graphqlData,
//         variables: {
//           skip,
//           limit,
//           search,
//           sort,
//           filter,
//         }
//       },
//     });
//     console.log("response",response);
//     const data = await response.data;
//     console.log("response data",response.data);
//     return data.data.findProducts;
//   } catch (err) {
//     console.error(err);
//   }
// };



import axios from "axios";

const graphqlData = `
query findProducts($skip:Int!, $limit: Int, $search: BaseSearch, $sort: ProductSort, $filter: ProductFilter){
  findProducts(skip: $skip, limit: $limit, search: $search, sort: $sort, filter: $filter){
    count
    products{
      id
      title
      active
      brand
      dealPrice
      listPrice
      mrp
      code
      description
      rating
      reviews
      slug
    }
  }
}`;

interface Product {
  id: string;
  title: string;
  active: boolean;
  brand: string;
  dealPrice: number;
  listPrice: number;
  mrp: number;
  code: string;
  description: string;
  rating: number;
  reviews: number;
  slug: string;
}

interface FindProductsResponse {
  data: {
    findProducts: {
      count: number;
      products: Product[];
    };
  };
}

export const FindProducts = async (
  skip: number,
  limit?: number,
  search?: { title: string },
  sort?: { createdAt: "asc" | "desc"; dealPrice: "asc" | "desc" },
  filter?: { active?: boolean; expired?: boolean; handPicked?: boolean }
): Promise<FindProductsResponse["data"]["findProducts"] | null> => {
  try {
    const response = await axios.post<FindProductsResponse>(
      "https://test-api.nine.deals/graphql",
      {
        query: graphqlData,
        variables: { skip, limit, search, sort, filter },
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("response", response);

    if (response.data && response.data.data) {
      console.log("response data", response.data.data);
      return response.data.data.findProducts;
    }

    console.error("Unexpected response structure", response.data);
    return null;
  } catch (err) {
    console.error("GraphQL Fetch Error:", err);
    return null;
  }
};
