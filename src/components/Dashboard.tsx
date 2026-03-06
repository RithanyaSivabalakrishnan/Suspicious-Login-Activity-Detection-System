"use client";

import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { formatDistanceToNow } from "date-fns";
import {
  Activity,
  AlertTriangle,
  Globe,
  MapPin,
  ShieldAlert,
  Terminal,
  UserX,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";
import styles from "@/app/Dashboard.module.css";

// Fetcher for SWR polling
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Dashboard() {
  const { data: events, error: eventsError } = useSWR("/api/events", fetcher, {
    refreshInterval: 3000,
  });
  const { data: alerts, error: alertsError } = useSWR("/api/alerts", fetcher, {
    refreshInterval: 3000,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="p-8">Initializing C2 Protocol...</div>;

  // Compute Metrics from events
  const totalEvents = events?.length || 0;
  const failedEvents = events?.filter((e: any) => !e.success).length || 0;
  const failureRate = totalEvents > 0 ? (failedEvents / totalEvents) * 100 : 0;
  const highRiskAlerts =
    alerts?.filter(
      (a: any) => a.severity === "high" || a.severity === "critical"
    ).length || 0;

  // Chart Data: Success vs Failure
  const pieData = [
    { name: "Success", value: totalEvents - failedEvents, color: "#22c55e" },
    { name: "Failure", value: failedEvents, color: "#ef4444" },
  ];

  // Chart Data: Time Series (last 20 events simplified)
  const timeSeriesData = (events || [])
    .slice(0, 20)
    .reverse()
    .map((e: any, i: number) => ({
      index: i,
      score: e.anomalyScore || 0,
      isSuspicious: e.isSuspicious ? 1 : 0,
    }));

  return (
    <div className={styles.dashboardContainer}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.title}>
          <ShieldAlert className={styles.titleIcon} size={28} />
          <span>NEXUS // LOGIN C2</span>
        </div>
        <div className={styles.statusIndicator}>
          <div className={styles.statusDot} />
          SYSTEM ONLINE // POLLING
        </div>
      </header>

      {/* Main Grid Body */}
      <div className={styles.mainPanel}>
        {/* Top Row: KPIs */}
        <div className={styles.flexRow} style={{ height: "140px" }}>
          <KpiCard
            title="Total Events (24h)"
            value={totalEvents}
            icon={<Activity size={20} />}
            color="var(--accent-blue)"
          />
          <KpiCard
            title="Authentication Failure Rate"
            value={`${failureRate.toFixed(1)}%`}
            icon={<UserX size={20} />}
            color="var(--accent-orange)"
          />
          <KpiCard
            title="Critical Alerts"
            value={highRiskAlerts}
            icon={<AlertTriangle size={20} />}
            color="var(--accent-red)"
            pulse={highRiskAlerts > 0}
          />
        </div>

        {/* Middle Row: Visualization */}
        <div className={styles.flexRow} style={{ flex: 1, minHeight: 0 }}>
          {/* Threat Map Placeholder */}
          <div className={`${styles.card} ${styles.flex1}`}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>
                <Globe size={18} /> Global Threat Map
              </div>
            </div>
            <div
              className={styles.cardContent}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg') no-repeat center center",
                backgroundSize: "cover",
                opacity: 0.3,
                filter: "invert(1) hue-rotate(180deg)",
                position: "relative"
              }}
            >
              {/* Overlay active attack coordinates */}
              {events?.filter((e:any) => e.isSuspicious).slice(0, 5).map((ev: any, idx: number) => (
                <div key={idx} style={{
                  position: "absolute",
                  top: `${Math.random() * 80 + 10}%`,
                  left: `${Math.random() * 80 + 10}%`,
                  width: "10px",
                  height: "10px",
                  background: "var(--accent-red)",
                  borderRadius: "50%",
                  boxShadow: "0 0 10px var(--accent-red)",
                  animation: "pulseGlow 1.5s infinite"
                }} title={`${ev.geoCity}, ${ev.geoCountry}`} />
              ))}
              <div style={{ position: "absolute", bottom: "10px", right: "10px", fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--accent-green)"}}>
                [MAP_SIMULATION_ACTIVE]
              </div>
            </div>
          </div>

          {/* Vitals Charts */}
          <div className={styles.card} style={{ flex: "0 0 350px" }}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>
                <Activity size={18} /> Authentication Vitals
              </div>
            </div>
            <div className={styles.cardContent} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ height: "150px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: 'var(--bg-dark)', borderColor: 'var(--border-subtle)', borderRadius: '8px' }}
                      itemStyle={{ color: 'var(--text-main)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div style={{ height: "150px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timeSeriesData}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--accent-orange)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="var(--accent-orange)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="index" hide />
                    <YAxis hide domain={[0, 100]} />
                    <RechartsTooltip contentStyle={{ backgroundColor: 'var(--bg-dark)', borderColor: 'var(--border-subtle)' }} />
                    <Area type="monotone" dataKey="score" stroke="var(--accent-orange)" fillOpacity={1} fill="url(#colorScore)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Terminal Log Viewer */}
        <div className={styles.card} style={{ height: "250px" }}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>
              <Terminal size={18} /> Live Event Triage (Tail)
            </div>
          </div>
          <div className={styles.cardContent} style={{ fontFamily: "var(--font-mono)", fontSize: "0.80rem", lineHeight: 1.6 }}>
            {!events && <div style={{ color: "var(--text-muted)" }}>Connecting to log stream...</div>}
            {events?.map((e: any) => (
              <div key={e.id} style={{ display: "flex", gap: "16px", padding: "4px 0", borderBottom: "1px dashed #27272a" }}>
                <span style={{ color: "var(--text-muted)", width: "140px", flexShrink: 0 }}>
                  {formatDistanceToNow(new Date(e.timestamp), { addSuffix: true })}
                </span>
                <span style={{ color: e.success ? "var(--accent-green)" : "var(--accent-red)", width: "60px", flexShrink: 0 }}>
                  {e.success ? "[ OK ]" : "[FAIL]"}
                </span>
                <span style={{ color: "var(--accent-blue)", width: "120px", flexShrink: 0 }}>{e.ipAddress}</span>
                <span style={{ width: "100px", flexShrink: 0 }}>{e.user?.username || "unknown"}</span>
                <span style={{ color: "var(--text-muted)", flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {e.geoCity}, {e.geoCountry} • {e.userAgent}
                </span>
                {e.isSuspicious && (
                  <span style={{ color: "var(--accent-orange)", background: "rgba(249, 115, 22, 0.1)", padding: "0 6px", borderRadius: "4px" }}>
                    SCORE:{e.suspicionScore?.toFixed(0)}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Side Panel: Active Alerts */}
      <div className={styles.sidePanel}>
        <div className={styles.card} style={{ flex: 1 }}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>
              <AlertTriangle size={18} /> Active Security Alerts
            </div>
          </div>
          <div className={styles.cardContent} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {alerts?.length === 0 && (
              <div style={{ color: "var(--text-muted)", fontSize: "0.875rem", textAlign: "center", marginTop: "40px" }}>
                No active alerts detected.
              </div>
            )}
            {alerts?.map((alert: any) => {
              const isCrit = alert.severity === "critical" || alert.severity === "high";
              return (
                <div key={alert.id} style={{
                  background: isCrit ? "rgba(239, 68, 68, 0.05)" : "rgba(39, 39, 42, 0.4)",
                  border: `1px solid ${isCrit ? "rgba(239, 68, 68, 0.2)" : "var(--border-subtle)"}`,
                  borderRadius: "8px",
                  padding: "12px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <MapPin size={14} color={isCrit ? "var(--accent-red)" : "var(--accent-orange)"} />
                      <span style={{ fontSize: "0.875rem", fontWeight: 600, color: isCrit ? "var(--accent-red)" : "var(--accent-orange)", textTransform: "uppercase" }}>
                        {alert.alertType.replace(/_/g, " ")}
                      </span>
                    </div>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      {formatDistanceToNow(new Date(alert.createdAt))} ago
                    </span>
                  </div>
                  <div style={{ fontSize: "0.875rem", color: "var(--text-main)", display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span>User: <strong style={{ color: "var(--accent-blue)" }}>{alert.user?.username}</strong></span>
                    <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>
                      IP: {alert.loginEvent?.ipAddress} ({alert.loginEvent?.geoCity}, {alert.loginEvent?.geoCountry})
                    </span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", background: "rgba(0,0,0,0.3)", padding: "4px", borderRadius: "4px", marginTop: "4px" }}>
                      {alert.details}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Simulation Controls */}
        <div className={styles.card} style={{ height: "180px" }}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>
              <Terminal size={18} /> Demo Playbooks
            </div>
          </div>
          <div className={styles.cardContent} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <button
              onClick={() => fetch('/api/simulate/brute-force', { method: 'POST'})}
              style={{
                background: "var(--bg-dark)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-main)",
                padding: "10px 16px",
                borderRadius: "6px",
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
                fontSize: "0.875rem",
                textAlign: "left",
                transition: "all 0.2s"
              }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = "var(--accent-orange)"}
              onMouseOut={(e) => e.currentTarget.style.borderColor = "var(--border-subtle)"}
            >
              &gt; exec playbook_bruteforce.sh
            </button>
            <button
              onClick={() => fetch('/api/simulate/impossible-travel', { method: 'POST'})}
              style={{
                background: "var(--bg-dark)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-main)",
                padding: "10px 16px",
                borderRadius: "6px",
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
                fontSize: "0.875rem",
                textAlign: "left",
                transition: "all 0.2s"
              }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = "var(--accent-red)"}
              onMouseOut={(e) => e.currentTarget.style.borderColor = "var(--border-subtle)"}
            >
              &gt; exec playbook_impossibletravel.sh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper KPI Card
function KpiCard({ title, value, icon, color, pulse = false }: any) {
  return (
    <div className={`${styles.card} ${styles.flex1} ${pulse ? "animate-pulse-red" : ""}`}>
      <div style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "8px", display: "flex", justifyContent: "space-between" }}>
        {title}
        <span style={{ color }}>{icon}</span>
      </div>
      <div style={{ fontSize: "2.5rem", fontWeight: 700, color: "var(--text-main)", fontFamily: "var(--font-mono)", marginTop: "auto" }}>
        {value}
      </div>
    </div>
  );
}
