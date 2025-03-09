import database from "@/lib/database";

export async function GET() {
  return Response.json({
    database: await database.isConnect(),
  });
}
