#!/usr/bin/env node

/**
 * Script de verificación pre-despliegue para Konfort Total 2
 * Ejecutar antes de subir a producción
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuración pre-despliegue...\n');

const checks = [
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
    name: 'NEXTAUTH_SECRET configurado',
    check: () => {
      if (!fs.existsSync('.env')) return false;
      const env = fs.readFileSync('.env', 'utf8');
      return env.includes('NEXTAUTH_SECRET=') && !env.includes('NEXTAUTH_SECRET=""');
    },
    required: true,
    message: 'Configura NEXTAUTH_SECRET en .env'
  },
  {
    name: 'Build de producción funciona',
    check: () => fs.existsSync('.next'),
    required: true,
    message: 'Ejecuta npm run build antes del despliegue'
  },
  {
    name: 'Cliente Prisma generado',
    check: () => fs.existsSync('node_modules/.prisma'),
    required: true,
    message: 'Ejecuta npx prisma generate'
  },
  {
    name: 'Archivo vercel.json existe',
    check: () => fs.existsSync('vercel.json'),
    required: true,
    message: 'Asegúrate de que vercel.json esté presente'
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
console.log('- DATABASE_URL: Tu conexión de Supabase');
console.log('- NEXTAUTH_URL: URL de tu proyecto en Vercel');
console.log('- NEXTAUTH_SECRET: El mismo que usas en desarrollo');
console.log('- BLOB_READ_WRITE_TOKEN: (Opcional) Para subir imágenes');

console.log('\n🔗 URLs útiles:');
console.log('- Supabase: https://supabase.com/dashboard');
console.log('- Vercel: https://vercel.com/dashboard');
console.log('- Documentación: Lee el README.md para más detalles');