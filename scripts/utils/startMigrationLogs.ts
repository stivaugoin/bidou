import logUpdate from "log-update";

export function startMigrationLogs({ version }: { version: string }) {
  let interval: NodeJS.Timeout;

  function buildMessage(status: string, ...args: string[]) {
    return `${status}  Running migration: ${version} ${args.join(" ")}`;
  }

  function start(message?: string) {
    let dotIndex = 0;

    interval = setInterval(() => {
      const dots = ".".repeat(dotIndex % 4);
      logUpdate(buildMessage("⏳", message ? `- ${message}` : "", dots));
      dotIndex++;
    }, 200);
  }

  function stop() {
    clearInterval(interval);
    logUpdate(buildMessage("✅"));
  }

  function error(...args: any[]) {
    clearInterval(interval);
    logUpdate(buildMessage("❌", ...args));
    console.error(...args);
  }

  function log(message: string) {
    clearInterval(interval);
    start(message);
  }

  return { error, stop, log };
}
