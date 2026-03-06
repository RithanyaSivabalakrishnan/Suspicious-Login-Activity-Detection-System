const pptxgen = require("pptxgenjs");

const pptx = new pptxgen();

// Theme
const BG = "09090B";
const CARD = "121214";
const GREEN = "22C55E";
const RED = "EF4444";
const ORANGE = "F97316";
const BLUE = "3B82F6";
const WHITE = "F4F4F5";
const MUTED = "A1A1AA";
const BORDER = "27272A";

pptx.layout = "LAYOUT_WIDE";
pptx.author = "Team";
pptx.title = "Suspicious Login Activity Detection System";

// ─── SLIDE 1: Title ───
let slide1 = pptx.addSlide();
slide1.background = { color: BG };
slide1.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: "100%", h: "100%", fill: { color: BG } });
slide1.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 2.0, w: 12.33, h: 0.06, fill: { color: GREEN } });
slide1.addText("SUSPICIOUS LOGIN\nACTIVITY DETECTION", {
  x: 0.5, y: 0.6, w: 12, h: 1.6,
  fontSize: 42, fontFace: "Arial", color: WHITE, bold: true,
  lineSpacingMultiple: 1.1,
});
slide1.addText("SYSTEM", {
  x: 0.5, y: 2.2, w: 12, h: 0.8,
  fontSize: 42, fontFace: "Arial", color: GREEN, bold: true,
});
slide1.addText("A Mini-SIEM Dashboard for Real-Time Login Anomaly Detection", {
  x: 0.5, y: 3.3, w: 10, h: 0.6,
  fontSize: 18, fontFace: "Arial", color: MUTED,
});
slide1.addText("Hackathon 2026  |  Next.js  •  Prisma  •  SQLite  •  Recharts", {
  x: 0.5, y: 6.5, w: 10, h: 0.5,
  fontSize: 14, fontFace: "Courier New", color: MUTED,
});

// ─── SLIDE 2: Problem Statement ───
let slide2 = pptx.addSlide();
slide2.background = { color: BG };
slide2.addText("THE PROBLEM", {
  x: 0.5, y: 0.3, w: 12, h: 0.7,
  fontSize: 32, fontFace: "Arial", color: RED, bold: true,
});
slide2.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 1.0, w: 3, h: 0.04, fill: { color: RED } });

const problems = [
  { icon: "🔓", title: "Account Takeover Attacks", desc: "Over 24 billion credentials exposed in breaches. Brute-force & credential-stuffing attacks are rising exponentially." },
  { icon: "🌍", title: "Impossible Travel", desc: "Attackers log in from different countries within minutes — a pattern humans can't catch in real-time." },
  { icon: "📊", title: "Alert Fatigue", desc: "Security teams are overwhelmed by thousands of raw logs. They need intelligent, prioritized alerts." },
  { icon: "⏱️", title: "Response Time", desc: "Average time to detect a breach is 204 days. Real-time detection can reduce this to seconds." },
];

problems.forEach((p, i) => {
  const y = 1.4 + i * 1.15;
  slide2.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: y, w: 12.33, h: 1.0,
    fill: { color: CARD }, line: { color: BORDER, width: 1 },
    rectRadius: 0.1,
  });
  slide2.addText(p.icon, { x: 0.7, y: y + 0.1, w: 0.6, h: 0.7, fontSize: 28 });
  slide2.addText(p.title, { x: 1.4, y: y + 0.05, w: 5, h: 0.4, fontSize: 16, fontFace: "Arial", color: WHITE, bold: true });
  slide2.addText(p.desc, { x: 1.4, y: y + 0.45, w: 11, h: 0.5, fontSize: 12, fontFace: "Arial", color: MUTED });
});

// ─── SLIDE 3: Our Solution ───
let slide3 = pptx.addSlide();
slide3.background = { color: BG };
slide3.addText("OUR SOLUTION", {
  x: 0.5, y: 0.3, w: 12, h: 0.7,
  fontSize: 32, fontFace: "Arial", color: GREEN, bold: true,
});
slide3.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 1.0, w: 3, h: 0.04, fill: { color: GREEN } });

