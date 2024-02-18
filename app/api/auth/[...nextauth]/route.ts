import NextAuth from "next-auth";
import { NextAuthConfig } from "./NextAuthConfig";

const handler = NextAuth(NextAuthConfig);

export { handler as GET, handler as POST };
