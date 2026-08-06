-- AlterTable
ALTER TABLE "public"."EndpointCommand" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "error" TEXT,
ADD COLUMN     "exitCode" INTEGER,
ADD COLUMN     "output" JSONB;
