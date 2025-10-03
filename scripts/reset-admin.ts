import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import type { UserDocument } from '@/models/User';

async function resetAdmin() {
  try {
    console.log('🔄 Starting admin user reset...');
    await connectDB();
    
    const adminData = {
      name: 'Admin User',
      email: 'admin@sybau.com',
      passwordHash: await bcrypt.hash('admin123', 12),
      role: 'admin' as const
    };

    const admin = await User.create(adminData);
    console.log('✅ Admin user created:', admin.email);
    console.log('Password: admin123');
    
    console.log('✅ Admin user reset successful');
    console.log('Email:', admin.email);
    console.log('Password:', adminPassword);
    console.log('Role:', admin.role);

  } catch (error) {
    console.error('❌ Error resetting admin user:', error);
  } finally {
    process.exit(0);
  }
}

resetAdmin();