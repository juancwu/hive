import "./globals.css";
import { Inter } from "next/font/google";
import { headers, cookies } from "next/headers";
import SupabaseProvider from "./supabase-provider";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hive",
  description: "Electronic hardware inventory and project management tool.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentSupabaseClient({ headers, cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseProvider session={session}>{children}</SupabaseProvider>
      </body>
    </html>
  );
}
