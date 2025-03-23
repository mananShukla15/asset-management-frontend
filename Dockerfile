FROM node:16.17.0
WORKDIR /app
COPY package.json .
RUN npm i
COPY frontend .
EXPOSE 5173
CMD ["npm", "run", "dev"]