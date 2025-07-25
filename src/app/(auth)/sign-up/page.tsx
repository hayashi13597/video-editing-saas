"use client";

import Loading from "@/app/Loading";
import { routesApp } from "@/constants/routesApp";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const SignUp = () => {
  const pathname = usePathname();
  const router = useRouter();

  React.useEffect(() => {
    if (pathname === "/sign-up") {
      router.push(routesApp.signUpFreelancer);
    }
  }, [router, pathname]);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Loading />
    </div>
  );
};

export default SignUp;
