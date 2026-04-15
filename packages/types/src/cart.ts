export interface CartItem {
  product: string; // Product ID
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Cart {
  _id: string;
  user: string; // User ID
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface AddToCartInput {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemInput {
  productId: string;
  quantity: number;
}