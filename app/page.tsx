"use client";
import React, { useEffect } from "react";
import { Card, Skeleton } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/Home");
    }, 500);
  }, []);
  const skeletonBlocks = [
    { count: 6, className: "m-1" },
    { count: 2, className: "m-1" },
    { count: 1, className: "m-1" },
  ];

  const renderSkeleton = (count: number, className: string | undefined) => (
    <Skeleton
      title="جاري تحميل الصفحة"
      className="w-full bg-slate-50 rounded-md m-1"
    >
      {[...Array(count)].map((_, index) => (
        <div key={index} className={className}>
          <p>جارِ التحميل...</p>
        </div>
      ))}
    </Skeleton>
  );

  return (
    <main className="">
      {[...Array(3)].map((_, rowIndex) => (
        <div key={rowIndex} className="flex p-2">
          {skeletonBlocks.map((_, index) => (
            <Card className="w-full space-y-2 m-2 space-x-5 p-4" radius="lg" key={index}>
              <Skeleton className="rounded-lg">
                <div className="h-24 rounded-lg bg-secondary" />
              </Skeleton>
              <div className="space-y-3">
                <Skeleton className="w-3/5 rounded-lg">
                  <div className="h-3 w-full rounded-lg bg-secondary" />
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                  <div className="h-3 w-full rounded-lg bg-secondary-300" />
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                  <div className="h-3 w-full rounded-lg bg-secondary-200" />
                </Skeleton>
              </div>
            </Card>
          ))}
        </div>
      ))}
    </main>
  );
}
