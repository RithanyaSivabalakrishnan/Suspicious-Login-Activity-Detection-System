-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "homeCountry" TEXT,
    "homeLat" REAL,
    "homeLon" REAL
);

-- CreateTable
CREATE TABLE "LoginEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" TEXT NOT NULL,
    "userAgent" TEXT,
    "geoCountry" TEXT,
    "geoCity" TEXT,
    "latitude" REAL,
    "longitude" REAL,
    "success" BOOLEAN NOT NULL,
    "failureReason" TEXT,
    "ruleFlags" TEXT,
    "anomalyScore" REAL,
    "suspicionScore" REAL,
    "isSuspicious" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "LoginEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Alert" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "loginEventId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "alertType" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "details" TEXT,
    "resolved" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Alert_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Alert_loginEventId_fkey" FOREIGN KEY ("loginEventId") REFERENCES "LoginEvent" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "IPCache" (
    "ipAddress" TEXT NOT NULL PRIMARY KEY,
    "country" TEXT,
    "city" TEXT,
    "lat" REAL,
    "lon" REAL,
    "abuseScore" REAL,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "LoginEvent_userId_idx" ON "LoginEvent"("userId");

-- CreateIndex
CREATE INDEX "LoginEvent_ipAddress_idx" ON "LoginEvent"("ipAddress");

-- CreateIndex
CREATE INDEX "LoginEvent_timestamp_idx" ON "LoginEvent"("timestamp");

-- CreateIndex
CREATE INDEX "Alert_userId_idx" ON "Alert"("userId");

-- CreateIndex
CREATE INDEX "Alert_loginEventId_idx" ON "Alert"("loginEventId");

-- CreateIndex
CREATE INDEX "Alert_createdAt_idx" ON "Alert"("createdAt");
