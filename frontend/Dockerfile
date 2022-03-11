# Pull Docker Hub base image
FROM node:16.13.2
# Set working directory
WORKDIR /frontend
# Install app dependencies
COPY package*.json ./
RUN yarn install -qy
# Copy app to container
COPY . .
# Run the "dev" script in package.json
CMD ["yarn", "run", "dev"]