slide3.addText(
  "A real-time Command & Control (C2) dashboard that monitors login events,\nscores them with a rule-based detection engine, and surfaces\nhigh-priority security alerts — all in a single Next.js application.",
  { x: 0.5, y: 1.3, w: 12, h: 1.0, fontSize: 16, fontFace: "Arial", color: MUTED, lineSpacingMultiple: 1.4 }
);

const features = [
  { title: "Rule-Based Engine", desc: "Brute force detection, Impossible travel, Tor exit node checks", color: BLUE },
  { title: "Anomaly Scoring", desc: "Statistical scoring based on velocity, distance & failure rates", color: ORANGE },
  { title: "Real-Time Dashboard", desc: "Live-polling C2 interface with charts, maps & triage logs", color: GREEN },
  { title: "Demo Playbooks", desc: "One-click attack simulations for live demonstrations", color: RED },
];

features.forEach((f, i) => {
  const col = i % 2;
  const row = Math.floor(i / 2);
  const x = 0.5 + col * 6.4;
  const y = 2.8 + row * 1.7;
  slide3.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: x, y: y, w: 6.0, h: 1.4,
    fill: { color: CARD }, line: { color: BORDER, width: 1 },
    rectRadius: 0.1,
  });
  slide3.addShape(pptx.shapes.RECTANGLE, { x: x, y: y, w: 0.08, h: 1.4, fill: { color: f.color } });
  slide3.addText(f.title, { x: x + 0.3, y: y + 0.15, w: 5.5, h: 0.4, fontSize: 16, fontFace: "Arial", color: WHITE, bold: true });
  slide3.addText(f.desc, { x: x + 0.3, y: y + 0.6, w: 5.5, h: 0.6, fontSize: 12, fontFace: "Arial", color: MUTED });
});

// ─── SLIDE 4: Architecture ───
let slide4 = pptx.addSlide();
slide4.background = { color: BG };
slide4.addText("SYSTEM ARCHITECTURE", {
  x: 0.5, y: 0.3, w: 12, h: 0.7,
  fontSize: 32, fontFace: "Arial", color: BLUE, bold: true,
});
slide4.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 1.0, w: 3, h: 0.04, fill: { color: BLUE } });

// Architecture boxes
const archBoxes = [
  { label: "Browser / Client", x: 0.5, y: 1.5, w: 3.5, h: 1.0, color: CARD, border: BORDER },
  { label: "Next.js App Router\n(API + Frontend)", x: 4.5, y: 1.5, w: 4.5, h: 1.0, color: CARD, border: GREEN },
  { label: "SQLite Database\n(Prisma ORM)", x: 9.5, y: 1.5, w: 3.5, h: 1.0, color: CARD, border: BLUE },
];
archBoxes.forEach((b) => {
  slide4.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: b.x, y: b.y, w: b.w, h: b.h,
    fill: { color: b.color }, line: { color: b.border, width: 1.5 },
    rectRadius: 0.1,
  });
  slide4.addText(b.label, { x: b.x + 0.2, y: b.y + 0.1, w: b.w - 0.4, h: b.h - 0.2, fontSize: 13, fontFace: "Arial", color: WHITE, align: "center", valign: "middle" });
});

// Arrow connectors
slide4.addText("→", { x: 3.9, y: 1.7, w: 0.6, h: 0.6, fontSize: 24, color: GREEN, align: "center" });
slide4.addText("→", { x: 8.9, y: 1.7, w: 0.6, h: 0.6, fontSize: 24, color: BLUE, align: "center" });

