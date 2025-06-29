export const PRODUCT_URLS = {
  BASE_URL: 'https://dummyjson.com',
  PRODUCTS: '/products',
  PRODUCT_BY_ID: (id: number) => `/products/${id}`,
  SEARCH_PRODUCTS: '/products/search',
  CATEGORIES: '/products/categories',
} as const;