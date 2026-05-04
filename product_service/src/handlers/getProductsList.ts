import { APIGatewayProxyHandler } from 'aws-lambda';
import { products } from '../data/products';

export const handler: APIGatewayProxyHandler = async (event) => {
  console.log('getProductsList handler invoked', event);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    },
    body: JSON.stringify(products),
  };
};
