import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  try {
    await connectDB();
    const adminUser = await User.findOne({ email: 'admin@sybau.com' });
    
    return NextResponse.json({
      status: 'connected',
      adminExists: !!adminUser,
      adminEmail: adminUser ? adminUser.email : null,
      adminRole: adminUser ? adminUser.role : null
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      message: error.message
    }, { status: 500 });
  }
}