FROM node:20-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app/backend

# As dependências só serão reinstaladas se esses arquivos mudarem.
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todo o resto do código-fonte do frontend para o diretório de trabalho
COPY . .

# Expõe a porta padrão do Vite para que o Docker possa mapeá-la
EXPOSE 3000

# O comando para iniciar o servidor de desenvolvimento do NestJS
# O '--host' é crucial para que o servidor seja acessível de fora do contêiner
CMD ["npm", "run", "start:dev"]
