CREATE TABLE "project" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"position" integer NOT NULL,
	"project_name" varchar(256) NOT NULL,
	"location_country" varchar(64) NOT NULL,
	"location_state" varchar(64) NOT NULL,
	"location_city" varchar(64) NOT NULL,
	"job_title" varchar(256) NOT NULL,
	"responsibilities" text[] NOT NULL,
	"description" text[] NOT NULL,
	"achievements" varchar(1024),
	"date_started_year" integer NOT NULL,
	"date_started_month" integer NOT NULL,
	"date_started_day" integer,
	"date_end_year" integer NOT NULL,
	"date_end_month" integer NOT NULL,
	"date_end_day" integer,
	"current_project" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "project_position_unique" UNIQUE("position")
);

CREATE TABLE "project_image" (
	"project_id" uuid NOT NULL,
	"image_id" uuid NOT NULL,
	"position" integer NOT NULL,
	CONSTRAINT "project_image_project_id_image_id_pk" PRIMARY KEY("project_id","image_id")
);

ALTER TABLE "project_image" ADD CONSTRAINT "project_image_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "project_image" ADD CONSTRAINT "project_image_image_id_image_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."image"("id") ON DELETE cascade ON UPDATE no action;