FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 5175

# Start preview server (serves built federation files)
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"] 