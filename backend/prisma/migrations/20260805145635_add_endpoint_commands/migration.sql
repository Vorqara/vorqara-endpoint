-- CreateEnum
CREATE TYPE "public"."CommandStatus" AS ENUM ('PENDING', 'RUNNING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "public"."EndpointCommand" (
    "id" TEXT NOT NULL,
    "endpointId" TEXT NOT NULL,
    "command" TEXT NOT NULL,
    "payload" JSONB,
    "status" "public"."CommandStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "executedAt" TIMESTAMP(3),

    CONSTRAINT "EndpointCommand_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EndpointCommand_endpointId_idx" ON "public"."EndpointCommand"("endpointId");

-- CreateIndex
CREATE INDEX "EndpointCommand_status_idx" ON "public"."EndpointCommand"("status");

-- AddForeignKey
ALTER TABLE "public"."EndpointCommand" ADD CONSTRAINT "EndpointCommand_endpointId_fkey" FOREIGN KEY ("endpointId") REFERENCES "public"."Endpoint"("id") ON DELETE CASCADE ON UPDATE CASCADE;
