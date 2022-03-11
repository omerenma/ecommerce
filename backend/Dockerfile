# Pull Docker Hub base image
FROM node:16.13.2
# Set working directory
WORKDIR /backend
# Install app dependencies
COPY package*.json ./
RUN yarn global add install nodemon
RUN yarn install -qy
# Copy app to container
COPY . .
# Run the "dev" script in package.json
CMD ["yarn", "run", "dev"]# FROM node:16.13.2

# WORKDIR /backend

# ENV PORT = 5000
# ENV NODE_ENV = DEVELOPMENT

# ENV DB_LOCAL_URI = mongodb://localhost:27017/ecommerce
# ENV JWT_SECRET = okpokoekroermoerigirgoiroairoaim
# ENV JWT_EXPIRES_TIME = 7d
# ENV COOKIE_EXPIRES_TIME = 7d

# ENV SMTP_HOST = smtp.mailtrap.io
# ENV SMTP_PORT = 2525
# ENV SMTP_EMAIL = 3704b1c2f18ee9
# ENV SMTP_PASSWORD = 6f0dd786d75b0f
# ENV SMTP_FROM_EMAIL = noreply@ecommerce.com
# ENV SMTP_FROM_NAME = Ecommerce

# ENV COPY package*.json ./backend
# COPY package.json /backend/package.json

# EXPOSE 5000

# RUN yarn install

# COPY . .

# CMD ["node", "server.js"]



