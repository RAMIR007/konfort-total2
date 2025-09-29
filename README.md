# 🏠 Konfort Total - Tienda en Línea de Muebles

Tienda en línea moderna y completa para muebles, especialmente diseñada para el mercado cubano. Desarrollada con las mejores prácticas de desarrollo web, incluyendo diseño responsivo, optimización de rendimiento, seguridad y accesibilidad.

## ✨ Características Principales

- 🛋️ **Catálogo completo de muebles** sin necesidad de registro
- 🛒 **Carrito de compras funcional** con gestión de cantidades
- 🔐 **Autenticación segura** con NextAuth.js
- 💰 **Sistema de pagos en efectivo** con generación automática de vales PDF
- 📊 **Panel administrativo** con estadísticas detalladas de ventas
- 📱 **Diseño responsivo** optimizado para móviles y desktop
- ♿ **Accesibilidad WCAG** compliant
- 🚀 **Despliegue optimizado** en Vercel
- 🌐 **Interfaz completamente en español**

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Next.js 15.5.4** - Framework React con App Router
- **TypeScript 5** - Tipado estático avanzado
- **Tailwind CSS 4.1.13** - Framework CSS utilitario optimizado
- **Recharts 3.2.1** - Gráficos interactivos y responsivos

### Backend
- **Next.js API Routes** - API RESTful con optimizaciones
- **Prisma ORM 6.16.2** - Object-Relational Mapping moderno
- **PostgreSQL** - Base de datos relacional (Prisma Data Platform)
- **NextAuth.js 4.24.11** - Autenticación segura y flexible

### Generación de Documentos
- **jsPDF 3.0.3** - Generación de vales PDF con QR

### Estado y Gestión
- **Zustand 5.0.8** - Gestión de estado del carrito optimizada

### Despliegue y DevOps
- **Vercel 48.1.6** - Plataforma de despliegue optimizada
- **GitHub Actions** - CI/CD automatizado
- **ESLint 9** - Linting moderno con configuración flat

## 📋 Prerrequisitos

- **Node.js** 20.x o superior (recomendado 22.x LTS)
- **npm** 18.x o superior (viene con Node.js)
- **PostgreSQL** database (recomendamos Prisma Data Platform)
- **Git** para control de versiones
- **Cuenta de Vercel** para despliegue (opcional)
- **Cuenta de Prisma Data Platform** para base de datos (opcional)

## 🚀 Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone https://github.com/RAMIR007/konfort-total.git
cd konfort-total
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Crea el archivo `.env` con la siguiente estructura:

```bash
cp .env.example .env
```

Edita `.env` con tus valores reales:

```env
# Base de datos PostgreSQL (Prisma Data Platform)
DATABASE_URL="postgres://username:password@db.prisma.io:5432/postgres?sslmode=require"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="tu_secret_muy_seguro_de_al_menos_32_caracteres_aqui"

# Vercel Blob (opcional, para imágenes)
BLOB_READ_WRITE_TOKEN="tu_token_de_vercel_blob"

# Entorno
NODE_ENV="development"
```

### 4. Configurar la Base de Datos

```bash
# Generar cliente Prisma (se ejecuta automáticamente con npm install)
npx prisma generate

# Ejecutar migraciones y crear base de datos
npx prisma db push

# Ver la base de datos en el navegador (opcional)
npx prisma studio
```

### 5. Ejecutar el Servidor de Desarrollo

```bash
# Desarrollo con Turbopack (rápido)
npm run dev

# Desarrollo estándar
npx next dev
```

La aplicación estará disponible en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
konfort-total/
├── app/                          # Páginas Next.js (App Router)
│   ├── (auth)/                   # Páginas de autenticación
│   ├── (dashboard)/              # Panel administrativo
│   ├── api/                      # API Routes
│   ├── cart/                     # Página del carrito
│   ├── checkout/                 # Página de checkout
│   ├── products/                 # Catálogo de productos
│   └── admin/                    # Panel administrativo
├── components/                   # Componentes React
│   ├── admin/                    # Componentes del admin
│   ├── cart/                     # Componentes del carrito
│   ├── layout/                   # Layout y navegación
│   ├── product/                  # Componentes de productos
│   └── ui/                       # Componentes de UI reutilizables
├── lib/                          # Utilidades y configuración
│   ├── auth/                     # Configuración de NextAuth
│   ├── pdf/                      # Generación de PDFs
│   ├── prisma/                   # Cliente Prisma
│   ├── stores/                   # Zustand stores
│   └── utils/                    # Utilidades
├── prisma/                       # Schema de base de datos
├── public/                       # Archivos estáticos
├── styles/                       # Estilos globales
└── types/                        # Definiciones TypeScript
```

## 🗄️ Base de Datos

### Esquema Principal

- **Users**: Usuarios del sistema (clientes y administradores)
- **Products**: Catálogo de productos con categorías
- **Orders**: Pedidos con items y estado
- **Categories**: Categorías de productos
- **Sessions/Accounts**: Autenticación NextAuth

### Comandos Útiles de Prisma

```bash
# Ver y editar base de datos en navegador
npx prisma studio

# Crear y aplicar migración (desarrollo)
npx prisma migrate dev

# Aplicar migraciones pendientes (producción)
npx prisma migrate deploy

