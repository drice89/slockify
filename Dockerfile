# Base image with Ruby and Node.js
FROM ruby:3.0.6-alpine

# Install necessary packages
RUN apk update && apk add build-base postgresql-dev

# Install Node.js
RUN apk add --update nodejs npm gcompat


RUN mkdir /app
WORKDIR /app

RUN gem install bundler
COPY Gemfile ./
RUN bundle install

COPY . .

CMD puma -C config/puma.rb

# Set working directory

# RUN mkdir /app
# WORKDIR /app
# COPY Gemfile .

# # Copy Gemfile and package.json to the container

# # Install dependencies
# RUN bundle install

# # Copy the rest of the application files to the container
# EXPOSE 3000
# COPY . .

# # Expose the port used by the Rails application

# # Start the Rails server
# CMD rails s -b 0.0.0.0