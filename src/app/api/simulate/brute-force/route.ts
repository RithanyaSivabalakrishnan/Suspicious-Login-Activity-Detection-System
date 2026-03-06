import { NextResponse } from 'next/server';

export async function POST() {
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const targetUrl = `${origin}/api/auth/login`;

  try {
    const promises = [];
    for (let i = 0; i < 7; i++) {
      promises.push(
        fetch(targetUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: 'testuser',
            password: `wrong_pass_${i}`,
            ip: '104.28.14.72',
            userAgent: 'python-requests/2.25.1',
            country: 'RU',
            city: 'St. Petersburg',
            lat: 59.9311,
            lon: 30.3609,
          }),
        })
      );
    }

    await Promise.allSettled(promises);
    return NextResponse.json({ message: 'Brute force simulation triggered (7 attempts)' });
  } catch (error) {
    console.error('Simulation error:', error);
    return NextResponse.json({ error: 'Failed to trigger simulation' }, { status: 500 });
  }
}
