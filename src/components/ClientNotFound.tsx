"use client";

import { routesApp } from "@/constants/routesApp";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";

const ClientNotFound = () => {
  const router = useRouter();
  return (
    <div className="mt-10 flex items-center justify-center gap-x-6">
      <Button
        className="button-submit w-fit bg-gray hover:bg-gray/80"
        onClick={() => router.back()}
      >
        <ArrowLeft className="inline mr-2" />
        戻る
      </Button>
      <Link href={routesApp.dashboard} className="button-submit w-fit">
        ダッシュボードへ戻る
      </Link>
    </div>
  );
};

export default ClientNotFound;
