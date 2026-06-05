# Etapa 1: Construcción de la app Astro
FROM node:20-alpine AS builder
WORKDIR /app

# Instala dependencias
COPY package*.json ./
RUN npm install

# Copia el resto del proyecto y construye
COPY . .
RUN npm run build

# Etapa 2: Servidor final (Node.js)
FROM node:20-alpine AS runner
WORKDIR /app

# Copia las dependencias de producción
COPY package*.json ./
RUN npm install --omit=dev

# Copia la compilación del builder
COPY --from=builder /app/dist ./dist

# Variables de entorno
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

# Ejecuta el servidor standalone de Astro
CMD ["node", "./dist/server/entry.mjs"]
