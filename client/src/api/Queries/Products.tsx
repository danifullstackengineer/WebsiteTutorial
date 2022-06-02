import { gql } from "@apollo/client";

const getInitialProducts = gql`
  query GetAllProducts($offset: Int, $limit: Int) {
    getAllProducts(offset: $offset, limit: $limit) {
      _id
      name
      image
      price
      reviews {
        value
      }
      discount
    }
  }
`;

const getProductBasedOnType = gql`
  query GetProductsBasedOnType($type: SwordTypeType!) {
    getProductsBasedOnType(type: $type) {
      _id
      name
      image
      price
      reviews {
        value
      }
      discount
    }
  }
`;

export { getInitialProducts, getProductBasedOnType };
