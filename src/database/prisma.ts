import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const checkConnection = async () => {
  try {
    await prisma.$connect();
    console.log("Conectado a la base de datos 🚀");
  } catch (error) {
    console.error("Error conectando a la base de datos ");
    console.error(error);
  }
};

export { prisma, checkConnection };
