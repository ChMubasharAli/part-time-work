/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "task15_patient_personal" (
    "id" BIGSERIAL NOT NULL,
    "full_name" VARCHAR(200) NOT NULL,
    "date_of_birth" DATE NOT NULL,
    "age" INTEGER,
    "cnic" VARCHAR(50) NOT NULL,
    "gender_id" BIGINT NOT NULL,
    "blood_group_id" BIGINT NOT NULL,
    "marital_status_id" BIGINT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" BIGINT NOT NULL,
    "updated_at" TIMESTAMPTZ,
    "updated_by_id" BIGINT,

    CONSTRAINT "task15_patient_personal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task15_patient_contact" (
    "id" BIGSERIAL NOT NULL,
    "patient_id" BIGINT NOT NULL,
    "city_id" BIGINT NOT NULL,
    "country_id" BIGINT NOT NULL,
    "phone_number" VARCHAR(200) NOT NULL,
    "emergency_contact" VARCHAR(200) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "address" VARCHAR(200) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" BIGINT NOT NULL,
    "updated_at" TIMESTAMPTZ,
    "updated_by_id" BIGINT,

    CONSTRAINT "task15_patient_contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task15_patient_medical" (
    "id" BIGSERIAL NOT NULL,
    "patient_id" BIGINT NOT NULL,
    "chronic_diseases" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "past_surgeries" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "current_conditions" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" BIGINT NOT NULL,
    "updated_at" TIMESTAMPTZ,
    "updated_by_id" BIGINT,

    CONSTRAINT "task15_patient_medical_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task15_patient_visit" (
    "id" BIGSERIAL NOT NULL,
    "patient_id" BIGINT NOT NULL,
    "assigned_doctor_id" BIGINT NOT NULL,
    "visit_type_id" BIGINT NOT NULL,
    "reason" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" BIGINT NOT NULL,
    "updated_at" TIMESTAMPTZ,
    "updated_by_id" BIGINT,

    CONSTRAINT "task15_patient_visit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "user_name" VARCHAR(200) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "picklist_cat" (
    "id" BIGSERIAL NOT NULL,
    "pick_cat_name" VARCHAR(200) NOT NULL,
    "pick_cat_description" VARCHAR(255),
    "created_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "picklist_cat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "picklist" (
    "id" BIGSERIAL NOT NULL,
    "picklist_cat_id" BIGINT NOT NULL,
    "picklist_name" VARCHAR(50),
    "picklist_description" VARCHAR(200) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "picklist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "task15_patient_personal_cnic_key" ON "task15_patient_personal"("cnic");

-- CreateIndex
CREATE INDEX "task15_patient_contact_patient_id_idx" ON "task15_patient_contact"("patient_id");

-- CreateIndex
CREATE INDEX "task15_patient_medical_patient_id_idx" ON "task15_patient_medical"("patient_id");

-- CreateIndex
CREATE INDEX "task15_patient_visit_patient_id_idx" ON "task15_patient_visit"("patient_id");

-- CreateIndex
CREATE INDEX "users_id_idx" ON "users"("id");

-- AddForeignKey
ALTER TABLE "task15_patient_personal" ADD CONSTRAINT "task15_patient_personal_gender_id_fkey" FOREIGN KEY ("gender_id") REFERENCES "picklist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "task15_patient_personal" ADD CONSTRAINT "task15_patient_personal_blood_group_id_fkey" FOREIGN KEY ("blood_group_id") REFERENCES "picklist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "task15_patient_personal" ADD CONSTRAINT "task15_patient_personal_marital_status_id_fkey" FOREIGN KEY ("marital_status_id") REFERENCES "picklist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "task15_patient_personal" ADD CONSTRAINT "task15_patient_personal_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "task15_patient_personal" ADD CONSTRAINT "task15_patient_personal_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "task15_patient_contact" ADD CONSTRAINT "task15_patient_contact_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "task15_patient_personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task15_patient_contact" ADD CONSTRAINT "task15_patient_contact_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "picklist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "task15_patient_contact" ADD CONSTRAINT "task15_patient_contact_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "picklist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "task15_patient_contact" ADD CONSTRAINT "task15_patient_contact_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "task15_patient_contact" ADD CONSTRAINT "task15_patient_contact_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "task15_patient_medical" ADD CONSTRAINT "task15_patient_medical_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "task15_patient_personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task15_patient_medical" ADD CONSTRAINT "task15_patient_medical_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "task15_patient_medical" ADD CONSTRAINT "task15_patient_medical_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "task15_patient_visit" ADD CONSTRAINT "task15_patient_visit_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "task15_patient_personal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "task15_patient_visit" ADD CONSTRAINT "task15_patient_visit_assigned_doctor_id_fkey" FOREIGN KEY ("assigned_doctor_id") REFERENCES "picklist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "task15_patient_visit" ADD CONSTRAINT "task15_patient_visit_visit_type_id_fkey" FOREIGN KEY ("visit_type_id") REFERENCES "picklist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "task15_patient_visit" ADD CONSTRAINT "task15_patient_visit_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "task15_patient_visit" ADD CONSTRAINT "task15_patient_visit_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "picklist" ADD CONSTRAINT "picklist_picklist_cat_id_fkey" FOREIGN KEY ("picklist_cat_id") REFERENCES "picklist_cat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
