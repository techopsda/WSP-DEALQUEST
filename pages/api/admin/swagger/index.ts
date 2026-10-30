import { withSwagger } from 'next-swagger-doc';

const swaggerHandler = withSwagger({
  apiFolder: 'pages/api',
  schemaFolders: ['models'],
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NorthStar API Documentation',
      version: '1.0'
    }
  }
});
export default swaggerHandler();
