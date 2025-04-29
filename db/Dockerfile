FROM postgres:15-alpine

ENV POSTGRES_USER=typemonkey
ENV POSTGRES_PASSWORD=typemonkey123
ENV POSTGRES_DB=typemonkeydb

COPY init.sql /docker-entrypoint-initdb.d/
