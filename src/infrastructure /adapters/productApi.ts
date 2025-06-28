import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product, ProductsResponse, ProductDetails } from '../../domain/types/redux';
import { GET_ALL_PRODUCTS_URL, GET_PRODUCT_BY_ID_URL } from '../api/urls/Product';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com',
  }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getAllProducts: builder.query<ProductsResponse, { limit?: number; skip?: number }>({
      query: ({ limit = 30, skip = 0 } = {}) => ({
        url: `/products?limit=${limit}&skip=${skip}`,
        method: 'GET',
      }),
      providesTags: ['Product'],
    }),
    getProductById: builder.query<ProductDetails, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),
  }),
});

export const { 
  useGetAllProductsQuery, 
  useGetProductByIdQuery,
  useLazyGetAllProductsQuery 
} = productApi; 