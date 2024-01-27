"use client";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

export default function SignIn() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!email || !password) return;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error);
      return;
    }

    router.replace("/");
    router.refresh();
  };

  return (
    <div>
      <h1>Sign In</h1>
      <p>Sign in to your account</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            onChange={(e) => setEmail(e.currentTarget.value)}
            type="text"
            value={email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            onChange={(e) => setPassword(e.currentTarget.value)}
            type="password"
            value={password}
          />
        </div>
        <div>
          <button>Sign in</button>
        </div>
      </form>
    </div>
  );
}
