import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { computeAnomalyScore, detectRules } from "@/lib/engine";

// Mock helper to calculate distance between two lat/lon points
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  // Haversine formula (simplified for mock purposes)
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password, ip, userAgent, lat, lon, country, city } = body;

    if (!username || !password) {
      return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
    }

    // 1. Fetch user
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      // Dummy response for non-existent users
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isSuccess = user.passwordHash === password;

    // 2. Fetch recent events for context
    const recentEvents = await prisma.loginEvent.findMany({
      where: {
        userId: user.id,
        timestamp: { gte: new Date(Date.now() - 1000 * 60 * 60) }, // Last hour
      },
      orderBy: { timestamp: "desc" },
    });

    const failuresLastHour = recentEvents.filter((e) => !e.success).length;
    let timeSinceLastLogin = 60000 * 60 * 24; // Default to 24h
    let distanceKm = 0;

    if (recentEvents.length > 0) {
      timeSinceLastLogin = Date.now() - recentEvents[0].timestamp.getTime();
      distanceKm = getDistance(
        lat || 0,
        lon || 0,
        recentEvents[0].latitude || 0,
        recentEvents[0].longitude || 0
      );
    }

    // 3. Run rules and anomaly detection
    const flags = detectRules(failuresLastHour, distanceKm, timeSinceLastLogin);
    const score = computeAnomalyScore({
      distanceKm,
      failuresInLastHour: failuresLastHour,
      timeSinceLastLoginMs: timeSinceLastLogin,
    });

    const isSuspicious = score > 60 || flags.length > 0;

    // 4. Log event
    const event = await prisma.loginEvent.create({
      data: {
        userId: user.id,
        ipAddress: ip || "127.0.0.1",
        userAgent: userAgent || "Unknown",
        geoCountry: country || "Unknown",
        geoCity: city || "Unknown",
        latitude: lat,
        longitude: lon,
        success: isSuccess,
        failureReason: isSuccess ? null : "invalid_credentials",
        ruleFlags: JSON.stringify(flags),
        anomalyScore: score,
        suspicionScore: isSuspicious ? score * 1.2 : score,
        isSuspicious,
      },
    });

    // 5. Generate Alert if highly suspicious
    if (isSuspicious) {
      let severity = "low";
      if (score > 80) severity = "high";
      else if (score > 90) severity = "critical";
      else if (score > 60) severity = "medium";

      await prisma.alert.create({
        data: {
          userId: user.id,
          loginEventId: event.id,
          alertType: flags.length > 0 ? flags[0] : "anomaly",
          severity,
          details: JSON.stringify({ distanceKm, failuresLastHour, score }),
        },
      });
    }

    if (!isSuccess) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    return NextResponse.json({ message: "Login successful", event });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
