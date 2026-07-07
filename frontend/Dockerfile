FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Create React App ፈንታ Vite ን በፖርት 3000 እንዲያነሳው ያደርጋል
CMD ["npm", "run", "dev", "--", "--host"]