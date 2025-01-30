"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HomeIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back()
  };

  return (
    <div className="WomenPage-bg-image flex min-h-screen items-center justify-center bg-black dark:bg-white">
      <Card className="mx-4 w-full max-w-md">
        <CardContent className="pt-6">
          <div className="text-center">
            <h1 className="text-9xl font-extrabold text-gray-900 dark:text-gray-200">
              404
            </h1>

            <div className="mt-4">
              <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
                Page not found
              </h2>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Sorry, we couldn't find the page you're looking for. Please
                check the URL or return home.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              <Link href={"/"}>
                <Button
                  className="flex w-full items-center justify-center gap-2"
                  variant="default"
                >
                  <HomeIcon className="h-4 w-4" />
                  Return Home
                </Button>
              </Link>

              <Button
                onClick={handleGoBack}
                className="flex w-full items-center justify-center gap-2"
                variant="outline"
              >
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFoundPage;
