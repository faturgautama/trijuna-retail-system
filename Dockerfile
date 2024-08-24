FROM nginx:stable
WORKDIR /app
COPY dist/DASHBOARD-TEMPLATE /usr/share/nginx/html
