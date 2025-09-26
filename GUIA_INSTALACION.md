# 🚀 Guía de Instalación - Konfort Total 2

Guía paso a paso para instalar y configurar Konfort Total 2 en tu entorno local y producción.

## 📋 Requisitos Previos

### Sistema Operativo
- **Windows 10/11** (recomendado)
- **macOS** 12.0 o superior
- **Linux** (Ubuntu 20.04+, CentOS 8+)

### Software Requerido
- **Node.js** 20.x LTS
- **npm** 9.x+ o **yarn** 1.22+
- **Git** 2.30+
- **PostgreSQL** (local o Supabase)

### Verificación de Instalación
```bash
# Verificar Node.js
node --version  # Debe ser 20.x.x
npm --version   # Debe ser 9.x.x+

# Verificar Git
git --version   # Debe ser 2.30+
```

---

## 🏠 Instalación Local (Desarrollo)

### Paso 1: Clonar el Repositorio
```bash
git clone https://github.com/RAMIR007/konfort-total2.git
cd konfort-total2
```

### Paso 2: Instalar Dependencias
```bash
npm install
```

### Paso 3: Configurar Base de Datos

#### Opción A: Usar Supabase (Recomendado)
1. Ve a [supabase.com](https://supabase.com) y crea cuenta gratuita
2. Crea un nuevo proyecto
3. Ve a Settings > Database > Connection string
4. Copia la URI de "Direct connection"

#### Opción B: PostgreSQL Local
```bash
# Instalar PostgreSQL (Windows)
# Descarga desde https://www.postgresql.org/download/windows/

# Crear base de datos
createdb konfort_total2

# O usando Docker
docker run --name postgres-konfort -e POSTGRES_PASSWORD=mypassword -d -p 5432:5432 postgres:15
```

### Paso 4: Configurar Variables de Entorno
```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar .env con tus valores
```

**Contenido de `.env`:**
```env
# Base de datos
DATABASE_URL="postgresql://postgres:tu_password@db.tu_proyecto.supabase.co:5432/postgres?sslmode=require"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="un_secret_muy_seguro_de_al_menos_32_caracteres_generado_aleatoriamente"

# Vercel Blob (opcional)
BLOB_READ_WRITE_TOKEN="tu_token_si_usas_vercel_blob"

# Entorno
NODE_ENV="development"
```

### Paso 5: Configurar Base de Datos
```bash
# Generar cliente Prisma
npx prisma generate

# Crear tablas en la base de datos
npx prisma db push
```

### Paso 6: Ejecutar Servidor de Desarrollo
```bash
npm run dev
```

### Paso 7: Verificar Instalación
1. Abre `http://localhost:3000` en tu navegador
2. Deberías ver la página principal de Konfort Total 2
3. Prueba navegar por el catálogo

---

## 🌐 Despliegue en Producción (Vercel)

### Preparación del Proyecto

#### Paso 1: Verificar Build Local
```bash
# Probar build de producción
npm run build

# Si hay errores, corregir antes de desplegar
```

#### Paso 2: Configurar Repositorio Git
```bash
# Asegurarse de que todos los cambios estén commited
git add .
git commit -m "Preparar para despliegue en producción"
git push origin main
```

### Despliegue en Vercel

#### Paso 1: Crear Cuenta en Vercel
1. Ve a [vercel.com](https://vercel.com)
2. Regístrate con GitHub
3. Conecta tu cuenta de GitHub

#### Paso 2: Importar Proyecto
1. Haz clic en "New Project"
2. Selecciona "Import Git Repository"
3. Busca y selecciona `konfort-total2`
4. Configura el proyecto:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (raíz)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

#### Paso 3: Configurar Variables de Entorno
En el dashboard de Vercel, ve a tu proyecto > Settings > Environment Variables:

```env
DATABASE_URL=postgresql://postgres:tu_password@db.tu_proyecto.supabase.co:5432/postgres?sslmode=require
NEXTAUTH_URL=https://tu-proyecto.vercel.app
NEXTAUTH_SECRET=un_secret_muy_seguro_de_al_menos_32_caracteres
NODE_ENV=production
```

#### Paso 4: Desplegar
1. Haz clic en "Deploy"
2. Vercel ejecutará automáticamente:
   - `npm install`
   - `npx prisma generate`
   - `npm run build`
3. Una vez completado, tendrás tu URL de producción

#### Paso 5: Configurar Dominio (Opcional)
1. En Settings > Domains
2. Agrega tu dominio personalizado
3. Actualiza `NEXTAUTH_URL` con el nuevo dominio

---

## 🗄️ Configuración Avanzada de Base de Datos

### Usando Supabase (Recomendado)

#### Crear Proyecto
1. Ve a [supabase.com](https://supabase.com/dashboard)
2. Haz clic en "New project"
3. Completa:
   - **Name**: konfort-total2
   - **Database Password**: Una contraseña segura
   - **Region**: Selecciona la más cercana (ej: East US)

#### Obtener Connection String
1. Ve a Settings > Database
2. En "Connection string", selecciona "Direct connection"
3. Copia la URI completa

#### Configurar Row Level Security (Opcional)
```sql
-- Ejecutar en SQL Editor de Supabase
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Product" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Order" ENABLE ROW LEVEL SECURITY;
```

### Usando PostgreSQL Local

#### Instalación en Windows
```powershell
# Usando Chocolatey
choco install postgresql

# O descarga manual desde postgresql.org
```

#### Instalación en macOS
```bash
# Usando Homebrew
brew install postgresql
brew services start postgresql

# Crear usuario y base de datos
createuser konfort_user
createdb konfort_total2 -O konfort_user
```

#### Instalación en Linux (Ubuntu)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib

# Configurar
sudo -u postgres createuser konfort_user
sudo -u postgres createdb konfort_total2 -O konfort_user
```

---

## 🔧 Solución de Problemas

### Error: "Can't reach database server"
```bash
# Verificar conexión
npx prisma db push --preview-feature

# Si usas Supabase, verifica:
# 1. Proyecto activo
# 2. Connection string correcta
# 3. Sin restricciones de IP
```

### Error: "Build failed"
```bash
# Verificar TypeScript
npm run type-check

# Verificar linting
npm run lint

# Limpiar cache
rm -rf .next node_modules/.cache
npm install
```

### Error: "NEXTAUTH_SECRET too short"
```bash
# Generar secret seguro
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Error: "Port 3000 already in use"
```bash
# Matar proceso en puerto 3000
npx kill-port 3000

# O usar puerto diferente
npm run dev -- -p 3001
```

---

## 📊 Verificación Post-Instalación

### Checklist de Verificación
- [ ] ✅ Página principal carga correctamente
- [ ] ✅ Catálogo de productos visible
- [ ] ✅ Navegación funciona
- [ ] ✅ Base de datos conectada
- [ ] ✅ Autenticación funciona
- [ ] ✅ Panel admin accesible

### Testing Básico
```bash
# Verificar API
curl http://localhost:3000/api/products

# Verificar base de datos
npx prisma studio
```

---

## 🔄 Actualizaciones y Mantenimiento

### Actualizar Dependencias
```bash
npm update

# Verificar compatibilidad
npm audit
npm audit fix
```

### Backup de Base de Datos
```bash
# Usando Prisma
npx prisma db push --force-reset

# O usando pg_dump (PostgreSQL)
pg_dump konfort_total2 > backup.sql
```

### Monitoreo
- Revisa logs de Vercel en dashboard
- Monitorea uso de base de datos en Supabase
- Configura alertas de uptime

---

## 📞 Soporte

Si encuentras problemas durante la instalación:

1. **Revisa esta guía** nuevamente
2. **Verifica logs de error** detalladamente
3. **Busca en Issues** del repositorio
4. **Contacta soporte** si persiste el problema

---

*Guía actualizada: Septiembre 2025*