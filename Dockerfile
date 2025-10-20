# Use official Node image (includes Node.js and npm)
FROM node:22-bullseye

# Set working directory
WORKDIR /home/projects/subdomain-search

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the project files
COPY . .

# Default command to run your Node script
CMD ["node", "find_unique_entries.js"]
