export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export interface LoginRequest {
  username: string;
  password: string;
  expiresInMins?: number;
}

export interface LoginResponse extends User {
  accessToken: string;
  refreshToken: string;
}

export interface LoginType {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  authentication?: {
    accessToken?: string;
    refreshToken?: string;
    isAuthenticated?: boolean;
    isLoading?: boolean;
    user?: User;
  };
}

// Product Types
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

// Extended Product interface for detailed view
export interface ProductDetails extends Product {
  tags?: string[];
  sku?: string;
  weight?: number;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  reviews?: Review[];
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  meta?: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductState {
  products?: {
    data: Product[];
    loading: boolean;
    error: string | null;
    total: number;
  };
}

// Favorite Types
export interface FavoriteState {
  favorites?: {
    favoriteIds: number[];
    isLoading: boolean;
  };
} 