# Usar la imagen oficial de Node.js 20
FROM node:20-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Compilar la aplicación
RUN npm run build

# Exponer el puerto 2030
EXPOSE 2030

# Comando para ejecutar la aplicación
CMD ["node", "dist/main.js"]
