import { getAuthentication } from "@/orvalApi/endpoints/authentication/authentication";
import { AuthResponseDto } from "@/orvalApi/model";
import { UserRole } from "@/types/next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getErrorMessage } from "./utils";

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email"
        },
        password: {
          label: "Password",
          type: "password"
        }
      },
      async authorize(
        credentials: { email: string; password: string } | undefined
      ) {
        const { email, password } = credentials || {};
        if (!email || !password) {
          throw new Error("メールとパスワードは必須です");
        }

        try {
          const authApi = getAuthentication();
          const authData: AuthResponseDto = await authApi.signIn({
            email: email,
            password: password
          });

          if (!authData.tokens || !authData.user) {
            return null;
          }

          const user = authData.user;

          return {
            id: user.id,
            email: user.email,
            name: user.name || "",
            image: user.avatarUrl || "",
            accessToken: authData.tokens.accessToken,
            role: user.role as UserRole
          };
        } catch (error) {
          const errorMessage = getErrorMessage(
            error as ApiError,
            "ログインに失敗しました"
          );
          throw new Error(errorMessage);
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/sign-in"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name || "";
        token.image = user.image || "";
        token.accessToken = user.accessToken;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.image as string;
        session.user.accessToken = token.accessToken as string;
        session.user.role = token.role as UserRole;
      }
      return session;
    }
  }
};

export default nextAuthOptions;