// Data flow
const layers = [
  { label: "POST /api/auth/login", desc: "Authentication + Detection Pipeline", y: 3.0, color: GREEN },
  { label: "Rule Engine", desc: "Brute Force • Impossible Travel • IP Reputation", y: 3.9, color: ORANGE },
  { label: "Anomaly Scorer", desc: "Statistical scoring: distance × velocity × failure rate", y: 4.8, color: RED },
  { label: "C2 Dashboard", desc: "SWR polling every 3s • KPI cards • Charts • Triage Logs", y: 5.7, color: BLUE },
];
layers.forEach((l) => {
  slide4.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: l.y, w: 12.33, h: 0.75,
    fill: { color: CARD }, line: { color: BORDER, width: 1 },
    rectRadius: 0.1,
  });
  slide4.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: l.y, w: 0.08, h: 0.75, fill: { color: l.color } });
  slide4.addText(l.label, { x: 0.8, y: l.y + 0.05, w: 4, h: 0.35, fontSize: 14, fontFace: "Courier New", color: l.color, bold: true });
  slide4.addText(l.desc, { x: 5.0, y: l.y + 0.05, w: 7.5, h: 0.35, fontSize: 12, fontFace: "Arial", color: MUTED });
});

// ─── SLIDE 5: Brute-Force & Account Takeover Prevention ───
let slide5bf = pptx.addSlide();
slide5bf.background = { color: BG };
slide5bf.addText("HOW WE PREVENT BRUTE-FORCE\n& ACCOUNT TAKEOVER", {
  x: 0.5, y: 0.2, w: 12, h: 0.9,
  fontSize: 28, fontFace: "Arial", color: RED, bold: true,
  lineSpacingMultiple: 1.1,
});
slide5bf.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 1.1, w: 4, h: 0.04, fill: { color: RED } });

const defenses = [
  { num: "01", title: "Real-Time Failure Monitoring", desc: "Every login queries the last hour of events. 5+ failures from the same user triggers brute_force_suspected.", color: ORANGE },
  { num: "02", title: "Multi-Factor Anomaly Scoring", desc: "Numerical score (0-100) combining failure rate, geo-distance, and login velocity — not just binary block/allow.", color: BLUE },
  { num: "03", title: "Impossible Travel Detection", desc: "Haversine distance calculation between consecutive logins. SF→Beijing in 2 min = instant critical alert.", color: RED },
  { num: "04", title: "Automatic Alert Triage", desc: "Score > 90 = Critical, > 80 = High, > 60 = Medium. Security teams see prioritized threats, not raw logs.", color: GREEN },
  { num: "05", title: "3-Second Detection Window", desc: "SWR polling every 3 seconds. Industry average breach detection is 204 days — we reduce it to seconds.", color: GREEN },
];

defenses.forEach((d, i) => {
  const y = 1.4 + i * 1.05;
  slide5bf.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: y, w: 12.33, h: 0.9,
    fill: { color: CARD }, line: { color: BORDER, width: 1 },
    rectRadius: 0.1,
  });
  slide5bf.addShape(pptx.shapes.OVAL, {
    x: 0.7, y: y + 0.1, w: 0.65, h: 0.65,
    fill: { color: d.color },
  });
  slide5bf.addText(d.num, { x: 0.7, y: y + 0.1, w: 0.65, h: 0.65, fontSize: 15, fontFace: "Arial", color: BG, bold: true, align: "center", valign: "middle" });
  slide5bf.addText(d.title, { x: 1.6, y: y + 0.05, w: 10, h: 0.35, fontSize: 15, fontFace: "Arial", color: WHITE, bold: true });
  slide5bf.addText(d.desc, { x: 1.6, y: y + 0.42, w: 10.8, h: 0.4, fontSize: 12, fontFace: "Arial", color: MUTED });
});

slide5bf.addText("Our system doesn't just block — it detects, scores, classifies, and surfaces threats in real-time.", {
  x: 0.5, y: 6.8, w: 12.33, h: 0.4,
  fontSize: 12, fontFace: "Arial", color: GREEN, italic: true, align: "center",
});

// ─── SLIDE 5: Tech Stack ───
let slide5 = pptx.addSlide();
slide5.background = { color: BG };
slide5.addText("TECH STACK", {
  x: 0.5, y: 0.3, w: 12, h: 0.7,
  fontSize: 32, fontFace: "Arial", color: ORANGE, bold: true,
});
slide5.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 1.0, w: 3, h: 0.04, fill: { color: ORANGE } });

