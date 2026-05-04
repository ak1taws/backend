import { handler } from '../getProductsList';
import { products } from '../../data/products';

describe('getProductsList Handler', () => {
    it('should return 200 status code', async () => {
        const response = await handler(
            {
                httpMethod: 'GET',
                path: '/products',
            } as any,
            {} as any
        );

        expect(response.statusCode).toBe(200);
    });

    it('should return array of mock products', async () => {
        const response = await handler(
            {
                httpMethod: 'GET',
                path: '/products',
            } as any,
            {} as any
        );

        const body = JSON.parse(response.body);
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBe(6);
        expect(body[0]).toHaveProperty('id');
        expect(body[0]).toHaveProperty('title');
        expect(body[0]).toHaveProperty('description');
        expect(body[0]).toHaveProperty('price');
    });

    it('should include CORS headers in response', async () => {
        const response = await handler(
            {
                httpMethod: 'GET',
                path: '/products',
            } as any,
            {} as any
        );

        expect(response.headers['Access-Control-Allow-Origin']).toBe('*');
        expect(response.headers['Access-Control-Allow-Methods']).toBe(
            'GET, POST, PUT, DELETE'
        );
        expect(response.headers['Content-Type']).toBe('application/json');
    });

    it('should return all products with correct data', async () => {
        const response = await handler(
            {
                httpMethod: 'GET',
                path: '/products',
            } as any,
            {} as any
        );

        const body = JSON.parse(response.body);
        expect(body).toEqual(products);
    });
});
