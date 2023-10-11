# Riderize Backend API

## Project Background

This project was developed as a part of a job interview process for Riderize. The goal was to create a backend API for the Riderize platform, showcasing my skills in application development, database management, and API design.

Welcome to the Riderize Backend API repository! Riderize is a platform designed to organize group bicycle rides with ease.

## Project Features

- **Nest.js:** Project was built using Nest.js, a powerful and extensible Node.js framework written in TypeScript. It provides a structured and efficient way to develop APIs.

- **Prisma:** Prisma is an innovative database toolkit, for seamless database operations. It makes working with databases a breeze.

- **MongoDB Atlas:** Data is securely stored in MongoDB Atlas, a cloud-based MongoDB database service. This ensures data reliability and scalability.

- **JWT (JSON Web Tokens):** JWT for secure authentication and authorization. It's a robust method for ensuring the privacy and security of user data.

- **Bcrypt:** Passwords are securely hashed using Bcrypt, ensuring user data remains protected.

## Getting Started

To get started with Riderize, follow these steps:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/riderize-backend.git

   ```

2. Navigate to the project directory:

cd riderize-backend

3. Install the project dependencies:

npm install

4. Create a '.env' file in the project root with the following environment variables:

DATABASE_URL="mongodb+srv://ruanndb:ruanndb@cluster1.wcy8xdu.mongodb.net/Cluster1?retryWrites=true&w=majority"
JWT_KEY="rendrize"

5. Run the development server:

npm run start:dev

6. Your Riderize backend API is up and running at http://localhost:3000. You can now begin making API requests
