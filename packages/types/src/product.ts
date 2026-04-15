export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  weight: number;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductInput {
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  weight: number;
  inStock: boolean;
}

export interface ProductUpdateInput {
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  category?: string;
  weight?: number;
  inStock?: boolean;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}