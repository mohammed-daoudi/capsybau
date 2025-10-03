import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';
import type { Product as ProductType } from '@/lib/types';

const sampleProducts: Omit<ProductType, '_id'>[] = [
  {
    title: 'Shadow Beanie',
    slug: 'shadow-beanie',
    description: 'Premium knit beanie with embroidered logo.',
    price: 29.99,
    currency: 'USD',
    images: ['/images/shadow-beanie-1.jpg', '/images/shadow-beanie-2.jpg'],
    models: [],
    variants: [
      { name: 'Color', value: 'Black', stock: 100 },
      { name: 'Color', value: 'Navy', stock: 100 },
      { name: 'Color', value: 'Grey', stock: 100 }
    ],
    category: 'Beanies',
    featured: true,
    stock: 300
  },
  {
    title: 'Opium Snapback',
    slug: 'opium-snapback',
    description: 'Classic snapback cap with embroidered logo.',
    price: 34.99,
    currency: 'USD',
    images: ['/images/opium-snapback-1.jpg', '/images/opium-snapback-2.jpg'],
    models: [],
    variants: [
      { name: 'Color', value: 'Black/Gold', stock: 100 },
      { name: 'Color', value: 'White/Black', stock: 100 }
    ],
    category: 'Snapbacks',
    featured: true,
    stock: 200
  },
  {
    title: 'Crimson Cap',
    slug: 'crimson-cap',
    description: 'Curved brim cap with minimalist design.',
    price: 32.99,
    currency: 'USD',
    images: ['/images/crimson-cap-1.jpg', '/images/crimson-cap-2.jpg'],
    models: [],
    variants: [
      { name: 'Color', value: 'Crimson', stock: 100 },
      { name: 'Color', value: 'Black', stock: 100 }
    ],
    category: 'Caps',
    featured: true,
    stock: 200
  },
  {
    title: 'Aura Bucket Hat',
    slug: 'aura-bucket',
    description: 'Reversible bucket hat with all-over print.',
    price: 39.99,
    currency: 'USD',
    images: ['/images/aura-bucket-1.jpg', '/images/aura-bucket-2.jpg'],
    models: [],
    variants: [
      { name: 'Size', value: 'S/M', stock: 50 },
      { name: 'Size', value: 'L/XL', stock: 50 }
    ],
    category: 'Bucket Hats',
    featured: true,
    stock: 100
  }
];

async function seedProducts() {
  try {
    console.log('🌱 Starting product seeding...');
    await connectDB();
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️ Cleared existing products');

    // Insert new products
    const products = await Product.create(sampleProducts);
    console.log(`✅ Seeded ${products.length} products successfully`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();