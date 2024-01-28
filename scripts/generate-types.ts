(() => {
  const { execSync } = require("child_process");
  const { SUPABASE_PROJECT_ID } = process.env;

  if (!SUPABASE_PROJECT_ID) {
    console.error("SUPABASE_PROJECT_ID is required");
    process.exit(1);
  }

  execSync(
    `npx supabase gen types typescript --project-id ${SUPABASE_PROJECT_ID} --schema public > src/types/supabase.ts`,
    { stdio: "inherit" },
  );
})();
