# Kaiburr Task 4 – CI/CD Pipeline (GitHub Actions)

This repository contains the CI/CD pipeline for the Kaiburr assignment series.  
It automates building and Dockerizing the full-stack application created in **Task 3**  
(Spring Boot backend + React frontend).

---

## ⚙️ Pipeline Overview
The GitHub Actions workflow performs the following steps automatically:

1. **Checkout code** from the repository.  
2. **Set up environments:** Java 17 + Node.js 20.  
3. **Build backend** using Maven.  
4. **Build frontend** using npm.  
5. **Build and verify Docker image** using the Dockerfile in the repository root.

---

## 🐳 Dockerfile Summary
The multi-stage Dockerfile:

- Builds the Spring Boot JAR in a Maven container.  
- Builds the React production bundle in a Node 20 container.  
- Copies the compiled backend JAR into a final lightweight JDK image.  
- Exposes port 8080 and starts the backend server.

---

## 🧠 Technologies Used
| Layer | Technology |
|-------|-------------|
| CI/CD | **GitHub Actions** |
| Backend | **Java 17 + Spring Boot + Maven** |
| Frontend | **React 19 + TypeScript + Ant Design** |
| Containerization | **Docker** |

---



## 🧑‍💻 Author
**Pranav Biju Nair**  
*October 2025*
