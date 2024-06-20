# Amplify Gen 2 - Fun, File, Function!

This is a Next.js full-stack application with an auth and storage resource generated using Amplify Gen 2

## Getting Started

### Create a sandbox environment for local development

```bash
npx ampx sandbox
```

### Start the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### Storage

https://docs.amplify.aws/react/build-a-backend/storage/

Amplify Storage seamlessly integrates file storage and management capabilities into frontend web and mobile apps, built on top of Amazon Simple Storage Service (Amazon S3). It provides intuitive APIs and UI components for core file operations, enabling developers to build scalable and secure file storage solutions without dealing with cloud service complexities.

In this application, a Storage resource is configured with two paths. 
- `"profile-pictures/{entity_id}/*"` Allow authenticated users to upload and own profile pictures and guest users to download them.
- `"picture-submissions/*"`Allows both guest and authenticated users to read and write objects

### Functions

https://docs.amplify.aws/react/build-a-backend/functions/

Amplify Functions are powered by AWS Lambda, and allow you to perform a wide variety of customization through self-contained functions. Functions can respond to events from other resources, execute some logic in-between events like an authentication flow, or act as standalone jobs. They are used in a variety of settings and use cases:

- Authentication flow customizations (e.g. attribute validations, allowlisting email domains)
- Resolvers for GraphQL APIs
- Handlers for individual REST API routes, or to host an entire API
- Scheduled jobs

In this application, we created an onUpload and onDelete trigger for the Storage resource.
The Lambda trigger logic will log the record keys/paths to CloudWatch Logs.
To confirm the Lambda is being triggered, please navigate to the CloudWatch Logs, search for your Lambda's log group, and check the logs.
