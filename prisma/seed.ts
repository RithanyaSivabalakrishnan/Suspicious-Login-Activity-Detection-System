import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create a mock user
  const user = await prisma.user.upsert({
    where: { username: 'testuser' },
    update: {},
    create: {
      username: 'testuser',
      passwordHash: 'hashed_password_mock',
      homeCountry: 'US',
      homeLat: 37.7749,
      homeLon: -122.4194,
    },
  });

  console.log('Created user:', user.username);

  // Mock a normal login
  await prisma.loginEvent.create({
    data: {
      userId: user.id,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      ipAddress: '192.168.1.1',
      userAgent: 'Mozilla/5.0',
      geoCountry: 'US',
      geoCity: 'San Francisco',
      latitude: 37.7749,
      longitude: -122.4194,
      success: true,
      anomalyScore: 0.1,
      suspicionScore: 0.0,
      isSuspicious: false,
    },
  });

  // Mock a suspicious brute force attempt
  const suspiciousEvent = await prisma.loginEvent.create({
    data: {
      userId: user.id,
      timestamp: new Date(),
      ipAddress: '45.33.12.1',
      userAgent: 'curl/7.64.1',
      geoCountry: 'RU',
      geoCity: 'Moscow',
      latitude: 55.7558,
      longitude: 37.6173,
      success: false,
      failureReason: 'invalid_password',
      ruleFlags: JSON.stringify(['impossible_travel', 'brute_force_suspected']),
      anomalyScore: 0.95,
      suspicionScore: 85.0,
      isSuspicious: true,
    },
  });

  // Create an alert for it
  await prisma.alert.create({
    data: {
      userId: user.id,
      loginEventId: suspiciousEvent.id,
      alertType: 'impossible_travel',
      severity: 'high',
      details: JSON.stringify({ distance: '9000km', duration_hours: 24 }),
    },
  });

  console.log('Created mock events & alerts.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
