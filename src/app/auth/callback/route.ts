import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AuthApiError } from "@supabase/supabase-js";

import { paths } from "@/paths";
import { logger } from "@/lib/default-logger";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const runtime = "edge";

// NOTE: If you have a proxy in front of this app
//  the request origin might be a local address.
//  Consider using `config.site.url` from `@/config` instead.

// NOTE: This is not a `Page` because we only redirect and it will never render React content.

// NOTE: este callback esta para manejar la respuesta del proveedor.
// por ejemplo me logueo en google y google me devuelve un codigo, esta route la uso para pasarsela a google para que sepa como volver y me quedo con data.
export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams, origin } = req.nextUrl;

  console.log("searchParams", searchParams);
  if (searchParams.get("error")) {
    return NextResponse.json({
      error: searchParams.get("error_description") || "Something went wrong",
    });
  }

  const code = searchParams.get("code");

  console.log("code", code);
  if (!code) {
    return NextResponse.json({ error: "Code is missing" });
  }

  const cookieStore = cookies();
  const supabaseClient = createClient(cookieStore);

  try {
    const { error } = await supabaseClient.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.json({ error: error.message });
    }
  } catch (err) {
    if (
      err instanceof AuthApiError &&
      err.message.includes("code and code verifier should be non-empty")
    ) {
      return NextResponse.json({
        error: "Please open the link in the same browser",
      });
    }

    logger.error("Callback error", err);

    return NextResponse.json({ error: "Something went wrong" });
  }

  const next = searchParams.get("next") || paths.home;

  return NextResponse.redirect(new URL(next, origin));
}
