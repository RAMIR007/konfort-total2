# 📖 Manual de Usuario - Konfort Total

Bienvenido a **Konfort Total**, tu tienda en línea de muebles especializada para Cuba. Esta guía te ayudará a navegar y utilizar todas las funcionalidades de nuestra plataforma.

## 🎯 Inicio Rápido

### Para Clientes

1. **Explora el catálogo** sin necesidad de registrarte
2. **Regístrate** cuando estés listo para comprar
3. **Agrega productos** al carrito
4. **Completa tu compra** y recibe tu vale PDF

### Para Administradores

1. **Accede al panel** en `/admin`
2. **Gestiona productos** y pedidos
3. **Revisa estadísticas** de ventas
4. **Administra usuarios** y configuraciones

---

## 🛍️ Guía para Clientes

### 1. Explorando el Catálogo

#### Navegación Principal
- **Inicio**: Página principal con productos destacados
- **Productos**: Catálogo completo organizado por categorías
- **Categorías**: Filtra productos por tipo de mueble
- **Carrito**: Revisa tus productos seleccionados

#### Búsqueda y Filtros
- **Barra de búsqueda**: Busca por nombre de producto
- **Filtros por categoría**: Sillas, mesas, camas, etc.
- **Ordenamiento**: Por precio, nombre, fecha de agregado

#### Vista de Producto
Cada producto incluye:
- **Imágenes** de alta calidad
- **Descripción detallada**
- **Precio en CUP**
- **Material y dimensiones**
- **Stock disponible**
- **Botón "Agregar al carrito"**

### 2. Gestión del Carrito

#### Agregar Productos
1. En la página del producto, selecciona cantidad
2. Haz clic en "Agregar al carrito"
3. Continúa navegando o ve al carrito

#### Modificar Carrito
- **Cambiar cantidades** con los botones +/- o input numérico
- **Eliminar productos** con el botón de basura
- **Vaciar carrito** si deseas empezar de nuevo

#### Resumen del Carrito
- **Subtotal** de productos
- **Vista previa** de todos los items
- **Botón "Proceder al checkout"**

### 3. Proceso de Compra

#### Registro/Login Obligatorio
Para completar una compra, debes:
1. **Crear cuenta** con email y contraseña
2. **Verificar email** (si implementado)
3. **Completar perfil** con datos de envío

#### Información de Envío
Proporciona:
- **Nombre completo**
- **Dirección en Cuba** (provincia, municipio, dirección exacta)
- **Teléfono de contacto**
- **Email de confirmación**

#### Método de Pago
- **Pago en efectivo** únicamente
- **Recoge en tienda física** más cercana
- **Presenta el vale PDF** generado

#### Confirmación de Orden
Después de confirmar:
1. **Recibes confirmación** por pantalla
2. **Vale PDF descarga automáticamente**
3. **Email de confirmación** (si configurado)
4. **Número de orden** para seguimiento

### 4. Seguimiento de Pedidos

#### Estados de Pedido
- **Pendiente**: Orden recibida, esperando confirmación
- **Confirmado**: Orden aprobada, preparando productos
- **Enviado**: Producto en camino o listo para recoger
- **Entregado**: Pedido completado
- **Cancelado**: Orden cancelada

#### Historial de Compras
- Accede desde tu perfil
- Revisa todas tus órdenes anteriores
- Descarga vales nuevamente si es necesario

---

## 👨‍💼 Guía para Administradores

### 1. Acceso al Panel Administrativo

1. Ve a `/admin`
2. Inicia sesión con cuenta de administrador
3. Accede al dashboard principal

### 2. Dashboard de Estadísticas

#### Métricas Principales
- **Ingresos totales** del período
- **Número de pedidos** realizados
- **Productos más vendidos** (top 5)
- **Tendencias de ventas** por mes

#### Gráficos Interactivos
- **Ventas mensuales** en gráfico de barras
- **Distribución por categorías** en gráfico circular
- **Tendencias de productos** más populares

### 3. Gestión de Productos

#### Agregar Nuevo Producto
1. Ve a "Productos" > "Nuevo producto"
2. Completa información:
   - **Nombre** del producto
   - **Descripción** detallada
   - **Precio** en CUP
   - **Categoría**
   - **Material**
   - **Dimensiones**
   - **Imágenes** (URLs)
   - **Stock inicial**

#### Editar Productos Existentes
- Busca producto por nombre o ID
- Modifica cualquier campo
- Actualiza imágenes o stock
- Activa/desactiva producto

