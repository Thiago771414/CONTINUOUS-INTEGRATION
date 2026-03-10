# Full-Stack Integration Testing Pipeline
Node.js API + React Admin UI validated through automated integration and end-to-end testing using Cypress and GitHub Actions.

![Node.js](https://img.shields.io/badge/Node.js-backend-green)
![React](https://img.shields.io/badge/React-frontend-blue)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)
![Cypress](https://img.shields.io/badge/Tested%20With-Cypress-black)
![CI](https://img.shields.io/badge/CI-GitHub%20Actions-blue)
![Tests](https://img.shields.io/badge/tests-automated-brightgreen)

![CI](https://github.com/Thiago771414/CONTINUOUS-INTEGRATION/actions/workflows/user.api.yaml/badge.svg)
![E2E](https://github.com/Thiago771414/CONTINUOUS-INTEGRATION/actions/workflows/user-admin.yaml/badge.svg)

---

<p align="center">
  <img src="https://raw.githubusercontent.com/Thiago771414/imagensProjetos/main/slices/mobile/cypress2.png" width="900">
</p>

---

# Overview

Modern applications consist of multiple interconnected layers:

• frontend interfaces  
• backend APIs  
• database persistence  
• user interaction flows  

Validating each component individually is not sufficient to ensure the system works correctly in production.

This repository demonstrates how to implement a **complete validation pipeline for a full-stack application**, combining automated integration tests, end-to-end tests, and continuous integration.

The platform automatically verifies that the **entire application stack works correctly before code changes are merged**.

---

# Engineering Problem

In real-world software systems, teams often face issues such as:

• frontend changes breaking API contracts  
• database schema updates affecting application logic  
• regressions introduced by new features  
• broken user workflows not detected during development  

Without automated validation across all layers, these issues may only be discovered after deployment.

Engineering teams therefore require a reliable mechanism to validate:

• backend functionality  
• frontend behavior  
• API integration  
• real user workflows  

before shipping new versions of the system.

---

# Solution

This project implements a **full-stack automated validation platform** consisting of:

• a Node.js REST API  
• a React Admin user interface  
• automated integration tests  
• automated Cypress end-to-end tests  
• CI pipelines using GitHub Actions  

Each code change triggers automated workflows that validate the system across multiple layers.

---

# System Architecture

The application consists of three primary components.

## Backend API

Node.js + Express service responsible for:

• user management  
• MongoDB data persistence  
• REST API endpoints  

Integration tests validate database and API behavior.

---

## Frontend Interface

React + React Admin application responsible for:

• user management UI  
• form interactions  
• API communication  

The UI interacts directly with the backend services.

---

## Testing Layer

Automated validation occurs at two levels.

### Integration Testing

Validates backend functionality including:

• database operations  
• API endpoints  
• data persistence  

---

### End-to-End Testing

Cypress tests simulate real user behavior:

• navigating the application  
• filling forms  
• submitting data  
• verifying UI updates  

This ensures the **entire system behaves correctly from the user's perspective**.

---

# Continuous Integration Pipeline

Automated CI pipelines are implemented using GitHub Actions.

Each push or pull request triggers the validation workflow.

## API Validation Pipeline

The backend pipeline automatically executes:

• static code analysis (ESLint)  
• dependency vulnerability scanning (`npm audit`)  
• automated integration tests  
• MongoDB container provisioning for testing  

---

## Frontend + E2E Validation Pipeline

The frontend pipeline executes:

• frontend lint validation  
• dependency vulnerability scanning  
• React application startup  
• API service startup  
• Cypress E2E test execution  
• artifact collection for debugging  

The pipeline ensures that both services are fully operational before tests begin.

---
# CI Pipeline Flow

```bash
Developer Push
↓
GitHub Repository
↓
GitHub Actions
↓
Install Dependencies
↓
Start Backend + Database
↓
Start Frontend
↓
Run Integration Tests
↓
Run Cypress E2E Tests
↓
Validate System Behavior
```

---

# E2E Test Demonstration

The test suite validates real user workflows across the full stack.

---

# Project Structure

```bash
├── user-api
│ └── Node.js REST API
│
├── user-admin
│ └── React Admin UI
│
├── cypress
│ └── E2E tests
│
├── .github
│ └── CI workflows
│
└── README.md
```

---

# Running the Project

Clone the repository:

```bash
git clone
```

Install backend dependencies:

```bash
cd user-api
npm install
npm start
```

Start the frontend:

```bash
cd ../user-admin
npm install
npm start
```

Run Cypress tests:

```bash
npx cypress open
```

---

# Engineering Value

This project demonstrates practical experience with:

• CI/CD pipeline design  
• automated test orchestration  
• full-stack system validation  
• GitHub Actions workflow automation  
• Cypress end-to-end testing  
• containerized service dependencies  

The architecture reflects patterns used by modern engineering teams to ensure **reliable software delivery pipelines**.

---

# Author

Thiago Reis Lima  
Software Engineer

LinkedIn
```bash
https://www.linkedin.com/in/thiago-lima-2a5896166/
```



