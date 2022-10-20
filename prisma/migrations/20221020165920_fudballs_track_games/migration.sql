-- CreateTable
CREATE TABLE "fudball_games" (
    "id" TEXT NOT NULL,
    "twitter_handle" TEXT NOT NULL,
    "date_played" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "score" INTEGER NOT NULL,
    "time_survived" INTEGER NOT NULL,

    CONSTRAINT "fudball_games_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "fudball_games" ADD CONSTRAINT "fudball_games_twitter_handle_fkey" FOREIGN KEY ("twitter_handle") REFERENCES "fudballs"("twitter_handle") ON DELETE RESTRICT ON UPDATE CASCADE;
