# ZapSign Frontend

This repository contains the front-end application for the **ZapSign** system, built with [Angular](https://angular.io/) version 19.0.4. The application is designed as a microservice and integrates seamlessly with the **ZapSign Backend** to provide functionality such as document management and digital signing.

## Features

- Built with Angular for a modern and responsive front-end experience.
- Integration with the ZapSign backend microservice.
- Supports local development and Dockerized deployment.

## Prerequisites

Ensure you have the following installed on your system before running the application:

- Node.js (version 16 or later)
- Angular CLI (version 19.0.4 or later)
- Docker (optional, for containerized deployment)

## Development Server

To start a local development server, follow these steps:

1. Clone the repository:

```bash
https://github.com/itsmevicot/zapsign_frontend_challenge.git
```

2. Go to the directory where it was cloned:

```bash
   cd zapsign_api_challenge
```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   ng serve
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:4200/
   ```

The application will automatically reload whenever you modify any source files.

## Docker Deployment

You can also deploy this application using Docker. This approach is particularly useful for integrating with the backend as part of a microservices architecture.

To use Docker, follow these steps:

1. Build and run the Docker container:

   ```bash
   docker-compose up -d --build
   ```

2. The application will be available at:
   ```
   http://localhost:4200/
   ```

> **Note:** This frontend is part of a microservices architecture and requires the ZapSign backend to function fully.

## Repository

The backend can be found at:
[ZapSign Backend Challenge](https://github.com/itsmevicot/zapsign_api_challenge)
