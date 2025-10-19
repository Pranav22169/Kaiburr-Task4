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

## 📸 Screenshots

| Step | Description | Screenshot |
|------|--------------|-------------|
| 1 | CI/CD workflow configuration (`ci.yml`) | ![CI Config](screenshots/01_ci_yaml.png) |
| 2 | Workflow running | ![Workflow Running](screenshots/02_workflow_running.png) |
| 3 | Workflow completed successfully | ![Workflow Success](screenshots/03_workflow_success.png) |
| 4 | Docker image build step | ![Docker Build](screenshots/04_docker_build.png) |
| 5 | Docker image verification step | ![Docker Verify](screenshots/05_docker_verify.png) |

---

## 🧑‍💻 Author
**Pranav Biju Nair**  
*October 2025*
