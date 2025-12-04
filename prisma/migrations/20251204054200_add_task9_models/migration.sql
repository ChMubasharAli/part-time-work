-- CreateTable
CREATE TABLE "Task9PatientPersonal" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "age" INTEGER NOT NULL,
    "cnic" TEXT NOT NULL,
    "maritalStatus" TEXT NOT NULL,
    "bloodGroup" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task9PatientPersonal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task9PatientContact" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "emergencyContact" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Task9PatientContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task9PatientMedical" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "chronicDiseases" TEXT[],
    "pastSurgeries" TEXT[],
    "currentConditions" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Task9PatientMedical_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task9PatientVisit" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "visitType" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "assignedDoctor" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Task9PatientVisit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Task9PatientPersonal_cnic_key" ON "Task9PatientPersonal"("cnic");

-- CreateIndex
CREATE UNIQUE INDEX "Task9PatientContact_patientId_key" ON "Task9PatientContact"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "Task9PatientMedical_patientId_key" ON "Task9PatientMedical"("patientId");

-- AddForeignKey
ALTER TABLE "Task9PatientContact" ADD CONSTRAINT "Task9PatientContact_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Task9PatientPersonal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task9PatientMedical" ADD CONSTRAINT "Task9PatientMedical_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Task9PatientPersonal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task9PatientVisit" ADD CONSTRAINT "Task9PatientVisit_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Task9PatientPersonal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
