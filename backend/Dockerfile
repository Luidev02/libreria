# Usa la imagen oficial de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios
COPY package.json package-lock.json ./
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto en el que corre Express
EXPOSE 3000

# Comando para iniciar la API
CMD ["npm", "start"]
