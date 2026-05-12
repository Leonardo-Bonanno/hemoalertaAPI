-- CreateTable
CREATE TABLE "Hemocentro" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "horario_funcionamento" TEXT NOT NULL,
    "latitude" DECIMAL(9,6) NOT NULL,
    "longitude" DECIMAL(9,6) NOT NULL,

    CONSTRAINT "Hemocentro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BloodType" (
    "id" SERIAL NOT NULL,
    "blood_type" TEXT NOT NULL,

    CONSTRAINT "BloodType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alert" (
    "id" SERIAL NOT NULL,
    "blood_type_id" INTEGER NOT NULL,
    "hemocentro_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT,

    CONSTRAINT "Alert_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_blood_type_id_fkey" FOREIGN KEY ("blood_type_id") REFERENCES "BloodType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_hemocentro_id_fkey" FOREIGN KEY ("hemocentro_id") REFERENCES "Hemocentro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
