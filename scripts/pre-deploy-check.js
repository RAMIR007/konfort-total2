#!/usr/bin/env node

/**
 * Script de verificación pre-despliegue para Konfort Total
 * Ejecutar antes de subir a producción
 * Versión: 2.0.0
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Verificando configuración pre-despliegue para Konfort Total...\n');

const checks = [
  {
    name: 'Node.js versión compatible',
    check: () => {
      try {
        const version = execSync('node --version', { encoding: 'utf8' }).trim();
        const majorVersion = parseInt(version.substring(1).split('.')[0]);
        return majorVersion >= 20;
      } catch {
        return false;
      }
    },
    required: true,
    message: 'Instala Node.js 20.x o superior'
  },
  {
    name: 'Archivo .env existe',
    check: () => fs.existsSync('.env'),
    required: true,
    message: 'Crea un archivo .env basado en .env.example'
  },
  {
    name: 'DATABASE_URL configurada',
    check: () => {
      if (!fs.existsSync('.env')) return false;
      const env = fs.readFileSync('.env', 'utf8');
      return env.includes('DATABASE_URL=') && !env.includes('DATABASE_URL=""');
    },
    required: true,
    message: 'Configura DATABASE_URL en .env con tu conexión de Supabase'
  },
  {
    name: 'NEXTAUTH_SECRET configurado y seguro',
    check: () => {
      if (!fs.existsSync('.env')) return false;
      const env = fs.readFileSync('.env', 'utf8');
      const match = env.match(/NEXTAUTH_SECRET=(.+)/);
      if (!match) return false;
      const secret = match[1].replace(/['"]/g, '');
      return secret.length >= 32 && !secret.includes('tu_secret');
    },
    required: true,
    message: 'Configura NEXTAUTH_SECRET con mínimo 32 caracteres seguros'
  },
  {
    name: 'NEXTAUTH_URL configurada',
    check: () => {
      if (!fs.existsSync('.env')) return false;
      const env = fs.readFileSync('.env', 'utf8');
      return env.includes('NEXTAUTH_URL=') && !env.includes('NEXTAUTH_URL=""');
    },
    required: true,
    message: 'Configura NEXTAUTH_URL en .env'
  },
  {
    name: 'Dependencias instaladas',
    check: () => fs.existsSync('node_modules/.prisma'),
    required: true,
    message: 'Ejecuta npm install'
  },
  {
    name: 'Cliente Prisma generado',
    check: () => {
      try {
        require.resolve('@prisma/client');
        return true;
      } catch {
        return false;
      }
    },
    required: true,
    message: 'El cliente Prisma no está disponible, ejecuta npx prisma generate'
  },
  {
    name: 'Build de producción funciona',
    check: () => {
      try {
        execSync('npm run build', { stdio: 'pipe' });
        return fs.existsSync('.next');
      } catch {
        return false;
      }
    },
    required: true,
    message: 'El build de producción falló, revisa los errores'
  },
  {
    name: 'TypeScript sin errores',
    check: () => {
      try {
        execSync('npx tsc --noEmit', { stdio: 'pipe' });
        return true;
      } catch {
        return false;
      }
    },
    required: true,
    message: 'Hay errores de TypeScript, revísalos antes de desplegar'
  },
  {
    name: 'ESLint pasa sin errores',
    check: () => {
      try {
        execSync('npm run lint', { stdio: 'pipe' });
        return true;
      } catch {
        return false;
      }
    },
    required: false,
    message: 'Hay warnings de ESLint, considera revisarlos'
  },
  {
    name: 'Archivo vercel.json existe',
    check: () => fs.existsSync('vercel.json'),
    required: true,
    message: 'Asegúrate de que vercel.json esté presente'
  },
  {
    name: 'Configuración de Git limpia',
    check: () => {
      try {
        const status = execSync('git status --porcelain', { encoding: 'utf8' });
        return status.trim() === '';
      } catch {
        return false;
      }
    },
    required: false,
    message: 'Hay cambios sin commitear, considera hacer commit'
  }
];

let allPassed = true;

checks.forEach(({ name, check, required, message }) => {
  const passed = check();
  const status = passed ? '✅' : (required ? '❌' : '⚠️');

  console.log(`${status} ${name}`);

  if (!passed && required) {
    console.log(`   💡 ${message}`);
    allPassed = false;
  }
});

console.log('\n' + '='.repeat(50));

if (allPassed) {
  console.log('🎉 ¡Todo está listo para el despliegue en Vercel!');
  console.log('\n📋 Próximos pasos:');
  console.log('1. Confirma que tu repositorio GitHub esté actualizado');
  console.log('2. Ve a https://vercel.com e importa tu proyecto');
  console.log('3. Configura las variables de entorno en Vercel');
  console.log('4. Despliega y verifica que todo funcione');
} else {
  console.log('❌ Hay problemas que deben resolverse antes del despliegue.');
  console.log('\n🔧 Revisa los mensajes de error arriba y corrige los issues.');
  process.exit(1);
}

console.log('\n📚 Variables de entorno requeridas en Vercel:');
console.log('🔴 DATABASE_URL: Tu conexión de Supabase PostgreSQL');
console.log('🔴 NEXTAUTH_URL: URL completa de tu proyecto (https://...)');
console.log('🔴 NEXTAUTH_SECRET: Mínimo 32 caracteres, genera uno seguro');
console.log('🟡 BLOB_READ_WRITE_TOKEN: (Opcional) Para gestión de imágenes');
console.log('🟡 DIRECT_URL: (Opcional) Para conexiones directas a Supabase');

console.log('\n🔗 URLs útiles:');
console.log('📊 Supabase Dashboard: https://supabase.com/dashboard');
console.log('🚀 Vercel Dashboard: https://vercel.com/dashboard');
console.log('📖 Documentación completa: Lee el README.md y architecture-plan.md');
console.log('🔧 Configuración de producción: Revisa .env.example para variables');

console.log('\n⚡ Comandos útiles para producción:');
console.log('• npm run build          # Verificar build local');
console.log('• npx prisma studio      # Ver base de datos');
console.log('• npx prisma validate    # Validar schema');
console.log('• npm run lint          # Verificar código');