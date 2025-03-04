# Use Node.js official image as the base
FROM node:22.12.0

# Set working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock first (for better caching)
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy all frontend files into the container
COPY . .

# Expose the port Vite uses
EXPOSE 5173

# Command to run your frontend app
CMD ["yarn", "dev", "--host"]
