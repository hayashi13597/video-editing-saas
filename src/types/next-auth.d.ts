import { DefaultSession } from "next-auth";

enum UserRole {
  CLIENT = "CLIENT",
  FREELANCER = "FREELANCER",
  ADMIN = "ADMIN"
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      accessToken?: string;
      role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    name?: string;
    image?: string;
    accessToken?: string;
    role: UserRole;
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
      role: UserRole;
      cognitoId?: string;
    };
  }
}
