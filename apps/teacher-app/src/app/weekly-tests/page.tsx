"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WeeklyTestsAliasPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/weekly-test");
  }, [router]);
  return null;
}
