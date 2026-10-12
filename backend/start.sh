#!/bin/sh
set -eu

if [ -n "${DB_HOST:-}" ]; then
  export SPRING_DATASOURCE_URL="jdbc:postgresql://${DB_HOST}:${DB_PORT}/${DB_NAME}"
  export SPRING_DATASOURCE_USERNAME="${DB_USER}"
  export SPRING_DATASOURCE_PASSWORD="${DB_PASSWORD}"
  export SPRING_DATASOURCE_DRIVER_CLASS_NAME="org.postgresql.Driver"
fi

exec java -jar /app/campusly.jar
