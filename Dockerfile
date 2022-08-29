# descarga la imagen de node para ejecutarlo desde docker
FROM node:18

# es como cd a esa carpeta (se puede cambiar el nombre app). esto está en un sistema linux
WORKDIR /usr/src/app

# copia el package json a la carpeta de arriba
COPY package*.json ./

# npm i
RUN npm install

# copia todos los archivos del directorio a la carpeta app
COPY . .

# puerto que expone la app al container (mismo puerto en el que corre el server)
EXPOSE 5000

# ejecuta el comando
CMD ["node", "dist/index.js"]