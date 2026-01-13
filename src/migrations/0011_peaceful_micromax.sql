CREATE TABLE "image" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"metadata" text[] NOT NULL,
	"url" varchar(2048) NOT NULL,
	"description" varchar(512) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);

ALTER TABLE "experience" DROP COLUMN "highlights";