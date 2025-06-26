import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const res = await fetch(`http://localhost:4000/user/validate`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const isValid = res.ok;

  if (!isValid) {
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.delete("accessToken");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/"],
};
