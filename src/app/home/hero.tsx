"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="flex h-full w-full flex-col items-center gap-1 bg-black">
      <div className="relative">
        <div className="absolute flex h-full w-full items-end justify-start bg-black/30">
          <div className="flex flex-col gap-1 p-2 text-white md:mb-10 md:gap-4 md:p-8">
            <h1 className="text-2xl font-semibold md:text-5xl lg:text-6xl mx-1">
              GTR T-SHIRTS COLLECTION
            </h1>
            <p className="mx-2 w-72 text-sm font-medium md:w-[500px] md:text-justify md:text-lg">
              Nissan racing spirit with our Limited Edition Skyline GTR Legends
              T-Shirt Collection.
            </p>
            <Link href={"/collections/t-shirts"}>
              <Button className="relative z-20 mx-2 w-28 border bg-white text-black transition-all duration-200 hover:border-white hover:bg-blue-600 hover:text-white">
                SHOP NOW
              </Button>
            </Link>
          </div>
        </div>

        <div className="p-2 bg-black">
          <video
            src="/video/gtr.mkv"
            autoPlay
            muted
            loop
            className="h-full max-h-[800px] w-screen overflow-hidden rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
}
