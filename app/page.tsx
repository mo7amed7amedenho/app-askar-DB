"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Skeleton, Card } from "@heroui/react";
export default function page() {
  const router = useRouter();
  // useEffect(() => {
  //   router.push("/Home");
  // }, []);
  return (
    <main className="mt-30">
      <div className="space-x-3 flex flex-row">
        <Skeleton
          title="جاري تحميل الصفحه"
          className="w-full bg-slate-50 rounded-md m-1"
        >
          <div className="m-1">
            <p>sadfnsaknfd</p>
          </div>
          <div className="m-2">
            <p>sadfnsaknfd</p>
          </div>
          <div className="m-1">
            <p>sadfnsaknfd</p>
          </div>
          <div className="m-2">
            <p>sadfnsaknfd</p>
          </div>
          <div className="m-1">
            <p>sadfnsaknfd</p>
          </div>
          <div className="m-2">
            <p>sadfnsaknfd</p>
          </div>
        </Skeleton>

        <Skeleton
          title="جاري تحميل الصفحه"
          className="w-full bg-slate-50 rounded-md  m-1"
        >
          <div className="m-1">
            <p>sadfnsaknfd</p>
          </div>
          <div className="m-2">
            <p>sadfnsaknfd</p>
          </div>
        </Skeleton>
        <Skeleton
          title="جاري تحميل الصفحه"
          className="w-full bg-slate-50 rounded-md m-1"
        >
          <div className="m-2">
            <p>sadfnsaknfd</p>
          </div>
        </Skeleton>
      </div>
      <div className="space-x-3 flex flex-row">
        <Skeleton
          title="جاري تحميل الصفحه"
          className="w-full bg-slate-50 rounded-md m-1"
        >
          <div className="m-10"></div>
        </Skeleton>

        <Skeleton
          title="جاري تحميل الصفحه"
          className="w-full bg-slate-50 rounded-md  m-1"
        >
          <div className="m-10"></div>
        </Skeleton>
        <Skeleton
          title="جاري تحميل الصفحه"
          className="w-full bg-slate-50 rounded-md m-1"
        >
          <div className="m-10"></div>
        </Skeleton>
      </div>
      <div className="space-x-3 flex flex-row">
        <Skeleton
          title="جاري تحميل الصفحه"
          className="w-full bg-slate-50 rounded-md m-1"
        >
          <div className="p-2 text-sm"></div>
        </Skeleton>

        <Skeleton
          title="جاري تحميل الصفحه"
          className="w-full bg-slate-50 rounded-md  m-1"
        >
          <div className="p-2 text-sm"></div>
        </Skeleton>
      </div>
      <div className="space-x-3 flex flex-row mt-20">
        <Skeleton
          title="جاري تحميل الصفحه"
          className="w-full bg-slate-50 rounded-md m-1"
        >
          <div className="m-1">
            <p>sadfnsaknfd</p>
          </div>
          <div className="m-2">
            <p>sadfnsaknfd</p>
          </div>
          <div className="m-1">
            <p>sadfnsaknfd</p>
          </div>
          <div className="m-2">
            <p>sadfnsaknfd</p>
          </div>
          <div className="m-1">
            <p>sadfnsaknfd</p>
          </div>
          <div className="m-2">
            <p>sadfnsaknfd</p>
          </div>
        </Skeleton>

        <Skeleton
          title="جاري تحميل الصفحه"
          className="w-full bg-slate-50 rounded-md  m-1"
        >
          <div className="m-1">
            <p>sadfnsaknfd</p>
          </div>
          <div className="m-2">
            <p>sadfnsaknfd</p>
          </div>
        </Skeleton>
        <Skeleton
          title="جاري تحميل الصفحه"
          className="w-full bg-slate-50 rounded-md m-1"
        >
          <div className="m-2">
            <p>sadfnsaknfd</p>
          </div>
        </Skeleton>
      </div>
      <div className="space-x-3 flex flex-row">
        <Skeleton
          title="جاري تحميل الصفحه"
          className="w-full bg-slate-50 rounded-md m-1"
        >
          <div className="m-10"></div>
        </Skeleton>

        <Skeleton
          title="جاري تحميل الصفحه"
          className="w-full bg-slate-50 rounded-md  m-1"
        >
          <div className="m-10"></div>
        </Skeleton>
        <Skeleton
          title="جاري تحميل الصفحه"
          className="w-full bg-slate-50 rounded-md m-1"
        >
          <div className="m-10"></div>
        </Skeleton>
      </div>
      <div className="space-x-3 flex flex-row">
        <Skeleton
          title="جاري تحميل الصفحه"
          className="w-full bg-slate-50 rounded-md m-1"
        >
          <div className="p-2 text-sm"></div>
        </Skeleton>

        <Skeleton
          title="جاري تحميل الصفحه"
          className="w-full bg-slate-50 rounded-md  m-1"
        >
          <div className="p-2 text-sm"></div>
        </Skeleton>
      </div>
    </main>
  );
}