# Resetear base de datos (¡cuidado con producción!)
npx prisma migrate reset

# Generar cliente Prisma
npx prisma generate

# Validar esquema Prisma
npx prisma validate

# Formatear esquema Prisma
npx prisma format
```

## 🔐 Autenticación

Utiliza NextAuth.js con las siguientes características:

- **Registro/Login** con email y contraseña
- **Sesiones JWT** para estado de autenticación
- **Protección de rutas** administrativa
- **Adaptador Prisma** para persistencia

## 📊 Panel Administrativo

Accesible en `/admin` con las siguientes funcionalidades:

- **Estadísticas de ventas**: Ingresos totales, número de pedidos
- **Productos más vendidos**: Ranking de productos
- **Gestión de pedidos**: Visualización y actualización de estados
- **Gestión de productos**: CRUD completo
- **Costos y ganancias**: Análisis financiero

## 🛒 Flujo de Compra

1. **Navegación**: Usuario explora catálogo sin registro
2. **Carrito**: Agrega productos al carrito
3. **Checkout**: Debe registrarse/login para proceder
4. **Pago**: Sistema de pago en efectivo
5. **Confirmación**: Generación automática de vale PDF

## 📄 Generación de Vales PDF

Los vales de pago se generan automáticamente con:

- Datos del cliente
- Detalles completos del pedido
- Código QR para validación
- Instrucciones de pago en efectivo

## 🚀 Despliegue en Producción

### Vercel (Recomendado)

1. **Conectar repositorio** en Vercel
2. **Configurar variables de entorno**:
   - `DATABASE_URL`: Connection string de Prisma Data Platform
   - `NEXTAUTH_URL`: URL de producción
   - `NEXTAUTH_SECRET`: Secret seguro
3. **Desplegar**: Vercel ejecuta build automáticamente

### Variables de Entorno en Producción

```env
DATABASE_URL=postgres://username:password@db.prisma.io:5432/postgres?sslmode=require
NEXTAUTH_URL=https://tu-dominio.vercel.app
NEXTAUTH_SECRET=un_secret_muy_seguro_de_al_menos_32_caracteres
NODE_ENV=production
```

## 🧪 Testing y Calidad de Código

```bash
# Linting (ESLint con configuración moderna)
npm run lint

# Type checking (TypeScript)
npx tsc --noEmit

# Build de producción (verifica todo)
npm run build

# Ejecutar script de pre-deploy check
npm run pre-deploy-check

# Verificar vulnerabilidades de seguridad
npm audit

# Ejecutar tests (cuando implementes)
npm test
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guías de Contribución

- Sigue las convenciones de código TypeScript
- Escribe commits descriptivos
- Actualiza documentación según cambios
- Prueba tus cambios antes de enviar PR

## 📝 API Endpoints

### Productos
- `GET /api/products` - Listar productos con filtros
- `GET /api/products/[id]` - Detalles de producto

### Autenticación
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/signin` - Login (maneja NextAuth)

### Pedidos
- `POST /api/orders` - Crear pedido
- `GET /api/admin/orders` - Listar pedidos (admin)

### Administración
- `GET /api/admin/stats` - Estadísticas de ventas
- `GET /api/admin/orders/[id]` - Detalles de pedido

## 🔒 Seguridad

- **Headers de seguridad** configurados en `vercel.json`
- **Validación de entrada** en todas las APIs
- **Autenticación requerida** para operaciones sensibles
- **SQL Injection prevention** con Prisma ORM
- **XSS protection** con sanitización de datos

## 📱 Características de Accesibilidad

- **Navegación por teclado** completa
- **Etiquetas ARIA** apropiadas
- **Contraste de colores** WCAG AA compliant
- **Texto alternativo** en imágenes
- **Estructura semántica** HTML5

## 🐛 Solución de Problemas

### Error de conexión a base de datos
- Verifica `DATABASE_URL` en `.env`
- Asegúrate de que Prisma Data Platform esté activo
- Revisa configuración en Prisma Data Platform Dashboard

### Error de build en producción
- Ejecuta `npm run build` localmente para verificar
- Verifica que no haya errores de TypeScript con `npx tsc --noEmit`
- Asegúrate de que todas las dependencias estén instaladas
- Revisa que las variables de entorno estén configuradas correctamente

### Problemas de autenticación
- Verifica `NEXTAUTH_SECRET` (mínimo 32 caracteres)
- Confirma `NEXTAUTH_URL` correcto (debe incluir https en producción)
- Revisa configuración de NextAuth en `lib/auth/config.ts`
- Verifica que la base de datos tenga las tablas de NextAuth

### Error de conexión a base de datos
- Verifica que `DATABASE_URL` sea correcta en `.env`
- Asegúrate de que Prisma Data Platform esté activo y accesible
- Revisa configuración en Prisma Data Platform Dashboard
- Verifica que el usuario y contraseña sean correctos

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Soporte

Para soporte técnico o preguntas:

- 📧 Email: [tu-email@ejemplo.com]
- 🐛 Issues: [GitHub Issues](https://github.com/RAMIR007/konfort-total/issues)
- 📖 Wiki: [Documentación completa](https://github.com/RAMIR007/konfort-total/wiki)

---

**Desarrollado con ❤️ para el mercado cubano**

---
*Última actualización: Septiembre 2025*
