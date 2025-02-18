import axios from "axios";

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

interface Brand {
  id: string;
  title: string;
  active: boolean;
}

interface FindBrandsResponse {
  data: {
    findBrands: {
      count: number;
      brands: Brand[];
    };
  };
}

export const Graphql = async (
  skip: number,
  limit?: number,
  search?: { title: string },
  sort?: "asc" | "desc",
  filter?: { active: boolean }
): Promise<FindBrandsResponse["data"]["findBrands"] | null> => {
  try {
    const response = await axios.post<FindBrandsResponse>(
      "https://test-api.nine.deals/graphql",
      {
        query: graphqlData,
        variables: { skip, limit, search, sort, filter },
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.data && response.data.data) {
      return response.data.data.findBrands;
    }

    console.error("Unexpected response structure", response.data);
    return null;
  } catch (err) {
    console.error("GraphQL Fetch Error:", err);
    return null;
  }
};
