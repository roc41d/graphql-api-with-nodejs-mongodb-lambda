# Graphql API with Nodejs, Mongodb and AWS Lambda

This project is a GraphQL API for a todo list application. It provides CRUD operations for managing todo items, including creating, reading, updating, and deleting todos. The API is built with Node.js, MongoDB, and AWS Lambda.

## Features
- GraphQL CRUD API for managing todo items
- Data storage with MongoDB
- Serverless architecture using AWS Lambda
- Unit and integration tests with Jest
- Deployment with Serverless Framework

## Technologies
- Node.js
- MongoDB
- GraphQL
- AWS Lambda
- Serverless Framework
- Jest

## Setup Locally

### Prerequisites
- [Node.js](https://nodejs.org/en/download)
- [MongoDB](https://www.mongodb.com/cloud/atlas/register)
- [AWS account](https://aws.amazon.com/resources/create-account/)


<!-- create a hypelink -->
### Installation
1. Clone the repository
```bash
git@github.com:roc41d/graphql-api-with-nodejs-mongodb-lambda.git
```

2. Install dependencies
```bash
cd graphql-api-with-nodejs-mongodb-lambda
npm install
```

3. Set up environment variables (copy the `.env.example` file to `.env` and update the values)
```bash
cp .env.example .env
cp .env.example .env.production
```

4. Start the development server
```bash
npm start
```
The server will start locally at [http://localhost:4000/](http://localhost:4000/).


## Deployment
To deploy the GraphQL API using AWS Lambda and API Gateway:

1. Set up an AWS account if you haven't already and copy your `YOUR_ACCESS_KEY` and `YOUR_SECRET_KEY`.
2. Install the Serverless Framework globally:
```bash
npm install -g serverless
```
3. Configure AWS credentials with the Serverless Framework:
```bash
serverless config credentials --provider aws --key YOUR_ACCESS_KEY --secret YOUR_SECRET_KEY
```
4. Deploy the API to AWS Lambda:
```bash
serverless deploy
```
The Serverless Framework will deploy the API to AWS Lambda and provide you with the endpoint URL.
