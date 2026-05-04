import { handler } from '../getProductsById';
import { products } from '../../data/products';

describe('getProductsById Handler', () => {
    it('should return 200 status code for valid product ID', async () => {
        const response = await handler(
            {
                httpMethod: 'GET',
                path: '/products/1',
                pathParameters: { productId: '1' },
            } as any,
            {} as any
        );

        expect(response.statusCode).toBe(200);
    });

    it('should return product data for valid product ID', async () => {
        const response = await handler(
            {
                httpMethod: 'GET',
                path: '/products/1',
                pathParameters: { productId: '1' },
            } as any,
            {} as any
        );

        const body = JSON.parse(response.body);
        expect(body).toHaveProperty('id');
        expect(body).toHaveProperty('title');
        expect(body).toHaveProperty('description');
        expect(body).toHaveProperty('price');
        expect(body.id).toBe('1');
        expect(body.title).toBe('Wireless Headphones');
    });

    it('should return 404 status code for invalid product ID', async () => {
        const response = await handler(
            {
                httpMethod: 'GET',
                path: '/products/999',
                pathParameters: { productId: '999' },
            } as any,
            {} as any
        );

        expect(response.statusCode).toBe(404);
    });

    it('should return error message for invalid product ID', async () => {
        const response = await handler(
            {
                httpMethod: 'GET',
                path: '/products/999',
                pathParameters: { productId: '999' },
            } as any,
            {} as any
        );

        const body = JSON.parse(response.body);
        expect(body).toHaveProperty('error');
        expect(body.error).toBe('Product not found');
    });

    it('should include CORS headers in success response', async () => {
        const response = await handler(
            {
                httpMethod: 'GET',
                path: '/products/1',
                pathParameters: { productId: '1' },
            } as any,
            {} as any
        );

        expect(response.headers['Access-Control-Allow-Origin']).toBe('*');
        expect(response.headers['Access-Control-Allow-Methods']).toBe(
            'GET, POST, PUT, DELETE'
        );
        expect(response.headers['Content-Type']).toBe('application/json');
    });

    it('should include CORS headers in error response', async () => {
        const response = await handler(
            {
                httpMethod: 'GET',
                path: '/products/999',
                pathParameters: { productId: '999' },
            } as any,
            {} as any
        );

        expect(response.headers['Access-Control-Allow-Origin']).toBe('*');
        expect(response.headers['Access-Control-Allow-Methods']).toBe(
            'GET, POST, PUT, DELETE'
        );
        expect(response.headers['Content-Type']).toBe('application/json');
    });

    it('should return 400 for missing product ID', async () => {
        const response = await handler(
            {
                httpMethod: 'GET',
                path: '/products/undefined',
                pathParameters: undefined,
            } as any,
            {} as any
        );

        expect(response.statusCode).toBe(400);
        const body = JSON.parse(response.body);
        expect(body.error).toBe('Product ID is required');
    });
});
