# Use the official Node.js 18 base image
FROM node:18.16

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
ENV PORT=2000
EXPOSE $PORT

# Start the Express.js app
CMD ["npm", "run", "start"]
