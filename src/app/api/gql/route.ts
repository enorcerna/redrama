import gql from "@/data/gql.json";
import {NextRequest} from "next/server";
// export async function GET() {
//   const headers = {
//     Accept: "*/*",
//     "Content-Type": "application/json"
//   };
//   const query = {
//     query:
//       "{ __schema { types { name fields{name args{name type{ name } }} } } }"
//   };
//   const resp = await fetch("https://doraflix.fluxcedene.net/api/gql", {
//     method: "POST",
//     headers,
//     body: JSON.stringify(query)
//   });
//   const data = await resp.json();
//   return Response.json(data);
// }
export function GET(req: NextRequest) {
  try {
    const q = req.nextUrl.searchParams.get("q");

    // Obtener y ordenar los tipos de esquema
    const schemaTypes = gql.data.__schema.types.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    if (q && q.length > 0) {
      const queryType = schemaTypes.find(({name}) => name === "Query");
      if (!queryType) {
        return new Response(JSON.stringify({error: "Query type not found"}), {
          status: 404
        });
      }

      const searchResults = queryType.fields?.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      return new Response(JSON.stringify(searchResults), {status: 200});
    }

    // Si no hay consulta, devolver todos los tipos que no sean "Query"
    const filteredSchema = schemaTypes.filter(({name}) => name !== "Query");
    return new Response(JSON.stringify(filteredSchema), {status: 200});
  } catch (error) {
    // Manejo de errores
    return new Response(JSON.stringify({error: (error as Error).message}), {
      status: 500
    });
  }
}
