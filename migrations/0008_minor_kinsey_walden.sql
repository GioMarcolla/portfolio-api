CREATE TABLE "db_status" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tables_updated" varchar(2048),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
