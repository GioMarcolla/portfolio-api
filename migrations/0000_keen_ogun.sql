CREATE TABLE "biodata" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(64) NOT NULL,
	"middle_name" varchar(64),
	"last_name" varchar(64) NOT NULL,
	"nickname" varchar(64),
	"birth_year" integer NOT NULL,
	"birth_month" integer NOT NULL,
	"birth_day" integer,
	"gender" varchar(16) NOT NULL,
	"profession" varchar(128) NOT NULL,
	"nationalities" varchar(256) NOT NULL,
	"resident_country" varchar(64) NOT NULL,
	"resident_state" varchar(64) NOT NULL,
	"resident_city" varchar(64) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);

CREATE TABLE "education" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"position" integer,
	"institution" varchar(128),
	"location_country" varchar(64),
	"location_state" varchar(64),
	"location_city" varchar(64) NOT NULL,
	"degree" varchar(128),
	"degree_short" varchar(16) NOT NULL,
	"major" varchar(128),
	"track" varchar(128),
	"date_started_year" integer NOT NULL,
	"date_started_month" integer NOT NULL,
	"date_started_day" integer,
	"date_completed_year" integer,
	"date_completed_month" integer,
	"date_completed_day" integer,
	"completed" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);

CREATE TABLE "experience" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"position" integer NOT NULL,
	"company_name" varchar(256) NOT NULL,
	"department" varchar(256),
	"team" varchar(256) NOT NULL,
	"location_country" varchar(64) NOT NULL,
	"location_state" varchar(64) NOT NULL,
	"location_city" varchar(64) NOT NULL,
	"job_title" varchar(256) NOT NULL,
	"job_type" varchar(64) NOT NULL,
	"level" varchar(64),
	"responsibilities" varchar(1024) NOT NULL,
	"description" varchar(2048) NOT NULL,
	"achievements" varchar(1024),
	"date_started_year" integer NOT NULL,
	"date_started_month" integer NOT NULL,
	"date_started_day" integer NOT NULL,
	"date_end_year" integer NOT NULL,
	"date_end_month" integer NOT NULL,
	"date_end_day" integer NOT NULL,
	"current_job" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);

CREATE TABLE "skills" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(128) NOT NULL,
	"category" varchar(64) NOT NULL,
	"level" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
