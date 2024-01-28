"use client";

import { createBrowserClient } from "@supabase/ssr";
import { AuthUser } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AppHeader({ user }: { user: AuthUser | null }) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const router = useRouter();

  const handleSignOut = async () => {
    if (!user) return;

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error);
      return;
    }

    router.refresh();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "2rem",
      }}
    >
      <div>Bidou</div>

      <div style={{ display: "flex", gap: "1rem" }}>
        <Link href="/">Home</Link>
        <Link href="/categories">Categories</Link>
      </div>

      {user && (
        <div style={{ display: "flex", gap: "1rem" }}>
          <div>{user.email}</div>
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      )}
    </div>
  );
}
