import fs from "node:fs";
import path from "node:path";
import Typograf from "typograf";

import {r, writeIfChanged} from "./_utils.mjs";

const CHECK = process.argv.includes("--check");
const MARKUP_DIR = r("src/markup");
const tp = new Typograf({locale: ["ru", "en-US"]});

const files = fs
  .readdirSync(MARKUP_DIR)
  .filter((name) => name.endsWith(".html"))
  .map((name) => path.join(MARKUP_DIR, name));

let changed = 0;

for (const file of files) {
  const prev = fs.readFileSync(file, "utf8");
  const formatted = tp.execute(prev);
  const next = prev.endsWith("\n") && !formatted.endsWith("\n")
    ? `${formatted}\n`
    : formatted;

  if (prev === next) continue;

  changed += 1;
  const rel = path.relative(process.cwd(), file);

  if (CHECK) {
    console.log(`[typograf] needs update: ${rel}`);
    continue;
  }

  writeIfChanged(file, next, `[typograf] updated: ${rel}`);
}

if (CHECK && changed > 0) {
  console.error(`[typograf] failed: ${changed} file(s) need typography updates`);
  process.exit(1);
}

console.log(`[typograf] done. changed=${changed}/${files.length}`);
