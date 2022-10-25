-- CreateTable
CREATE TABLE "mailing_list" (
    "email" TEXT NOT NULL,
    "signup_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mailing_list_pkey" PRIMARY KEY ("email")
);
