import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

// Simple rate limiting (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX = 100 // requests per window

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const userLimit = rateLimitMap.get(ip)

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (userLimit.count >= RATE_LIMIT_MAX) {
    return false
  }

  userLimit.count++
  return true
}

export default withAuth(
  function middleware(req) {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    if (!checkRateLimit(ip)) {
      return new NextResponse('Too Many Requests', { status: 429 })
    }

    const token = req.nextauth.token
    const isAuth = !!token
    const isAuthPage = req.nextUrl.pathname.startsWith('/auth')
    const isCheckoutPage = req.nextUrl.pathname.startsWith('/checkout')
    const isAdminPage = req.nextUrl.pathname.startsWith('/admin')
    const isApiRoute = req.nextUrl.pathname.startsWith('/api')

    // Security headers for API routes
    if (isApiRoute) {
      const response = NextResponse.next()

      // Add security headers
      response.headers.set('X-DNS-Prefetch-Control', 'on')
      response.headers.set('X-XSS-Protection', '1; mode=block')
      response.headers.set('X-Frame-Options', 'DENY')
      response.headers.set('X-Content-Type-Options', 'nosniff')
      response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

      // CORS headers
      response.headers.set('Access-Control-Allow-Origin', process.env.NODE_ENV === 'production' ? 'https://yourdomain.com' : 'http://localhost:3000')
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')

      return response
    }

    // Si no está autenticado y trata de acceder a checkout
    if (!isAuth && isCheckoutPage) {
      return NextResponse.redirect(new URL('/auth/login', req.url))
    }

    // Si no está autenticado y trata de acceder a admin
    if (!isAuth && isAdminPage) {
      return NextResponse.redirect(new URL('/auth/login', req.url))
    }

    // Si está autenticado pero no es admin y trata de acceder a admin
    if (isAuth && isAdminPage && token.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', req.url))
    }

    // Si está autenticado y trata de acceder a páginas de auth, redirigir al home
    if (isAuth && isAuthPage) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => true, // Dejamos que el middleware maneje la lógica
    },
  }
)

export const config = {
  matcher: ['/checkout/:path*', '/admin/:path*', '/auth/:path*']
}