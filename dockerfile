
# Use the official Node.js runtime as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Expose the port that the Next.js app will run on
EXPOSE 3000

# Start the Next.js development server
CMD ["npm", "run", "dev"]
