# 🔌 Documentación de API - Konfort Total 2

Documentación completa de todos los endpoints de la API REST de Konfort Total 2.

## 📋 Información General

- **Base URL**: `https://tu-dominio.vercel.app/api`
- **Autenticación**: JWT tokens via NextAuth.js
- **Formato**: JSON
- **Encoding**: UTF-8

## 🔐 Autenticación

### Endpoints de Autenticación

#### POST `/api/auth/register`
Registra un nuevo usuario en el sistema.

**Request Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña_segura",
  "name": "Nombre Completo",
  "phone": "+53 5 123 4567",
  "address": "Dirección completa en Cuba"
}
```

**Response (201):**
```json
{
  "message": "Usuario registrado exitosamente",
  "user": {
    "id": "user_id",
    "email": "usuario@ejemplo.com",
    "name": "Nombre Completo",
    "phone": "+53 5 123 4567",
    "address": "Dirección completa en Cuba",
    "role": "CUSTOMER"
  }
}
```

**Errores:**
- `400`: Datos inválidos o usuario ya existe
- `500`: Error interno del servidor

#### POST `/api/auth/signin`
Inicia sesión (maneja NextAuth.js automáticamente).

---

## 🛍️ Productos

### GET `/api/products`
Obtiene lista de productos con filtros opcionales.

**Query Parameters:**
- `page` (number): Página actual (default: 1)
- `limit` (number): Productos por página (default: 8)
- `category` (string): Filtrar por categoría
- `search` (string): Búsqueda por nombre
- `minPrice` (number): Precio mínimo
- `maxPrice` (number): Precio máximo
- `sortBy` (string): Ordenar por (name, price, createdAt)
- `sortOrder` (string): Dirección del orden (asc, desc)

**Response (200):**
```json
{
  "products": [
    {
      "id": "product_id",
      "name": "Silla Moderna",
      "description": "Silla ergonómica para oficina",
      "price": 45.00,
      "material": "Madera y tela",
      "images": ["url_imagen1", "url_imagen2"],
      "stock": 25,
      "isActive": true,
      "category": {
        "id": "category_id",
        "name": "Sillas"
      },
      "createdAt": "2025-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 8,
    "total": 45,
    "pages": 6
  }
}
```

### GET `/api/products/[id]`
Obtiene detalles de un producto específico.

**Path Parameters:**
- `id` (string): ID del producto

**Response (200):**
```json
{
  "id": "product_id",
  "name": "Silla Moderna",
  "description": "Silla ergonómica para oficina",
  "price": 45.00,
  "material": "Madera y tela",
  "images": ["url_imagen1", "url_imagen2"],
  "stock": 25,
  "isActive": true,
  "category": {
    "id": "category_id",
    "name": "Sillas"
  },
  "createdAt": "2025-01-15T10:30:00Z"
}
```

**Errores:**
- `404`: Producto no encontrado

---

## 🛒 Pedidos

### POST `/api/orders`
Crea un nuevo pedido.

**Autenticación:** Requerida (JWT)

**Request Body:**
```json
{
  "items": [
    {
      "productId": "product_id_1",
      "quantity": 2,
      "price": 45.00
    },
    {
      "productId": "product_id_2",
      "quantity": 1,
      "price": 120.00
    }
  ],
  "total": 210.00,
  "shippingAddress": "Calle 23 #456, Vedado, La Habana",
  "paymentMethod": "efectivo"
}
```

**Response (201):**
```json
{
  "id": "order_id",
  "userId": "user_id",
  "total": 210.00,
  "status": "PENDING",
  "paymentMethod": "efectivo",
  "shippingAddress": "Calle 23 #456, Vedado, La Habana",
  "voucherPdf": "url_del_pdf_generado",
  "createdAt": "2025-01-20T14:30:00Z",
  "user": {
    "id": "user_id",
    "name": "Juan Pérez",
    "email": "juan@email.com",
    "phone": "+53 5 123 4567",
    "address": "Dirección del usuario"
  },
  "items": [
    {
      "id": "order_item_id_1",
      "productId": "product_id_1",
      "product": {
        "id": "product_id_1",
        "name": "Silla Moderna",
        "price": 45.00
      },
      "quantity": 2,
      "price": 45.00
    }
  ]
}
```

**Errores:**
- `401`: No autenticado
- `400`: Datos inválidos
- `500`: Error interno del servidor

---

## 👨‍💼 Administración

### GET `/api/admin/stats`
Obtiene estadísticas generales de ventas.

**Autenticación:** Requerida (Admin)

**Response (200):**
```json
{
  "totalRevenue": 15420.50,
  "totalOrders": 127,
  "topProducts": [
    {
      "productId": "product_id_1",
      "name": "Silla Moderna",
      "totalSold": 45
    }
  ],
  "salesByMonth": [
    {
      "month": "2025-01-01T00:00:00.000Z",
      "revenue": 4520.00,
      "orders": 23
    }
  ]
}
```

### GET `/api/admin/orders`
Lista todos los pedidos con filtros.

**Autenticación:** Requerida (Admin)

**Query Parameters:**
- `page` (number): Página actual (default: 1)
- `limit` (number): Pedidos por página (default: 10)
- `status` (string): Filtrar por estado (PENDING, CONFIRMED, etc.)

**Response (200):**
```json
{
  "orders": [
    {
      "id": "order_id",
      "userId": "user_id",
      "user": {
        "id": "user_id",
        "name": "Juan Pérez",
        "email": "juan@email.com"
      },
      "total": 210.00,
      "status": "PENDING",
      "paymentMethod": "efectivo",
      "shippingAddress": "Dirección de envío",
      "createdAt": "2025-01-20T14:30:00Z",
      "items": [
        {
          "id": "order_item_id",
          "productId": "product_id",
          "product": {
            "id": "product_id",
            "name": "Producto",
            "price": 45.00
          },
          "quantity": 2,
          "price": 45.00
        }
      ]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 127,
    "pages": 13
  }
}
```

### GET `/api/admin/orders/[id]`
Obtiene detalles completos de un pedido específico.

**Autenticación:** Requerida (Admin)

**Path Parameters:**
- `id` (string): ID del pedido

**Response (200):**
```json
{
  "id": "order_id",
  "userId": "user_id",
  "user": {
    "id": "user_id",
    "name": "Juan Pérez",
    "email": "juan@email.com",
    "phone": "+53 5 123 4567",
    "address": "Dirección completa"
  },
  "total": 210.00,
  "status": "PENDING",
  "paymentMethod": "efectivo",
  "shippingAddress": "Dirección de envío",
  "voucherPdf": "url_del_pdf",
  "createdAt": "2025-01-20T14:30:00Z",
  "updatedAt": "2025-01-20T14:30:00Z",
  "items": [
    {
      "id": "order_item_id",
      "productId": "product_id",
      "product": {
        "id": "product_id",
        "name": "Producto",
        "price": 45.00
      },
      "quantity": 2,
      "price": 45.00
    }
  ]
}
```

### PUT `/api/admin/orders/[id]`
Actualiza el estado de un pedido.

**Autenticación:** Requerida (Admin)

**Path Parameters:**
- `id` (string): ID del pedido

**Request Body:**
```json
{
  "status": "CONFIRMED"
}
```

**Response (200):**
```json
{
  "id": "order_id",
  "status": "CONFIRMED",
  "updatedAt": "2025-01-20T15:00:00Z"
}
```

---

## 📂 Categorías

### GET `/api/categories`
Obtiene lista de todas las categorías.

**Response (200):**
```json
{
  "categories": [
    {
      "id": "category_id",
      "name": "Sillas"
    },
    {
      "id": "category_id_2",
      "name": "Mesas"
    }
  ]
}
```

---

## 📊 Códigos de Estado HTTP

### Respuestas Exitosas
- `200`: OK - Solicitud exitosa
- `201`: Created - Recurso creado exitosamente

### Errores del Cliente
- `400`: Bad Request - Datos inválidos
- `401`: Unauthorized - Autenticación requerida
- `403`: Forbidden - Permisos insuficientes
- `404`: Not Found - Recurso no encontrado

### Errores del Servidor
- `500`: Internal Server Error - Error interno

## 🔒 Autenticación y Autorización

### Headers Requeridos
```
Authorization: Bearer <jwt_token>
```

### Roles de Usuario
- `CUSTOMER`: Cliente regular
- `ADMIN`: Administrador del sistema

### Endpoints Protegidos
- Todos los endpoints `/api/admin/*` requieren rol `ADMIN`
- `/api/orders` requiere autenticación de usuario

## 📝 Validaciones

### Usuario
- `email`: Formato válido de email
- `password`: Mínimo 8 caracteres
- `name`: No vacío, máximo 100 caracteres
- `phone`: Formato cubano (+53)
- `address`: No vacío, máximo 500 caracteres

### Producto
- `name`: No vacío, máximo 200 caracteres
- `description`: Máximo 1000 caracteres
- `price`: Número positivo
- `stock`: Número entero no negativo
- `images`: Array de URLs válidas

### Pedido
- `items`: Array no vacío de items válidos
- `total`: Número positivo que coincide con suma de items
- `shippingAddress`: No vacío, máximo 500 caracteres

## 🚀 Rate Limiting

- **Productos**: 100 requests/minuto por IP
- **Pedidos**: 20 requests/minuto por usuario autenticado
- **Admin**: 50 requests/minuto por admin

## 📋 Versionado

- **Versión actual**: v1.0.0
- **Endpoint base**: `/api/v1/`
- **Compatibilidad**: Se mantiene por 12 meses

## 🧪 Testing

### Ejemplos de Testing con cURL

#### Crear usuario
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Usuario Test"
  }'
```

#### Obtener productos
```bash
curl "http://localhost:3000/api/products?page=1&limit=5"
```

#### Crear pedido (requiere autenticación)
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "items": [{"productId": "product_id", "quantity": 1, "price": 45.00}],
    "total": 45.00,
    "shippingAddress": "Dirección de prueba",
    "paymentMethod": "efectivo"
  }'
```

---

*Documentación actualizada: Septiembre 2025*