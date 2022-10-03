-- CreateTable
CREATE TABLE "fudballs" (
    "twitter_handle" TEXT NOT NULL,
    "first_play_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "highscore" INTEGER NOT NULL DEFAULT 0,
    "best_time" INTEGER NOT NULL DEFAULT 0,
    "time_played" INTEGER NOT NULL DEFAULT 0,
    "game_started" TIMESTAMP(3),

    CONSTRAINT "fudballs_pkey" PRIMARY KEY ("twitter_handle")
);
