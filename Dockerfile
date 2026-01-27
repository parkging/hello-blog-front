FROM --platform=linux/amd64 nginx:1.24-alpine

# Dockerfile 내부에서 nginx.conf 파일 생성
RUN printf 'user  nginx;\n\
worker_processes  auto;\n\
error_log  /etc/blog/frontend/log/error.log notice;\n\
pid        /var/run/nginx.pid;\n\
events {\n\
    worker_connections  1024;\n\
}\n\
http {\n\
    include       /etc/nginx/mime.types;\n\
    default_type  application/octet-stream;\n\
    access_log  /etc/blog/frontend/log/access.log;\n\
    sendfile        on;\n\
    keepalive_timeout  65;\n\
    server {\n\
        listen 80;\n\
        location / {\n\
            root /etc/blog/frontend/build/;\n\
            index index.html index.htm;\n\
            try_files $uri $uri/ /index.html;\n\
        }\n\
    }\n\
}\n' > /etc/nginx/nginx.conf

# 빌드 결과물 복사 및 로그 디렉토리 생성
COPY build/ /etc/blog/frontend/build/
RUN mkdir -p /etc/blog/frontend/log/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
