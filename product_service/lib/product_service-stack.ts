import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as path from 'path';

export class ProductServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Lambda function: getProductsList
    const getProductsListHandler = new NodejsFunction(
      this,
      'GetProductsListHandler',
      {
        entry: path.join(__dirname, '../src/handlers/getProductsList.ts'),
        handler: 'handler',
        runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
        timeout: cdk.Duration.seconds(10),
      }
    );

    // Lambda function: getProductsById
    const getProductsByIdHandler = new NodejsFunction(
      this,
      'GetProductsByIdHandler',
      {
        entry: path.join(__dirname, '../src/handlers/getProductsById.ts'),
        handler: 'handler',
        runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
        timeout: cdk.Duration.seconds(10),
      }
    );

    // Create REST API
    const api = new apigateway.RestApi(this, 'ProductServiceApi', {
      restApiName: 'Product Service API',
      description: 'API for managing products',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
        ],
      },
    });

    // Create /products resource
    const productsResource = api.root.addResource('products');

    // GET /products → getProductsList
    productsResource.addMethod(
      'GET',
      new apigateway.LambdaIntegration(getProductsListHandler)
    );

    // Create /products/{productId} resource
    const productResource = productsResource.addResource('{productId}');

    // GET /products/{productId} → getProductsById
    productResource.addMethod(
      'GET',
      new apigateway.LambdaIntegration(getProductsByIdHandler)
    );

    // Output the API Gateway URL
    new cdk.CfnOutput(this, 'ApiGatewayUrl', {
      value: api.url,
      description: 'Product Service API Gateway URL',
      exportName: 'ProductServiceApiUrl',
    });
  }
}
