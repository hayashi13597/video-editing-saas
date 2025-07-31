import { getServerSession } from "next-auth/next";
import nextAuthOptions from "@/lib/nextAuthOptions";

export async function getServerAccessToken() {
  const session = await getServerSession(nextAuthOptions);
  return session?.user?.accessToken;
}
