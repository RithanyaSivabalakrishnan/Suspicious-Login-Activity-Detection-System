import { NextResponse } from 'next/server';

export async function POST() {
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const targetUrl = `${origin}/api/auth/login`;

  try {
    // Event 1: US Login
    await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'testuser',
        password: 'hashed_password_mock',
        ip: '73.12.34.56',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        country: 'US',
        city: 'San Francisco',
        lat: 37.7749,
        lon: -122.4194,
      }),
    });

    // Wait 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Event 2: China Login (Impossible travel from US)
    await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'testuser',
        password: 'hashed_password_mock',
        ip: '114.114.114.114',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        country: 'CN',
        city: 'Beijing',
        lat: 39.9042,
        lon: 116.4074,
      }),
    });

    return NextResponse.json({ message: 'Impossible travel simulation triggered' });
  } catch (error) {
    console.error('Simulation error:', error);
    return NextResponse.json({ error: 'Failed to trigger simulation' }, { status: 500 });
  }
}
