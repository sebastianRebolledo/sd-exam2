FROM node:14
#Copia todos los archivos del directorio a /usr/src/ dentro del container

COPY ["package.json","package-lock.json","/usr/src/"]

# Especifica un directorio de trabajo
WORKDIR /usr/src

#Trae dependencias de la app
RUN npm install

COPY [".","/usr/src"]

#Exponemos el puerto
EXPOSE 3000

CMD ["node","src/index.js"]
