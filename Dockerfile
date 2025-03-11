# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia package.json y package-lock.json antes de instalar dependencias
COPY package*.json ./

# Instala las dependencias de manera limpia y reconstruye sqlite3
RUN npm ci && npm rebuild sqlite3

# Crea el directorio de la base de datos y asigna permisos
RUN mkdir -p /app/src/data && chmod -R 777 /app/src/data

# Copia el resto del código de la aplicación
COPY . .

# Exponer el puerto
EXPOSE 8080

# Ejecutar la aplicación
CMD ["node", "src/app.js"]
