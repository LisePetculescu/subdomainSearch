FROM ubuntu:24.04

# Install dependencies for NodeSource
RUN apt-get update && apt-get install -y curl bash

# Install Node.js 22.x 
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /home/projects/subdomain-search

COPY package*.json ./
RUN npm install

COPY . .

CMD ["node", "script.js"]



# # Debian container image uses Node image (including Node.js and npm)
# FROM node:22-bullseye

# # Set working directory
# WORKDIR /home/projects/subdomain-search

# # Copy package files and install dependencies
# COPY package*.json ./
# RUN npm install

# # Copy the rest of the project files
# COPY . .

# # Default command to run your Node script
# CMD ["node", "script.js"]
