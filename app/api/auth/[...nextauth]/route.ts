import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

// ✅ توسيع تعريفات NextAuth لدعم role و permissions
declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    permissions: string[];
  }

  interface Session {
    user: User;
  }

  interface JWT {
    id: string;
    name: string;
    email: string;
    role: string;
    permissions: string[];
  }
}

const prisma = new PrismaClient();

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "user@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("يجب إدخال البريد الإلكتروني وكلمة المرور");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { permissions: true }, // ✅ تضمين الصلاحيات
        });

        if (!user) {
          throw new Error("المستخدم غير موجود");
        }

        // ✅ التحقق من كلمة المرور
        const isValid = await (credentials.password, user.password);
        if (!isValid) {
          throw new Error("كلمة المرور غير صحيحة");
        }

        return {
          id: user.id.toString(),
          name: user.name ?? "مستخدم غير معروف",
          email: user.email ?? "",
          role: user.role ?? "user",
          permissions: user.permissions.map((perm) => perm.menuItem) ?? [],
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name ?? "مستخدم غير معروف";
        token.email = user.email ?? "";
        token.role = user.role ?? "user";
        token.permissions = (user.permissions as string[]) ?? []; // ✅ التأكد من عدم وجود null
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string; // ✅ التأكد من أن القيم ليست unknown
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string; // ✅ تعيين الدور بدون مشاكل
        session.user.permissions = (token.permissions as string[]) ?? []; // ✅ تحويل إلى مصفوفة
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
