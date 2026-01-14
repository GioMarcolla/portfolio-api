ALTER TABLE "experience" ALTER COLUMN "location_state" DROP NOT NULL;
ALTER TABLE "experience" ALTER COLUMN "location_city" DROP NOT NULL;
ALTER TABLE "experience" ALTER COLUMN "date_end_year" DROP NOT NULL;
ALTER TABLE "experience" ALTER COLUMN "date_end_month" DROP NOT NULL;
ALTER TABLE "project" ALTER COLUMN "location_state" DROP NOT NULL;
ALTER TABLE "project" ALTER COLUMN "location_city" DROP NOT NULL;
ALTER TABLE "project" ALTER COLUMN "date_end_year" DROP NOT NULL;
ALTER TABLE "project" ALTER COLUMN "date_end_month" DROP NOT NULL;