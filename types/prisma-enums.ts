// Tipos personalizados para Prisma
// Esto soluciona el problema de que los tipos no se exportan correctamente desde @prisma/client

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export enum Role {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN'
}

// Tipos basados en el schema de Prisma
export interface User {
  id: string
  email: string
  name: string
  password?: string | null
  phone?: string | null
  address?: string | null
  role: Role
  createdAt: Date
  updatedAt: Date
}

export interface Product {
  id: string
  name: string
  description?: string | null
  price: number
  costPrice?: number | null
  categoryId: string
  material?: string | null
  images: string
  stock: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
}

export interface Order {
  id: string
  userId: string
  total: number
  status: OrderStatus
  paymentMethod: string
  shippingAddress: string
  shippingCost: number
  voucherPdf?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  quantity: number
  price: number
}

export interface Account {
  id: string
  userId: string
  type: string
  provider: string
  providerAccountId: string
  refresh_token?: string | null
  access_token?: string | null
  expires_at?: number | null
  token_type?: string | null
  scope?: string | null
  id_token?: string | null
  session_state?: string | null
}

export interface Session {
  id: string
  sessionToken: string
  userId: string
  expires: Date
}