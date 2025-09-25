# Guía para Contribuir

¡Gracias por tu interés en contribuir a este proyecto! Todas las contribuciones son bienvenidas.

## Cómo contribuir

### 1. Fork y Clone
1. Haz fork del repositorio
2. Clona tu fork: `git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git`
3. Crea una rama para tu feature: `git checkout -b feature/nueva-funcionalidad`

### 2. Desarrollo
- Sigue las convenciones de código del proyecto
- Escribe tests para nuevas funcionalidades
- Asegúrate de que todos los tests pasan
- Actualiza la documentación si es necesario

### 3. Commit
- Usa mensajes de commit descriptivos
- Sigue el formato: `tipo: descripción breve`

### 4. Pull Request
- Crea un PR desde tu rama hacia `develop`
- Completa el template del PR
- Espera revisión del equipo

## Estándares de Código

### TypeScript
- Usa tipos estrictos
- Evita `any`
- Documenta funciones complejas

### React/Next.js
- Usa hooks correctamente
- Componentes funcionales con TypeScript
- Server Components cuando sea posible

### Prisma
- Valida esquemas antes de migrar
- Usa transacciones para operaciones críticas

## Tests
- Escribe tests unitarios para lógica compleja
- Tests de integración para APIs
- Tests E2E para flujos críticos

## Reportar Issues
- Usa los templates de issues
- Proporciona información detallada
- Incluye pasos para reproducir

## Comunicación
- Sé respetuoso en todas las interacciones
- Usa issues para discusiones técnicas
- Mantén el código de conducta