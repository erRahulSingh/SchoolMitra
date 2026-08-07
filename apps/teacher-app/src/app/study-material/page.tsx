"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StudyMaterialAliasPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/materials");
  }, [router]);
  return null;
}
