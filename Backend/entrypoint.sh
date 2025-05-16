#!/bin/sh

echo "Waiting for MySQL to be ready..."
# Wait a bit to make sure MySQL is fully initialized
sleep 5

echo "Running database migrations..."
cd src
npx sequelize db:create || true
npx sequelize db:migrate

echo "Starting the application..."
# Add your regular startup command here, for example:
npm start