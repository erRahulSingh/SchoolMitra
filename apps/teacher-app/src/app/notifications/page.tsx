"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotificationsAliasPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/communication/notifications");
  }, [router]);
  return null;
}
