export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
}

export const products: Product[] = [
  {
    id: '1',
    title: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 199.99,
  },
  {
    id: '2',
    title: 'Laptop Stand',
    description: 'Ergonomic aluminum laptop stand for better posture',
    price: 49.99,
  },
  {
    id: '3',
    title: 'USB-C Cable',
    description: 'Durable 2-meter USB-C charging and data cable',
    price: 14.99,
  },
  {
    id: '4',
    title: 'Mechanical Keyboard',
    description: 'RGB mechanical keyboard with custom switches',
    price: 129.99,
  },
  {
    id: '5',
    title: '4K Webcam',
    description: '4K ultra HD webcam with auto-focus and built-in microphone',
    price: 89.99,
  },
  {
    id: '6',
    title: 'Portable SSD',
    description: '1TB portable solid-state drive with fast transfer speeds',
    price: 99.99,
  },
];
