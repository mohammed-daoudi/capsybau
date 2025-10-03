import mongoose from 'mongoose';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

async function testConnection() {
  try {
    console.log('🔄 Testing database connection...');
    
    await connectDB();
    console.log('✅ Successfully connected to MongoDB');
    
    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\n📚 Available collections:');
    collections.forEach(collection => console.log(`- ${collection.name}`));
    
    // Count users
    const users = await User.find();
    console.log(`\n👥 Number of users in database: ${users.length}`);
    
    // Show admin user if exists
    const admin = await User.findOne({ email: 'admin@sybau.com' });
    if (admin) {
      console.log('✅ Admin user exists:', {
        email: admin.email,
        name: admin.name,
        role: admin.role,
        createdAt: admin.createdAt
      });
    } else {
      console.log('❌ No admin user found');
    }

  } catch (error) {
    console.error('❌ Database connection error:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

testConnection();