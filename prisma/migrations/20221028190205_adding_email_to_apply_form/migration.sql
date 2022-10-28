/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `ApplicationForm` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ApplicationForm" ADD COLUMN     "email" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationForm_email_key" ON "ApplicationForm"("email");
