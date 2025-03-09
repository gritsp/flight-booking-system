import { PrismaClient } from "@prisma/client";

class Database {
  public prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async isConnect() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      console.log("Database connection is healthy");
      return true;
    } catch (error) {
      console.error("Database connection failed", error);
      return false;
    }
  }
}

let database;
if (!database) {
  database = new Database();
}
export default database as Database;
