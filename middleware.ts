import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: ["/Home/:path*", "/:path*"], // ضع هنا المسارات المحمية
};
