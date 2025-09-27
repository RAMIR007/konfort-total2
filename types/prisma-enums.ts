// Tipos personalizados para enums de Prisma
// Esto soluciona el problema de que los enums no se exportan correctamente desde @prisma/client

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

// Re-exportar tipos de Prisma que sí funcionan
export type { User, Product, Category, Order, OrderItem, Account, Session } from '@prisma/client'