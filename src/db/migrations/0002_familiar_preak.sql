ALTER TABLE "posts" RENAME COLUMN "title" TO "task";--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "is_completed" boolean DEFAULT false;