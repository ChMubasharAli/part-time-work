-- CreateTable
CREATE TABLE "Task8UserBasic" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "maritalStatus" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "estimatedStartDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task8UserBasic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task8UserEndDate" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "estimatedEndDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Task8UserEndDate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task8UserAdditional" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "subscriptionType" TEXT NOT NULL DEFAULT 'basic',
    "communicationPref" TEXT NOT NULL DEFAULT 'email',
    "salaryRange" INTEGER NOT NULL DEFAULT 50000,
    "profilePicture" TEXT,
    "supportingDocs" TEXT[],
    "namedFiles" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Task8UserAdditional_pkey" PRIMARY KEY ("id")
);
