/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'SUPER_ADMIN';

-- CreateIndex
CREATE UNIQUE INDEX "Organization_email_key" ON "public"."Organization"("email");
