# Base image with Ruby and Node.js
FROM ruby:3.0.6-alpine

# Install necessary packages
RUN apk update && apk add build-base postgresql-dev

# Install Node.js
RUN apk add --update nodejs npm gcompat


# Set working directory

RUN mkdir /app
WORKDIR /app

# Copy Gemfile and package.json to the container

# Install dependencies
COPY . .
RUN bundle install
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# # Create and seed the database

# # Expose the port used by the Rails application
EXPOSE 3000

# # Start the Rails server and the Node.js server
CMD rails s & npm start

RUN rails db:create
RUN rails db:seed