/*
  Warnings:

  - You are about to alter the column `time_played` on the `flappy_bear` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "flappy_bear" ALTER COLUMN "time_played" SET DEFAULT 0,
ALTER COLUMN "time_played" SET DATA TYPE INTEGER;
