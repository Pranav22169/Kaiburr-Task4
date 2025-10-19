# ---------------------------
# Stage 1: Build Backend (Java)
# ---------------------------
FROM maven:3.9.4-eclipse-temurin-17 AS backend-build
WORKDIR /app
COPY task3/pom.xml .
COPY task3/src ./src
RUN mvn clean package -DskipTests

# ---------------------------
# Stage 2: Build Frontend (React)
# ---------------------------
FROM node:20 AS frontend-build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# ---------------------------
# Stage 3: Final Image
# ---------------------------
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=backend-build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
