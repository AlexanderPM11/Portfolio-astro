# Etapa 1: Construcción de la app Astro
FROM node:20-alpine AS builder
WORKDIR /app

# Instala dependencias
COPY package*.json ./
RUN npm install

# Copia el resto del proyecto y construye
COPY . .
RUN npm run build

# Etapa 2: Servidor final (Nginx)
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Elimina archivos por defecto de Nginx y copia la app
RUN rm -rf ./*
COPY --from=builder /app/dist ./

# Copia un archivo de configuración personalizada (opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
