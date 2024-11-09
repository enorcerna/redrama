import {DoramaApi} from "@/services/api";
import {NextRequest} from "next/server";

export async function GET({nextUrl}: NextRequest) {
  const query = nextUrl.searchParams.get("q") as string;
  const result = await new DoramaApi().getSearchDorama(query);
  return Response.json(result);
}
