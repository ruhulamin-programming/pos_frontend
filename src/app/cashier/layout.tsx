import CashierLayout from "@/lib/layout/CashierLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <CashierLayout>{children}</CashierLayout>;
}