#### Gestión de Categorías
- Crear nuevas categorías
- Reorganizar jerarquía
- Asignar productos a categorías

### 4. Gestión de Pedidos

#### Visualizar Pedidos
- Lista completa de todas las órdenes
- Filtros por estado, fecha, cliente
- Búsqueda por número de orden o cliente

#### Detalles de Pedido
- **Información del cliente**
- **Productos ordenados** con cantidades y precios
- **Total de la orden**
- **Dirección de envío**
- **Estado actual**

#### Actualizar Estados
- Cambiar estado del pedido
- Agregar notas internas
- Notificar al cliente (si implementado)

### 5. Gestión de Usuarios

#### Ver Usuarios Registrados
- Lista completa de clientes
- Información de contacto
- Historial de compras
- Estado de cuenta

#### Roles y Permisos
- Asignar rol de administrador
- Gestionar permisos de acceso
- Suspender cuentas si es necesario

### 6. Reportes y Análisis

#### Informes de Ventas
- **Ventas por período** (día, semana, mes)
- **Productos más vendidos**
- **Clientes más activos**
- **Ingresos por categoría**

#### Costos y Ganancias
- **Costos de productos** (si configurado)
- **Gastos de transporte**
- **Márgenes de ganancia**
- **Análisis de rentabilidad**

---

## 📱 Uso en Dispositivos Móviles

### Optimización Mobile
- **Diseño responsivo** para todos los tamaños
- **Navegación táctil** optimizada
- **Imágenes adaptativas** para conexiones lentas
- **Formularios simplificados** para móvil

### Aplicación Web Progresiva (PWA)
- **Instalación en dispositivo**
- **Funcionamiento offline** limitado
- **Notificaciones push** (futuro)
- **Acceso rápido** desde pantalla principal

---

## 🔐 Seguridad y Privacidad

### Protección de Datos
- **Encriptación SSL/TLS** en producción
- **Contraseñas hasheadas** con bcrypt
- **Sesiones seguras** con JWT
- **Validación de entrada** en todos los formularios

### Privacidad
- **Datos mínimos requeridos** para compras
- **No compartimos información** con terceros
- **Derecho de acceso** a tus datos
- **Eliminación de cuenta** disponible

---

## ❓ Solución de Problemas

### Problemas Comunes

#### No puedo agregar al carrito
- Verifica que el producto tenga stock
- Intenta recargar la página
- Limpia cookies del navegador

#### Error en checkout
- Asegúrate de estar registrado
- Verifica dirección de envío completa
- Confirma que el carrito no esté vacío

#### Vale PDF no se descarga
- Permite popups en el navegador
- Verifica configuración de descargas
- Contacta soporte si persiste

#### No puedo acceder al admin
- Verifica credenciales de administrador
- Confirma que tu cuenta tenga permisos
- Contacta al administrador principal

### Contacto de Soporte

Si encuentras problemas no resueltos:

- 📧 **Email**: soporte@konforttotal.cu
- 📞 **Teléfono**: +53 7 123 4567
- 🏪 **Tiendas físicas**: Visita cualquier sucursal
- 💬 **Chat en línea**: Disponible en horario comercial

---

## 📋 Términos y Condiciones

### Política de Compras
- **Pagos únicamente en efectivo**
- **Recogida en tiendas físicas**
- **Validez del vale: 30 días**
- **Cambios sujetos a política de tienda**

### Política de Envíos
- **Envío gratuito** dentro de La Habana
- **Cargos adicionales** para otras provincias
- **Tiempos de entrega**: 3-7 días hábiles
- **Confirmación previa** al envío

### Garantías
- **Garantía de fabricante** según producto
- **Reposición o reparación** en defectos de calidad
- **Asistencia técnica** disponible

---

## 🎉 Consejos y Mejores Prácticas

### Para una Mejor Experiencia
- **Regístrate** antes de empezar a comprar
- **Guarda tus vales PDF** en lugar seguro
- **Revisa stock** antes de agregar al carrito
- **Compara productos** usando filtros

### Ahorro de Datos
- **Imágenes optimizadas** para conexiones lentas
- **Carga progresiva** de contenido
- **Cache inteligente** de recursos

### Accesibilidad
- **Navegación por teclado** disponible
- **Texto grande** para mejor legibilidad
- **Contraste alto** para usuarios con dificultades visuales

---

¡Gracias por elegir **Konfort Total**! Tu satisfacción es nuestra prioridad.

*Última actualización: Septiembre 2025*