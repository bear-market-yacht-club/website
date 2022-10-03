-- CreateTable
CREATE TABLE "game_settings" (
    "twitter_handle" TEXT NOT NULL,
    "muted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "game_settings_pkey" PRIMARY KEY ("twitter_handle")
);
