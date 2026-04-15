export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  product: string; // Product ID
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface ShippingAddress {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
}

export interface Order {
  _id: string;
  user: string; // User ID
  items: OrderItem[];
  totalItems: number;
  totalPrice: number;
  shippingAddress: ShippingAddress;
  status: OrderStatus;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderInput {
  shippingAddress: ShippingAddress;
  comment?: string;
}

export interface UpdateOrderStatusInput {
  status: OrderStatus;
}

export interface OrderListResponse {
  orders: Order[];
  total: number;
  page: number;
  limit: number;
}