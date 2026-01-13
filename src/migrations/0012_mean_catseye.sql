CREATE TABLE "experience_image" (
	"experience_id" uuid NOT NULL,
	"image_id" uuid NOT NULL,
	"position" integer NOT NULL,
	CONSTRAINT "experience_image_experience_id_image_id_pk" PRIMARY KEY("experience_id","image_id")
);

ALTER TABLE "experience_image" ADD CONSTRAINT "experience_image_experience_id_experience_id_fk" FOREIGN KEY ("experience_id") REFERENCES "public"."experience"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "experience_image" ADD CONSTRAINT "experience_image_image_id_image_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."image"("id") ON DELETE cascade ON UPDATE no action;