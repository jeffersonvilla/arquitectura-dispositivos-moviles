export const getProductsQuery = `
  query GetProducts {
      getProductsByCriteria {
          _id,
          name,
          price,
          category,
          stock
      }
  }
  `;

export const deleteProductMutation = `
  mutation DeleteProduct($productId: ID!) {
      deleteProduct(id: $productId)
  }
`;

export const updateProductMutation = `
  mutation UpdateProduct($productId: ID!, $name: String!, $price: Float!, $category: String!, $stock: Int!) {
      updateProduct(id: $productId, input: { name: $name, price: $price, category: $category, stock: $stock }) {
          _id
          name
          price
      }
  }
  `;

export const createProductMutation = `
  mutation CreateProduct($name: String!, $price: Float!, $category: String!, $stock: Int!) {
      createProduct(
          input: {
              name: $name, price: $price, category: $category, stock: $stock
          }) {
      _id
      name
      }
  }
  `; 
