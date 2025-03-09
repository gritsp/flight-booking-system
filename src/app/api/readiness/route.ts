import database from "@/app/lib/database";

export async function GET() {
  return Response.json({
    database: await database.isConnect(),
  });
}
