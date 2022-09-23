-- CreateTable
CREATE TABLE "flappy_bear" (
    "twitter_handle" TEXT NOT NULL,
    "highscore" INTEGER NOT NULL DEFAULT 0,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "flappy_bear_pkey" PRIMARY KEY ("twitter_handle")
);
