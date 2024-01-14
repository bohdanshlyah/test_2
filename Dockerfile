
# Використовуємо офіційний образ Node.js в якості базового образу
FROM node:16-alpine AS build

# Встановлюємо робочий каталог /app
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Використовуємо офіційний образ Nginx для віджендерення статичного вмісту
FROM nginx:alpine

# # видалити цю папку для робочого проекту
# WORKDIR /app
# COPY dist /app/

# Додаємо додаткові налаштування Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Копіюємо збудований React додаток до каталогу, з якого працює Nginx
COPY --from=build /app/dist /usr/share/nginx/html
# COPY ./dist /usr/share/nginx/html

# Задаємо порт, на якому працюватиме додаток
EXPOSE 443

# Використовуємо команду CMD для запуску Nginx при старті контейнера
CMD ["nginx", "-g", "daemon off;"]
