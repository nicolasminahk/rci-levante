import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".jpg": "image/jpeg", ".png": "image/png", ".mp4": "video/mp4", ".svg": "image/svg+xml" };

createServer(async (req, res) => {
  const clean = req.url.split("?")[0];
  const path = clean === "/" ? "/index.html" : clean;
  try {
    const data = await readFile(join(root, decodeURIComponent(path)));
    res.writeHead(200, { "Content-Type": types[extname(path)] || "application/octet-stream" });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
}).listen(4173, () => console.log("serving on 4173"));
