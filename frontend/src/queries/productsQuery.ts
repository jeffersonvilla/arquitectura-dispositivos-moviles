import { gql, DocumentNode } from "apollo-boost";

export const GET_PRODUCTS: DocumentNode = gql`
{
  getProductsByCriteria(filter: {
    #category: "Electronics", minPrice: 400
    }){
    _id,
    name,
    price,
    stock,
    category
}
}
`;