const techItems = [
  { cat: "Frontend", items: "Next.js 16 (App Router) • React 19 • CSS Modules", color: GREEN },
  { cat: "Charts", items: "Recharts (Area, Pie, Bar) • Lucide React Icons", color: BLUE },
  { cat: "Backend", items: "Next.js API Routes • Custom Rule Engine • Anomaly Scorer", color: ORANGE },
  { cat: "Database", items: "SQLite via Prisma ORM v5 • Auto migrations", color: RED },
  { cat: "Polling", items: "SWR (stale-while-revalidate) • 3 second refresh interval", color: GREEN },
  { cat: "Dev Tools", items: "TypeScript • ESLint • tsx • ts-node", color: MUTED },
];

techItems.forEach((t, i) => {
  const y = 1.4 + i * 0.9;
  slide5.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: y, w: 12.33, h: 0.75,
    fill: { color: CARD }, line: { color: BORDER, width: 1 },
    rectRadius: 0.1,
  });
  slide5.addText(t.cat, { x: 0.8, y: y + 0.1, w: 2.5, h: 0.5, fontSize: 14, fontFace: "Arial", color: t.color, bold: true });
  slide5.addText(t.items, { x: 3.5, y: y + 0.1, w: 9, h: 0.5, fontSize: 13, fontFace: "Arial", color: WHITE });
});

// ─── SLIDE 6: Detection Rules ───
let slide6 = pptx.addSlide();
slide6.background = { color: BG };
slide6.addText("DETECTION ENGINE", {
  x: 0.5, y: 0.3, w: 12, h: 0.7,
  fontSize: 32, fontFace: "Arial", color: RED, bold: true,
});
slide6.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 1.0, w: 3, h: 0.04, fill: { color: RED } });

const rules = [
  { rule: "Brute Force Detection", trigger: "> 5 failed logins in 1 hour from same user", score: "+20 to +60", sev: "HIGH" },
  { rule: "Impossible Travel", trigger: "> 1000 km distance with < 12h gap between logins", score: "+40 to +70", sev: "CRITICAL" },
  { rule: "Fast Travel Anomaly", trigger: "< 1 min between logins from > 100 km away", score: "+50", sev: "HIGH" },
  { rule: "Extreme Distance", trigger: "Login from > 5000 km from home location", score: "+30", sev: "MEDIUM" },
];

// Table header
slide6.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.5, y: 1.4, w: 12.33, h: 0.5,
  fill: { color: BORDER }, rectRadius: 0.05,
});
slide6.addText("Rule", { x: 0.7, y: 1.45, w: 3, h: 0.4, fontSize: 12, fontFace: "Arial", color: WHITE, bold: true });
slide6.addText("Trigger Condition", { x: 3.8, y: 1.45, w: 5, h: 0.4, fontSize: 12, fontFace: "Arial", color: WHITE, bold: true });
slide6.addText("Score Impact", { x: 9.0, y: 1.45, w: 2, h: 0.4, fontSize: 12, fontFace: "Arial", color: WHITE, bold: true });
slide6.addText("Severity", { x: 11.2, y: 1.45, w: 1.5, h: 0.4, fontSize: 12, fontFace: "Arial", color: WHITE, bold: true });

rules.forEach((r, i) => {
  const y = 2.0 + i * 0.7;
  slide6.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: y, w: 12.33, h: 0.6,
    fill: { color: CARD }, line: { color: BORDER, width: 0.5 },
    rectRadius: 0.05,
  });
  slide6.addText(r.rule, { x: 0.7, y: y + 0.05, w: 3, h: 0.5, fontSize: 12, fontFace: "Arial", color: WHITE, bold: true });
  slide6.addText(r.trigger, { x: 3.8, y: y + 0.05, w: 5, h: 0.5, fontSize: 11, fontFace: "Courier New", color: MUTED });
  slide6.addText(r.score, { x: 9.0, y: y + 0.05, w: 2, h: 0.5, fontSize: 12, fontFace: "Courier New", color: ORANGE });
  const sevColor = r.sev === "CRITICAL" ? RED : r.sev === "HIGH" ? ORANGE : GREEN;
  slide6.addText(r.sev, { x: 11.2, y: y + 0.05, w: 1.5, h: 0.5, fontSize: 12, fontFace: "Arial", color: sevColor, bold: true });
});

