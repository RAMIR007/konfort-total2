import NextAuth from 'next-auth'
import { Role } from '@/types/prisma-enums'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: Role
      phone?: string
      address?: string
    }
  }

  interface User {
    id: string
    email: string
    name: string
    role: Role
    phone?: string
    address?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    sub: string
    role: Role
    email: string
    name: string
  }
}

// Tipos adicionales para mejor type safety
export interface AuthUser extends NextAuth.User {
  role: Role
  phone?: string
  address?: string
}

export interface AuthSession extends NextAuth.Session {
  user: AuthUser
}