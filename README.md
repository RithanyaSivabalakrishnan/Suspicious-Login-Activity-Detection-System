# 🛡️ Suspicious Login Activity Detection System

A real-time **Command & Control (C2) dashboard** that monitors login events, scores them with a rule-based detection engine, and surfaces high-priority security alerts — built as a single Next.js application.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js) ![Prisma](https://img.shields.io/badge/Prisma-5-blue?logo=prisma) ![SQLite](https://img.shields.io/badge/SQLite-3-green?logo=sqlite) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)

## ✨ Features

- **Rule-Based Detection Engine** — Brute force detection, impossible travel, Tor exit node checks
- **Anomaly Scoring** — Statistical scoring based on velocity, distance & failure rates (0–100)
- **Real-Time Dashboard** — Live-polling C2 interface with charts, maps & triage logs (3s refresh)
- **Demo Playbooks** — One-click attack simulations for live demonstrations

## 🔐 How It Prevents Brute-Force Attacks & Account Takeover

### 1. Real-Time Failure Rate Monitoring
The login endpoint queries all events from the same user **within the last hour**. More than **5 failed attempts** triggers a `brute_force_suspected` flag — catching credential-stuffing bots that try thousands of passwords rapidly.

### 2. Multi-Factor Anomaly Scoring
Rather than binary "block or allow", the engine computes a **numerical anomaly score** (0–100):

| Factor | Condition | Score Impact |
|--------|-----------|-------------|
| Failure frequency | 3+ failures in 1h | +20 |
| Failure frequency | 10+ failures in 1h | +40 |
| Geographic distance | > 1000 km from home | +40 |
| Extreme distance | > 5000 km from home | +30 |
| Velocity anomaly | < 1 min + > 100 km | +50 |

When the score **exceeds 60**, the event is classified as suspicious and an **Alert** is automatically generated.

### 3. Impossible Travel Detection
If the same account logs in from **San Francisco** and then **Beijing** within minutes, the system calculates the Haversine distance (~9500 km). Since physically traveling that distance is impossible, it triggers `impossible_travel` — a strong indicator of **stolen credentials**.

### 4. Automatic Alert Triage
Each alert is auto-classified by severity:
- **Score > 90** → Critical
- **Score > 80** → High  
- **Score > 60** → Medium

### 5. Near-Instant Detection
The dashboard polls every **3 seconds**, shrinking the detection window from the industry average of **204 days** to **seconds**.

## 🏗️ Architecture

```
Browser → Next.js App Router → SQLite (Prisma ORM)
              │
              ├── POST /api/auth/login     (Auth + Detection Pipeline)
              ├── GET  /api/events         (Dashboard Data)
              ├── GET  /api/alerts         (Alert Feed)
              ├── POST /api/simulate/brute-force
              └── POST /api/simulate/impossible-travel
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Generate Prisma Client & apply migrations
npx prisma generate
npx prisma migrate dev

# Seed the database with mock data
npx prisma db seed

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the C2 Dashboard.

## 🎮 Demo Playbooks

Click the playbook buttons on the dashboard (bottom-right panel):

1. **`exec playbook_bruteforce.sh`** — Fires 7 rapid failed logins from Russia
2. **`exec playbook_impossibletravel.sh`** — Logs in from US, then China 2 seconds later

Watch the logs, charts, and alerts react in real-time!

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, React 19, CSS Modules |
| Charts | Recharts, Lucide React Icons |
| Backend | Next.js API Routes, Custom Rule Engine |
| Database | SQLite via Prisma ORM v5 |
| Polling | SWR (3 second refresh) |
| Language | TypeScript |

## 📄 License

MIT
