# Use the official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY server/user-api/package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application files
COPY server/user-api .

# Build the NestJS application
RUN npm run build

ENV DB_HOST=${DB_HOST}
ENV DB_PORT=${DB_PORT}
ENV DB_USERNAME=${DB_USERNAME}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_DATABASE=${DB_DATABASE}
ENV DB_SYNCHRONIZE=${DB_SYNCHRONIZE}
ENV DB_TYPE=${DB_TYPE}
ENV API_HOST=${API_HOST}
ENV API_PORT=3000
ENV ALLOWED_ORIGIN="*"

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD node dist/main