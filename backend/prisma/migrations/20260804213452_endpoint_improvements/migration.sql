/*
  Warnings:

  - A unique constraint covering the columns `[serialNumber]` on the table `Endpoint` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[macAddress]` on the table `Endpoint` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Endpoint" ADD COLUMN     "organizationId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Endpoint_serialNumber_key" ON "public"."Endpoint"("serialNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Endpoint_macAddress_key" ON "public"."Endpoint"("macAddress");

-- CreateIndex
CREATE INDEX "Endpoint_organizationId_idx" ON "public"."Endpoint"("organizationId");

-- AddForeignKey
ALTER TABLE "public"."Endpoint" ADD CONSTRAINT "Endpoint_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "public"."Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
