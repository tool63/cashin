import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Paths that should NOT be indexed by search engines
  const noIndexPaths = ["/admin", "/dashboard", "/api"];

  if (noIndexPaths.some((path) => url.pathname.startsWith(path))) {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
