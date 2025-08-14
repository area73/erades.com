#!/bin/bash

echo "🚀 Iniciando Lighthouse CI Server..."

# Construir el proyecto
echo "📦 Construyendo el proyecto..."
pnpm build

# Iniciar el servidor en background
echo "🌐 Iniciando servidor Lighthouse CI..."
pnpm lhci:server:start &
SERVER_PID=$!

# Esperar a que el servidor esté listo
echo "⏳ Esperando a que el servidor esté listo..."
sleep 5

# Ejecutar las pruebas
echo "🔍 Ejecutando pruebas de Lighthouse..."
pnpm lhci:autorun:server

echo "✅ Pruebas completadas!"
echo "📊 Dashboard disponible en: http://localhost:9001"

# Mantener el servidor corriendo
echo "🌐 Servidor corriendo en http://localhost:9001"
echo "Presiona Ctrl+C para detener el servidor"
wait $SERVER_PID
