# Chatbot Builder

This is a visual editor for creating and managing chatbot scenarios. It allows you to design conversation flows by creating nodes (blocks) and defining transitions (edges) between them. The editor supports adding different types of nodes, editing the content of those nodes, and connecting them in a logical flow to simulate the chatbot's decision-making process.

## Architecture

This project is composed of the following parts:

- **Frontend**: Built using React and TypeScript. This is where users can visually create and manage chatbot scenarios.
- **Backend**: Built using Ruby on Rails. The backend serves APIs to handle scenario data, user authentication, and other business logic.
- **Database**: PostgreSQL to store the scenario data, user details, and other necessary information.

## Installation

### Prerequisites

- Docker
- Docker Compose

### 1. Clone the Repository

```bash
git clone https://github.com/sietebonduy/chatbot-builder.git
cd chatbot-builder
```

### 2. Setup Environment Variables
In the root directory, create a .env file with the following command:
```bash
cp .env.sample .env
```

### 3. Build the Application with Docker Compose
Run the following command to build all services:
```bash
docker compose --build
```

### 4. Access the Application
- The frontend will be available at http://localhost:3000.
- The backend (Rails API) will be available at http://localhost:80.
- The PostgreSQL database will be running inside the Docker container, and you can connect to it using the credentials specified in the .env file.


## Technologies Used

- **Frontend**: React, TypeScript
- **Backend**: Ruby on Rails
- **Database**: PostgreSQL
- **Containerization**: Docker, Docker Compose
- **Styling**: Tailwind CSS
- **API**: RESTful API