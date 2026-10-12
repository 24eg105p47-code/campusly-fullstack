FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn -B -DskipTests package

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/campusly-*.jar /app/campusly.jar
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh
EXPOSE 8081
ENTRYPOINT ["/app/start.sh"]
