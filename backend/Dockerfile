# Use the official Ruby image as the base image
FROM ruby:2.7

# Set the working directory inside the container
WORKDIR /app

# Copy the Gemfile and Gemfile.lock into the container
COPY Gemfile Gemfile.lock /app/

# Install dependencies
RUN bundle install

# Copy the rest of the application code into the container
COPY . /app/

# Expose the port your Rails app will run on
EXPOSE 3000

# Start the Rails application
CMD ["rails", "server", "-b", "0.0.0.0"]
