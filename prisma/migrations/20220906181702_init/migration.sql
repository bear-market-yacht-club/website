-- CreateTable
CREATE TABLE "ApplicationForm" (
    "id" TEXT NOT NULL,
    "howWillYouHelp" TEXT NOT NULL,
    "longTerm" TEXT NOT NULL,
    "twitterHandle" TEXT NOT NULL,
    "discordHandle" TEXT NOT NULL,
    "ethAddress" TEXT NOT NULL,

    CONSTRAINT "ApplicationForm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationForm_twitterHandle_key" ON "ApplicationForm"("twitterHandle");

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationForm_discordHandle_key" ON "ApplicationForm"("discordHandle");

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationForm_ethAddress_key" ON "ApplicationForm"("ethAddress");
