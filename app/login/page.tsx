"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Form, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Logo } from "@/components/blocks";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    console.log(result);
    if (result?.error) {
      console.log("خطأ في تسجيل الدخول:", result.error);
      setError("فشل تسجيل الدخول، تحقق من البريد وكلمة المرور");
    } else {
      router.push("/Home");
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-gray-100 dark:bg-zinc-800">
      {/* خلفية مجردة */}
      <div className="absolute inset-0 z-0">
        {/* خطوط متعرجة */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-indigo-400 to-purple-600 opacity-30 dark:opacity-20 blur-2xl rotate-45"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-l from-pink-400 to-red-600 opacity-30 dark:opacity-20 blur-2xl -rotate-45"></div>

        {/* دوائر متحركة */}
        <div className="absolute top-1/4 left-1/3 w-24 h-24 bg-white/10 dark:bg-white/5 rounded-full backdrop-blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-16 h-16 bg-white/10 dark:bg-white/5 rounded-full backdrop-blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-sm flex flex-col gap-5 rounded-2xl bg-white dark:bg-zinc-800 p-6 shadow-xl transition-all duration-300 hover:shadow-2xl">
        {/* لوجو */}
        <div className="flex items-center justify-center mb-2">
          <Logo />
        </div>

        {/* رسالة الخطأ */}
        {error && (
          <p className="text-red-500 text-center mb-2 text-sm font-medium">
            {error}
          </p>
        )}

        {/* نموذج تسجيل الدخول */}
        <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            isRequired
            label="Email Address"
            name="email"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="bordered"
            className="transition-all duration-300 focus:ring-2 focus:ring-primary-500"
          />

          <Input
            isRequired
            label="Password"
            name="password"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endContent={
              <button type="button" onClick={toggleVisibility} className="p-1">
                {isVisible ? (
                  <Icon
                    className="text-2xl text-gray-500 hover:text-gray-700 transition"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="text-2xl text-gray-500 hover:text-gray-700 transition"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            variant="bordered"
            className="transition-all duration-300 focus:ring-2 focus:ring-primary-500"
          />

          <Button
            className="w-full rounded-lg py-2 text-lg font-semibold shadow-md transition-all duration-300 hover:bg-primary-600 hover:shadow-lg"
            color="primary"
            type="submit"
          >
            Sign In
          </Button>
        </Form>

        {/* فاصل + توقيع */}
        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1 bg-gray-300 dark:bg-zinc-600" />
          <p className="shrink-0 text-xs text-gray-500 font-medium">
            Made with ❤️ by Hamedenho
          </p>
          <Divider className="flex-1 bg-gray-300 dark:bg-zinc-600" />
        </div>
      </div>
    </main>
  );
}
