import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAuth = !!token
    const isAuthPage = req.nextUrl.pathname.startsWith('/auth')
    const isCheckoutPage = req.nextUrl.pathname.startsWith('/checkout')
    const isAdminPage = req.nextUrl.pathname.startsWith('/admin')

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