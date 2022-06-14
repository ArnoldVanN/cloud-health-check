# Cloud Health Check

## Requirements
- An Azure app registration with managed identity that has Read access to the required resources.
- A Cosmos DB database using the MongoDB API.

## What it does

This is an app made in Node.js.

It uses a managed identity to obtain Azure AD tokens when authenticating.
After authentication, it gets every subscription the app has access to and pulls data from different sources including Azure Advisor and Azure Cloud Defender using their respective SDK's.

## How to run locally

After cloning the repo, run `npm install`.
Send me a mail or a message on teams for the .env file.
Run `node .`

## How to run in prod

First, create an app registration with a client secret (to be used in the .env file) and managed identity 

Next, set up a Cosmos DB service account with the API for MongoDB selected.

Then, set up an App Service linked to an Azure Container Registry containing the image built from the Dockerfile in this repo.

To build the image, make sure you have a .env file containing values for the following fields:

#### Azure AD Credentials
`TENANT_ID`, `CLIENT_ID` and `CLIENT_SECRET`

#### For Cosmos DB connection
`COSMOSDB_USER`, `COSMOSDB_PASSWORD`, `COSMOSDB_HOST` and `COSMOSDB_PORT`

## To be implemented
- A way to clear the databases before getting and saving the data again.
- Automated deployment of this app
