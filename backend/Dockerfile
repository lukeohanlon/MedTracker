# Use a base image with Ruby installed
FROM ruby:3.0.0

# Set the working directory
WORKDIR /app

# Copy Gemfile and Gemfile.lock to the working directory
COPY Gemfile Gemfile.lock ./

# Install dependencies
RUN bundle install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your backend application will run on
EXPOSE 3000

# Command to start the backend application
CMD ["rails", "server", "-b", "0.0.0.0"]
