# Cloud Health Check

This is an app made in Node.js.

It uses a managed identity to obtain Azure AD tokens when authenticating.
After authentication, it pulls data from different sources including Azure Advisor and Azure Cloud Defender using their respective SDK's.
Future possible sources to be added are: Azure Resource Graph.

### How to run

After cloning the repo, run `npm install`.
Send me a mail or a message on teams for the .env file.
Run `node .`

### Requirements
- An Azure app registration with managed identity that has Read access to the required resources.
- A MongoDB database. This will be changed to Azure Cosmos in the near future.
