FROM node:20-alpine

# Definir diretório de trabalho
WORKDIR /app/frontend

# As dependências só serão reinstaladas se esses arquivos mudarem.
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copiar o resto do código
COPY . .

# Expor a porta do Vite
EXPOSE 5173

# Comando para desenvolvimento
CMD ["npm", "run", "dev"]