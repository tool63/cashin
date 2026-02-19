"use client";

import ModalRoot from "@/components/modals/ModalRoot";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ModalRoot>{children}</ModalRoot>;
}
