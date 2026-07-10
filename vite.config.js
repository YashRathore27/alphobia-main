import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTACTS_FILE = path.resolve(__dirname, "public/contacts.json");

/** Read contacts array from disk (returns [] if file missing or corrupt). */
function readContacts() {
  try {
    return JSON.parse(fs.readFileSync(CONTACTS_FILE, "utf-8"));
  } catch {
    return [];
  }
}

/** Write contacts array back to disk. */
function writeContacts(data) {
  fs.writeFileSync(CONTACTS_FILE, JSON.stringify(data, null, 2), "utf-8");
}

/** Vite plugin: exposes /api/contacts for the dev server. */
function contactsApiPlugin() {
  return {
    name: "contacts-api",
    configureServer(server) {
      server.middlewares.use("/api/contacts", (req, res) => {
        // Allow cross-origin requests so the admin panel can read the data
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        res.setHeader("Content-Type", "application/json");

        if (req.method === "OPTIONS") {
          res.writeHead(204);
          res.end();
          return;
        }

        // ── GET /api/contacts ─────────────────────────────────────────────
        if (req.method === "GET") {
          const contacts = readContacts();
          // Return newest first
          const sorted = [...contacts].sort(
            (a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)
          );
          res.writeHead(200);
          res.end(JSON.stringify(sorted));
          return;
        }

        // ── POST /api/contacts ────────────────────────────────────────────
        if (req.method === "POST") {
          let body = "";
          req.on("data", (chunk) => { body += chunk; });
          req.on("end", () => {
            try {
              const submission = JSON.parse(body);
              const contacts = readContacts();
              const entry = {
                id: `c_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
                ...submission,
                status: "new",
                submittedAt: new Date().toISOString(),
              };
              contacts.push(entry);
              writeContacts(contacts);
              res.writeHead(201);
              res.end(JSON.stringify({ ok: true, id: entry.id }));
            } catch (err) {
              res.writeHead(400);
              res.end(JSON.stringify({ ok: false, error: err.message }));
            }
          });
          return;
        }

        // ── PATCH /api/contacts  (update status) ──────────────────────────
        if (req.method === "PATCH") {
          let body = "";
          req.on("data", (chunk) => { body += chunk; });
          req.on("end", () => {
            try {
              const { id, status } = JSON.parse(body);
              const contacts = readContacts();
              const idx = contacts.findIndex((c) => c.id === id);
              if (idx === -1) {
                res.writeHead(404);
                res.end(JSON.stringify({ ok: false, error: "Not found" }));
                return;
              }
              contacts[idx].status = status;
              writeContacts(contacts);
              res.writeHead(200);
              res.end(JSON.stringify({ ok: true }));
            } catch (err) {
              res.writeHead(400);
              res.end(JSON.stringify({ ok: false, error: err.message }));
            }
          });
          return;
        }

        // ── DELETE /api/contacts ──────────────────────────────────────────
        if (req.method === "DELETE") {
          let body = "";
          req.on("data", (chunk) => { body += chunk; });
          req.on("end", () => {
            try {
              const { id } = JSON.parse(body);
              const contacts = readContacts();
              const filtered = contacts.filter((c) => c.id !== id);
              writeContacts(filtered);
              res.writeHead(200);
              res.end(JSON.stringify({ ok: true }));
            } catch (err) {
              res.writeHead(400);
              res.end(JSON.stringify({ ok: false, error: err.message }));
            }
          });
          return;
        }

        res.writeHead(405);
        res.end(JSON.stringify({ ok: false, error: "Method not allowed" }));
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile(), contactsApiPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
