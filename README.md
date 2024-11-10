# MLOGS: Custom Blog Application for Everyone

- [Project Overview](#project-overview)
- [Getting Started](#getting-started)
- [Dependency Graph](#dependency-graph)
- [Development](#development)
  - [Manual Setup](#manual-setup)
  - [Setup using Docker](#setup-using-docker)
- [Contributing](#contributing)
- [License](#license)

## Service Overview

This repository houses the email service component of the [MLOGS](https://github.com/dev-mayanktiwari/mlogs-backend) application. The mlogs email service is a dedicated microservice for handling email-related functionalities such as account verification, password reset, and notifications. Built as a standalone service, it operates independently from the core mlogs backend, ensuring scalability and separation of concerns.

### Built With

- [Node.js](https://nodejs.org/en)
- [Typescript](https://www.typescriptlang.org/)
- [BullMQ](https://docs.bullmq.io/)
- [Redis](https://redis.io/)
- [Nodemailer](https://www.nodemailer.com/)

## Getting Started

To get a local copy up and running, please follow these simple steps.

### Prerequisites

Here is what you need to be able to run MLOGS.

- Node.js (Version: >=20.x)
- Redis 
- NPM

### Dependency Graph

![Backend Dependency Graph](./public/backend-dependency-graph.svg)

## Development

Before setting up this email service, ensure the main backend is up and running with Redis properly configured. This service relies on Redis, using BullMQ to manage and queue emails.

Make sure Redis is set up correctly so it can communicate with this service to handle email notifications and job processing.

### Manual Setup

1. Clone the repo into a public GitHub repository (or fork https://github.com/dev-mayanktiwari/mlogs-final).

   ```sh
   git clone https://github.com/dev-mayanktiwari/mlogs-email-service
   ```

   > If you are on Windows, run the following command on `gitbash` with admin privileges: <br> > `git clone -c core.symlinks=true https://github.com/dev-mayanktiwari/mlogs-email-service` <br>

2. Go to the project folder

   ```sh
   cd mlogs-email-service
   ```

3. Install packages with npm

   ```sh
   npm install
   ```

4. Set up your `.env` file

   - Duplicate `.env.example` to `.env`

5. Setup Node
   If your Node version does not meet the project's requirements as instructed by the docs, "nvm" (Node Version Manager) allows using Node at the version required by the project:

   ```sh
   nvm use
   ```

   You first might need to install the specific version and then use it:

   ```sh
   nvm install && nvm use
   ```

   You can install nvm from [here](https://github.com/nvm-sh/nvm).


6. Redis Setup

   To enable Redis functionality in the `mlogs` application, you need to configure Redis. You can set up Redis either locally or by using a cloud-based service.

   Redis Cloud (Cloud-based)

   1. **Choose a Redis Cloud Provider**

      - Pick a Redis cloud provider from the following options:
      - [Redis Labs](https://redislabs.com/)
      - [Upstash](https://upstash.com/)
      - [Aiven](https://aiven.io/redis)

   2. **Create an Account and Provision a Redis Instance**

      - Sign up for an account with your chosen provider.
      - Create a new Redis instance through their dashboard.
      - After the instance is created, you will be provided with connection details, including:
        - **Host** (Redis endpoint)
        - **Port** (usually `6379` or a custom port)
        - **Password** (if authentication is enabled)

   3. **Get the Redis Connection Details**

      - You will need the following information from your Redis provider:
        - **Host**: Your Redis instance hostname (e.g., `your-redis-hostname`).
        - **Port**: Typically `6379`.
        - **Password**: The password (if set) for connecting to the Redis instance.

   4. **Add Redis Connection Details to Your `.env` File**

      - In your `.env` file, configure the Redis connection as follows:

        ```plaintext
        REDIS_HOST=your-redis-hostname
        REDIS_PORT=6379
        REDIS_PASSWORD=your-redis-password (if applicable)
        ```

7. Nodemailer Setup
   
   To send notification emails, you need to configure an email account in the .env file, along with necessary credentials. It’s recommended to use app passwords instead of your main email password for security.
   
   If you’re using Gmail, you can follow this [guide to generate an app password](https://support.google.com/accounts/answer/185833?hl=en). For other email providers, check their settings for SMTP configuration and security best practices.

   To send failed job notifications to the admin (optional), specify an admin email address in the .env file. You can use the same email account for both sending notifications and receiving admin alerts.

   ```plaintext
      MAILER_HOST=smtp.gmail.com  #GMAIL Example
      MAILER_SERVICE=gmail        #GMAIL Example
      MAILER_PORT=587
      EMAIL_USER=your_email@example.com
      EMAIL_PASS=youremailpassword
      ADMIN_EMAIL=your_admin_email@example.com
   ```

8. Log Database Setup (Optional)

   To enable logging in the `mlogs` application, you can set up a MongoDB database to store logs. Follow the steps below to configure MongoDB either through a managed service (MongoDB Atlas) or locally using Docker.

   Setup using MongoDB Atlas (Cloud-based)

   1. **Create an Account on MongoDB Atlas**

      - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up for a free account.

   2. **Create a New Cluster**

      - After logging in, create a new cluster. Select your preferred cloud provider and region.

   3. **Create a MongoDB User**

      - Go to the "Database Access" section, and create a user with a username and password. Remember to keep these credentials safe.

   4. **Get the Connection String**

      - Replace `<username>` and `<password>` in the connection string with the MongoDB user credentials you created.
      - Go to the "Connect" section, select "Connect your application," and copy the connection string.

   5. **Add the Connection String to Your Environment Variables**

      - In your `.env` file, add the connection string as follows:

      ```plaintext
      MONGO_URL="mongodb+srv://yourusername:yourpassword@yourcluster.mongodb.net/logs?retryWrites=true&w=majority"
      ```

   6. **Verify the Connection (Optional)**
      - Run a quick connection test in your application to ensure MongoDB is correctly set up and accessible.


9. Running the application

   Once you've completed the setup, you can start the email service by running(make sure you have nodemon installed):

   ```bash
   npm run dev
   ```

### Setup using Docker

1. Run Redis container (Optional, for email service)

   Use the following docker command to run a docker container:

   ```sh
   docker run -d --name mlogs_redis -p 6379:6379 redis redis-server --requirepass mysecretpassword
   ```

   Update the .env file with the connection details:

   ```plaintext
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_PASSWORD=mysecretpassword
   ```

2. Nodemailer Setup
   
   To send notification emails, you need to configure an email account in the .env file, along with necessary credentials. It’s recommended to use app passwords instead of your main email password for security.
   
   If you’re using Gmail, you can follow this [guide to generate an app password](https://support.google.com/accounts/answer/185833?hl=en). For other email providers, check their settings for SMTP configuration and security best practices.

   To send failed job notifications to the admin (optional), specify an admin email address in the .env file. You can use the same email account for both sending notifications and receiving admin alerts.

   ```plaintext
      MAILER_HOST=smtp.gmail.com  #GMAIL Example
      MAILER_SERVICE=gmail        #GMAIL Example
      MAILER_PORT=587
      EMAIL_USER=your_email@example.com
      EMAIL_PASS=youremailpassword
      ADMIN_EMAIL=your_admin_email@example.com
   ```


3. Run MONGODB Container (Optional)

   Start a MONGODB container using docker, require for logging:

   ```bash
   docker run -d --name mlogs -p 27017:27017 mongo
   ```

   Update the .env file with the connection string:

   ```plaintext
   MONGO_URL="mongodb://localhost:27017"
   ```


4. Build the image

   In the root directory run the following command to build the image:

   ```bash
       docker build -t mlogs-email-service .
   ```


5. Start the container:

   Run the image by running the following command and passing the env file:

   ```bash
       docker run -d --name mlogs_backend_container --env-file .env -p 3000:3000 mlogs-email-service
   ```

<!-- CONTRIBUTING -->

## Contributing

Please see our [contributing guide](/CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
