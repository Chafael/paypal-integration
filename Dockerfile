FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Instala TODAS las dependencias (incluyendo dev) para poder compilar
RUN npm ci

# Copia el código fuente
COPY . .

# Compila TypeScript
RUN npm run build

# Elimina devDependencies después de compilar
RUN npm prune --production

EXPOSE 3000

CMD ["node", "dist/index.js"]

RUN echo "Test step 1"
RUN echo "Test step 2"
RUN echo "Test step 3"
RUN echo "Test step 4"
RUN echo "Test step 5"
