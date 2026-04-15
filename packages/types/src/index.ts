export type { UserRole, User, UserInput, LoginInput, AuthResponse } from './user';
export type {
  Product,
  ProductInput,
  ProductUpdateInput,
  ProductListResponse
} from './product';
export type {
  CartItem,
  Cart,
  AddToCartInput,
  UpdateCartItemInput
} from './cart';
export type {
  OrderStatus,
  OrderItem,
  ShippingAddress,
  Order,
  CreateOrderInput,
  UpdateOrderStatusInput,
  OrderListResponse
} from './order';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  error: string;
  message?: string;
}