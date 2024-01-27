"use client";

import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function AppHeader({ user }: { user: User | null }) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSignOut = async () => {
    if (!user) return;

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error);
      return;
    }

    router.replace("/auth/sign-in");
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

      {user && (
        <div style={{ display: "flex", gap: "1rem" }}>
          <div>{user.email}</div>
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      )}
    </div>
  );
}
