import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product, ProductsResponse, ProductDetails } from '../../domain/types/redux';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com/',
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<ProductsResponse, { limit?: number; skip?: number }>({
      query: ({ limit = 20, skip = 0 } = {}) => `products?limit=${limit}&skip=${skip}`,
    }),
    getProductById: builder.query<ProductDetails, number>({
      query: (id) => `products/${id}`,
    }),
  }),
});

export const { 
  useGetAllProductsQuery, 
  useLazyGetAllProductsQuery,
  useGetProductByIdQuery 
} = productApi; 