-- CreateTable
CREATE TABLE "public"."EndpointHealth" (
    "id" TEXT NOT NULL,
    "endpointId" TEXT NOT NULL,
    "cpuUsage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "memoryUsage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "diskUsage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "uptimeSeconds" BIGINT NOT NULL DEFAULT 0,
    "defenderEnabled" BOOLEAN NOT NULL DEFAULT false,
    "firewallEnabled" BOOLEAN NOT NULL DEFAULT false,
    "bitLockerEnabled" BOOLEAN NOT NULL DEFAULT false,
    "secureBootEnabled" BOOLEAN NOT NULL DEFAULT false,
    "tpmEnabled" BOOLEAN NOT NULL DEFAULT false,
    "agentRunning" BOOLEAN NOT NULL DEFAULT true,
    "networkConnected" BOOLEAN NOT NULL DEFAULT true,
    "pendingRestart" BOOLEAN NOT NULL DEFAULT false,
    "healthScore" INTEGER NOT NULL DEFAULT 100,
    "securityScore" INTEGER NOT NULL DEFAULT 100,
    "riskScore" INTEGER NOT NULL DEFAULT 0,
    "lastCollected" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EndpointHealth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EndpointHealth_endpointId_key" ON "public"."EndpointHealth"("endpointId");

-- CreateIndex
CREATE INDEX "EndpointHealth_healthScore_idx" ON "public"."EndpointHealth"("healthScore");

-- CreateIndex
CREATE INDEX "EndpointHealth_securityScore_idx" ON "public"."EndpointHealth"("securityScore");

-- CreateIndex
CREATE INDEX "EndpointHealth_riskScore_idx" ON "public"."EndpointHealth"("riskScore");

-- AddForeignKey
ALTER TABLE "public"."EndpointHealth" ADD CONSTRAINT "EndpointHealth_endpointId_fkey" FOREIGN KEY ("endpointId") REFERENCES "public"."Endpoint"("id") ON DELETE CASCADE ON UPDATE CASCADE;
