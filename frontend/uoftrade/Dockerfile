# Step 1: Build Stage (Use an official Node.js image as the base)
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Step 2: Copy the package.json and package-lock.json from the context to the container
# Adjusting paths since the build context is ./frontend/uoftrade
COPY package.json package-lock.json ./

# Step 3: Install dependencies (only production dependencies for the build)
RUN npm install --production

# Step 4: Copy the rest of the Next.js project files into the container
COPY . .

# Step 5: Build the Next.js app for production
RUN npm run build

# Step 6: Production Stage (Set up final production image)
FROM node:18 AS production

# Set the working directory inside the container
WORKDIR /app

# Copy only the build artifacts and node_modules from the build stage
COPY --from=build /app/.next /app/.next
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/public /app/public

# Set environment variables for production
ENV NODE_ENV=production

# Expose the port that Next.js will run on
EXPOSE 3000

# Command to run the app
CMD ["npm", "run", "start"]
