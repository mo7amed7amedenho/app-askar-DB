"use client";
import React, { useEffect } from "react";
import { Skeleton } from "@heroui/react";
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
    <main className="mt-10 space-y-6">
      {[...Array(2)].map((_, rowIndex) => (
        <div key={rowIndex} className="flex flex-row space-x-3">
          {skeletonBlocks.map((block, index) => (
            <React.Fragment key={index}>
              {renderSkeleton(block.count, block.className)}
            </React.Fragment>
          ))}
        </div>
      ))}
    </main>
  );
}
