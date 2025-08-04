-- CreateTable
CREATE TABLE "public"."codeforcesProblem" (
    "id" SERIAL NOT NULL,
    "contestId" INTEGER NOT NULL,
    "index" TEXT NOT NULL,
    "name" TEXT,
    "type" TEXT,
    "points" INTEGER,
    "tags" TEXT[],
    "rating" INTEGER,

    CONSTRAINT "codeforcesProblem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "codeforcesProblem_contestId_index_key" ON "public"."codeforcesProblem"("contestId", "index");
