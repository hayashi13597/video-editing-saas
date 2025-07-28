import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      accessToken?: string;
      role: "CLIENT" | "ADMIN" | "FREELANCER";
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    name?: string;
    image?: string;
    accessToken?: string;
    role: "CLIENT" | "ADMIN" | "FREELANCER";
    cognitoId?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: {
      id: string;
      email: string;
      name?: string;
      image?: string;
      accessToken?: string;
      role: "CLIENT" | "ADMIN" | "FREELANCER";
      cognitoId?: string;
    };
  }
}
