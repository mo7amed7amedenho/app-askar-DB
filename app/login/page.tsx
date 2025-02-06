"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Checkbox, Link, Form, Divider } from "@heroui/react";
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

    if (result?.error) {
      setError("فشل تسجيل الدخول، تحقق من البريد وكلمة المرور");
    } else {
      router.push("/Home");
    }
  };

  return (
    <main className="flex items-center justify-center h-screen bg-gray-200 dark:bg-zinc-900">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-lg bg-white dark:bg-zinc-800 p-6 shadow-lg">
        <div className="flex items-center justify-center mr-7">
          <Logo />
        </div>

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}

        <Form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            isRequired
            label="Email Address"
            name="email"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="bordered"
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
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <Icon
                    className="text-2xl text-gray-400"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="text-2xl text-gray-400"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            variant="bordered"
          />

          <Button className="w-full" color="primary" type="submit">
            Sign In
          </Button>
        </Form>

        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="shrink-0 text-small text-gray-500">Made with Hamedenho</p>
          <Divider className="flex-1" />
        </div>
      </div>
    </main>
  );
}
