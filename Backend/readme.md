# Payment Microservice

## Overview

The Payment Microservice is responsible for handling payment transactions and integrations with multiple payment gateways, including **eSewa**, **Khalti**, and **Stripe**. It provides APIs for initializing payments, verifying transactions, and managing payment statuses. This service is built using **Node.js** and integrates with RabbitMQ for message brokering.

## Features

- **Payment Gateway Integrations**:
  - **eSewa**: Nepal's leading digital wallet.
  - **Khalti**: A popular digital wallet in Nepal.
  - **Stripe**: A global payment processing platform.
  
- **Transaction Management**:
  - Initialize payments.
  - Verify payment statuses.
  - Update transaction records.

- **RabbitMQ Message Broker**:
  - Handles asynchronous communication between services.

- **Error Handling**:
  - Comprehensive error handling for payment failures and invalid requests.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/PaymentMicroservice.git

 

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License.