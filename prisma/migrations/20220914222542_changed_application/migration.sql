-- AlterTable
ALTER TABLE "ApplicationForm" ADD COLUMN     "whyDoYouWantToJoin" TEXT,
ALTER COLUMN "howWillYouHelp" DROP NOT NULL,
ALTER COLUMN "longTerm" DROP NOT NULL;
