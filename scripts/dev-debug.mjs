/**
 * Debug wrapper for `next dev`. Logs pre-start state (lock, port, processes)
 * to .cursor/debug.log (NDJSON), then spawns next dev. Used to diagnose
 * "Unable to acquire lock" / "Port 3000 in use" failures.
 */

import { spawn, execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const LOCK_PATH = path.join(ROOT, ".next", "dev", "lock");
const LOG_PATH = path.join(ROOT, ".cursor", "debug.log");

const SESSION = "debug-session";
const RUN_ID = "run1";

function appendLog(payload) {
  const line =
    JSON.stringify({
      ...payload,
      timestamp: Date.now(),
      sessionId: SESSION,
      runId: RUN_ID,
    }) + "\n";
  try {
    fs.appendFileSync(LOG_PATH, line);
  } catch (e) {
    console.error("Debug log write failed:", e.message);
  }
}

// #region agent log
appendLog({
  hypothesisId: "H1",
  location: "dev-debug.mjs:lock-check",
  message: "Lock file pre-check",
  data: (() => {
    const exists = fs.existsSync(LOCK_PATH);
    const base = { lockPath: LOCK_PATH, exists };
    if (!exists) return base;
    try {
      const s = fs.statSync(LOCK_PATH);
      return { ...base, mtime: s.mtimeMs, size: s.size };
    } catch (e) {
      return { ...base, statError: e.message };
    }
  })(),
});
// #endregion

// #region agent log
let port3000 = { inUse: false, pids: [], raw: "" };
try {
  const out = execSync('netstat -ano | findstr ":3000 "', {
    encoding: "utf8",
    windowsHide: true,
  }).trim();
  port3000.raw = out.slice(0, 500);
  const lines = out.split(/\r?\n/).filter(Boolean);
  const pids = new Set();
  for (const ln of lines) {
    const m = ln.trim().split(/\s+/);
    const pid = m[m.length - 1];
    if (pid && /^\d+$/.test(pid)) pids.add(pid);
  }
  port3000.inUse = pids.size > 0;
  port3000.pids = [...pids];
} catch (e) {
  if (e.status !== 1) port3000.error = e.message;
}
appendLog({
  hypothesisId: "H2",
  location: "dev-debug.mjs:port-3000",
  message: "Port 3000 usage",
  data: port3000,
});
// #endregion

// #region agent log
let nodeProcesses = { count: 0, nextCount: 0, sample: [] };
try {
  const out = execSync('wmic process where "name=\'node.exe\'" get processid,commandline 2>nul', {
    encoding: "utf8",
    windowsHide: true,
  }).trim();
  const lines = out.split(/\r?\n/).filter(Boolean).slice(1);
  nodeProcesses.count = lines.length;
  const nextLines = lines.filter((l) => /next|next\.js/i.test(l));
  nodeProcesses.nextCount = nextLines.length;
  nodeProcesses.sample = nextLines.slice(0, 3).map((l) => l.slice(0, 200));
} catch (e) {
  nodeProcesses.error = e.message;
}
appendLog({
  hypothesisId: "H3",
  location: "dev-debug.mjs:node-processes",
  message: "Node / next dev process count",
  data: nodeProcesses,
});
// #endregion

// #region agent log
let lockContent = null;
if (fs.existsSync(LOCK_PATH)) {
  try {
    lockContent = fs.readFileSync(LOCK_PATH, "utf8").slice(0, 200);
  } catch (e) {
    lockContent = { readError: e.message };
  }
}
appendLog({
  hypothesisId: "H4",
  location: "dev-debug.mjs:lock-content",
  message: "Lock file content (stale vs held)",
  data: {
    lockPath: LOCK_PATH,
    hasContent: !!lockContent,
    preview: typeof lockContent === "string" ? lockContent.slice(0, 100) : lockContent,
  },
});
// #endregion

// #region agent log
let lockAccess = { canRead: false, canWrite: false, error: null };
try {
  if (fs.existsSync(LOCK_PATH)) {
    fs.accessSync(LOCK_PATH, fs.constants.R_OK);
    lockAccess.canRead = true;
  }
  const testPath = path.join(ROOT, ".next", "dev", "lock-debug-write-test");
  try {
    fs.writeFileSync(testPath, "test");
    fs.unlinkSync(testPath);
    lockAccess.canWrite = true;
  } catch (e) {
    lockAccess.writeError = e.message;
  }
} catch (e) {
  lockAccess.error = e.message;
}
appendLog({
  hypothesisId: "H5",
  location: "dev-debug.mjs:lock-access",
  message: "Lock dir access (Windows permissions)",
  data: lockAccess,
});
// #endregion

// Spawn next dev and capture exit + stderr (stdout forwarded to user)
const nextDev = spawn("npx", ["next", "dev"], {
  cwd: ROOT,
  stdio: ["inherit", "pipe", "pipe"],
  shell: true,
  windowsHide: true,
});

let stderrChunks = [];
nextDev.stderr.on("data", (c) => {
  stderrChunks.push(c);
  process.stderr.write(c);
});
nextDev.stdout.on("data", (c) => process.stdout.write(c));

nextDev.on("exit", (code, signal) => {
  const stderr = Buffer.concat(stderrChunks).toString("utf8");
  // #region agent log
  appendLog({
    hypothesisId: "H1",
    location: "dev-debug.mjs:next-exit",
    message: "next dev exit",
    data: {
      code,
      signal,
      stderrSnippet: stderr.slice(-800),
      hasLockMessage: /unable to acquire lock|lock/i.test(stderr),
      hasPortMessage: /port.*in use|3000/i.test(stderr),
    },
  });
  // #endregion
  process.exit(code ?? (signal ? 1 : 0));
});
