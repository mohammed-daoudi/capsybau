import { connectDB } from '../lib/mongodb';
import User from '../models/User';
import bcrypt from 'bcryptjs';

async function seedAdmin() {
  try {
    await connectDB();
    
    // Check if admin exists
    const adminExists = await User.findOne({ email: 'admin@sybau.com' });
    
    if (adminExists) {
      console.log('✅ Admin user already exists');
      process.exit(0);
    }

    // Create admin if doesn't exist
    const password = process.env.ADMIN_PASSWORD || 'admin123';
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const admin = await User.create({
      name: 'Admin',
      email: 'admin@sybau.com',
      passwordHash,
      role: 'admin'
    });

    console.log('✅ Admin user created successfully');
    console.log('Email:', admin.email);
    console.log('Password:', password);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin:', error);
    process.exit(1);
  }
}

seedAdmin();