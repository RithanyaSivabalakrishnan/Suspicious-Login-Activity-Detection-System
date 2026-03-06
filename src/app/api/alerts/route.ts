import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const alerts = await prisma.alert.findMany({
      take: 50,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { username: true } },
        loginEvent: { select: { ipAddress: true, geoCountry: true, geoCity: true } }
      },
    });
    return NextResponse.json(alerts);
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return NextResponse.json({ error: 'Failed to fetch alerts' }, { status: 500 });
  }
}
