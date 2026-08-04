-- CreateEnum
CREATE TYPE "public"."EndpointStatus" AS ENUM ('ONLINE', 'OFFLINE', 'ISOLATED', 'QUARANTINED', 'RETIRED');

-- CreateEnum
CREATE TYPE "public"."OperatingSystem" AS ENUM ('WINDOWS', 'LINUX', 'MACOS');

-- CreateTable
CREATE TABLE "public"."Endpoint" (
    "id" TEXT NOT NULL,
    "hostname" TEXT NOT NULL,
    "deviceName" TEXT,
    "operatingSystem" "public"."OperatingSystem" NOT NULL,
    "osVersion" TEXT,
    "agentVersion" TEXT,
    "serialNumber" TEXT,
    "ipAddress" TEXT,
    "macAddress" TEXT,
    "username" TEXT,
    "status" "public"."EndpointStatus" NOT NULL DEFAULT 'OFFLINE',
    "lastSeenAt" TIMESTAMP(3),
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Endpoint_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Endpoint_hostname_idx" ON "public"."Endpoint"("hostname");

-- CreateIndex
CREATE INDEX "Endpoint_status_idx" ON "public"."Endpoint"("status");

-- CreateIndex
CREATE INDEX "Endpoint_lastSeenAt_idx" ON "public"."Endpoint"("lastSeenAt");