slide6.addText("Scoring Formula", { x: 0.5, y: 5.0, w: 12, h: 0.5, fontSize: 16, fontFace: "Arial", color: WHITE, bold: true });
slide6.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.5, y: 5.5, w: 12.33, h: 1.0,
  fill: { color: CARD }, line: { color: BORDER, width: 1 },
  rectRadius: 0.1,
});
slide6.addText(
  "anomalyScore = f(distance) + f(failureRate) + f(velocity)\nsuspicionScore = anomalyScore × 1.2    if isSuspicious\nAlert generated when score > 60 OR any rule flag is triggered",
  { x: 0.8, y: 5.55, w: 11.5, h: 0.9, fontSize: 13, fontFace: "Courier New", color: GREEN, lineSpacingMultiple: 1.5 }
);

// ─── SLIDE 7: Dashboard Overview ───
let slide7 = pptx.addSlide();
slide7.background = { color: BG };
slide7.addText("C2 DASHBOARD", {
  x: 0.5, y: 0.3, w: 12, h: 0.7,
  fontSize: 32, fontFace: "Arial", color: GREEN, bold: true,
});
slide7.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 1.0, w: 3, h: 0.04, fill: { color: GREEN } });

const dashSections = [
  { title: "KPI Metrics Bar", desc: "Total events, failure rate %, critical alerts count — with pulsing glow for active threats", icon: "📊", y: 1.3 },
  { title: "Global Threat Map", desc: "World map visualization with pulsing red dots showing real-time attack origins", icon: "🌍", y: 2.3 },
  { title: "Authentication Vitals", desc: "Donut chart (Success vs Failure) + Area chart (Anomaly Score timeline)", icon: "📈", y: 3.3 },
  { title: "Live Event Triage", desc: "Terminal-style log viewer with color-coded status, IP, geo info and suspicion scores", icon: "🖥️", y: 4.3 },
  { title: "Active Security Alerts", desc: "Prioritized alert cards with severity badges, user info, IP, and raw JSON details", icon: "🚨", y: 5.3 },
  { title: "Demo Playbook Controls", desc: "One-click buttons to trigger brute-force (7 attempts) and impossible-travel simulations", icon: "▶️", y: 6.3 },
];
dashSections.forEach((s) => {
  slide7.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: s.y, w: 12.33, h: 0.85,
    fill: { color: CARD }, line: { color: BORDER, width: 1 },
    rectRadius: 0.1,
  });
  slide7.addText(s.icon, { x: 0.7, y: s.y + 0.1, w: 0.6, h: 0.6, fontSize: 22 });
  slide7.addText(s.title, { x: 1.4, y: s.y + 0.05, w: 5, h: 0.35, fontSize: 15, fontFace: "Arial", color: WHITE, bold: true });
  slide7.addText(s.desc, { x: 1.4, y: s.y + 0.42, w: 11, h: 0.35, fontSize: 12, fontFace: "Arial", color: MUTED });
});

// ─── SLIDE 8: Demo Flow ───
let slide8 = pptx.addSlide();
slide8.background = { color: BG };
slide8.addText("LIVE DEMO FLOW", {
  x: 0.5, y: 0.3, w: 12, h: 0.7,
  fontSize: 32, fontFace: "Arial", color: ORANGE, bold: true,
});
slide8.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 1.0, w: 3, h: 0.04, fill: { color: ORANGE } });

const steps = [
  { step: "01", title: "Open Dashboard", desc: "Navigate to http://localhost:3000 to see the C2 interface with seeded data", color: BLUE },
  { step: "02", title: "Trigger Brute Force", desc: "Click playbook_bruteforce.sh — 7 rapid failed logins from Russia appear in logs", color: ORANGE },
  { step: "03", title: "Watch Alerts Populate", desc: "Within 3 seconds, new alerts with severity badges appear in the side panel", color: RED },
  { step: "04", title: "Trigger Impossible Travel", desc: "Click playbook_impossibletravel.sh — Login from US, then China 2 seconds later", color: RED },
  { step: "05", title: "Observe Score Spikes", desc: "Anomaly score chart spikes to 100. Critical alert generated automatically.", color: GREEN },
];

