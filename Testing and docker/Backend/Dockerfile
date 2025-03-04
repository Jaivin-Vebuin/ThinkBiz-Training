# Use official Node.js image
FROM node:22.12.0

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of the application
COPY . .

# Expose port 4000
EXPOSE 4000

# Start the backend
CMD ["yarn", "dev"]
