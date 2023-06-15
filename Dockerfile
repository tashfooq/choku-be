# Use the official Node.js 14 base image
FROM node:18.16

# Railway env
ARG PORT
ENV PORT=$PORT
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

# Set the working directory in the container
WORKDIR /src

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Run Prisma migrations before starting the app
RUN npx prisma generate
RUN npx prisma db push
RUN npx prisma db seed
RUN npx prisma migrate deploy

# Expose the port that the app will listen on
EXPOSE $PORT

# Start the Express.js app
CMD ["npm", "run", "start"]
