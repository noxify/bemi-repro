-- CreateTable
CREATE TABLE "bemi"."changes" (
    "id" TEXT NOT NULL,
    "primary_key" TEXT NOT NULL,
    "before" JSONB NOT NULL,
    "after" JSONB NOT NULL,
    "context" JSONB NOT NULL,
    "database" TEXT NOT NULL,
    "schema" TEXT NOT NULL,
    "table" TEXT NOT NULL,
    "operation" TEXT NOT NULL,
    "committed_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "changes_pkey" PRIMARY KEY ("id")
);