steps.forEach((s, i) => {
  const y = 1.3 + i * 1.15;
  slide8.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: y, w: 12.33, h: 0.95,
    fill: { color: CARD }, line: { color: BORDER, width: 1 },
    rectRadius: 0.1,
  });
  slide8.addShape(pptx.shapes.OVAL, {
    x: 0.7, y: y + 0.12, w: 0.7, h: 0.7,
    fill: { color: s.color },
  });
  slide8.addText(s.step, { x: 0.7, y: y + 0.12, w: 0.7, h: 0.7, fontSize: 16, fontFace: "Arial", color: BG, bold: true, align: "center", valign: "middle" });
  slide8.addText(s.title, { x: 1.7, y: y + 0.05, w: 10, h: 0.4, fontSize: 16, fontFace: "Arial", color: WHITE, bold: true });
  slide8.addText(s.desc, { x: 1.7, y: y + 0.45, w: 10, h: 0.4, fontSize: 12, fontFace: "Arial", color: MUTED });
});

// ─── SLIDE 9: Future Scope ───
let slide9 = pptx.addSlide();
slide9.background = { color: BG };
slide9.addText("FUTURE SCOPE", {
  x: 0.5, y: 0.3, w: 12, h: 0.7,
  fontSize: 32, fontFace: "Arial", color: BLUE, bold: true,
});
slide9.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 1.0, w: 3, h: 0.04, fill: { color: BLUE } });

const futureItems = [
  { title: "ML-Based Anomaly Detection", desc: "Replace rule-based scoring with trained Isolation Forest / Autoencoder models" },
  { title: "Real IP Geolocation API", desc: "Integrate IPInfo or MaxMind for production-grade IP intelligence" },
  { title: "WebSocket Real-Time", desc: "Replace SWR polling with WebSocket push for instant event streaming" },
  { title: "User Authentication", desc: "Add JWT-based auth with bcrypt password hashing for production use" },
  { title: "Mapbox GL Integration", desc: "Replace simulation map with interactive Mapbox GL JS with real coordinates" },
  { title: "Vercel Deployment", desc: "Deploy to Vercel with Prisma Postgres or PlanetScale for cloud hosting" },
];

futureItems.forEach((f, i) => {
  const y = 1.3 + i * 0.9;
  slide9.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: y, w: 12.33, h: 0.75,
    fill: { color: CARD }, line: { color: BORDER, width: 1 },
    rectRadius: 0.1,
  });
  slide9.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: y, w: 0.08, h: 0.75, fill: { color: BLUE } });
  slide9.addText(f.title, { x: 0.8, y: y + 0.05, w: 4, h: 0.3, fontSize: 14, fontFace: "Arial", color: WHITE, bold: true });
  slide9.addText(f.desc, { x: 0.8, y: y + 0.35, w: 11.5, h: 0.3, fontSize: 12, fontFace: "Arial", color: MUTED });
});

// ─── SLIDE 10: Thank You ───
let slide10 = pptx.addSlide();
slide10.background = { color: BG };
slide10.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 3.3, w: 12.33, h: 0.06, fill: { color: GREEN } });
slide10.addText("THANK YOU", {
  x: 0.5, y: 1.5, w: 12.33, h: 1.5,
  fontSize: 48, fontFace: "Arial", color: WHITE, bold: true,
  align: "center",
});
slide10.addText("Questions & Live Demo", {
  x: 0.5, y: 3.6, w: 12.33, h: 0.8,
  fontSize: 24, fontFace: "Arial", color: GREEN,
  align: "center",
});
slide10.addText("github.com/RithanyaSivabalakrishnan/Suspicious-Login-Activity-Detection-System", {
  x: 0.5, y: 5.5, w: 12.33, h: 0.5,
  fontSize: 13, fontFace: "Courier New", color: MUTED,
  align: "center",
});

// ─── SAVE ───
pptx.writeFile({ fileName: "Suspicious_Login_Detection_Presentation.pptx" })
  .then(() => console.log("Presentation saved!"))
  .catch((err) => console.error(err));
