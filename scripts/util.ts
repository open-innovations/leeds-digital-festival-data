import { ensureDir } from "https://deno.land/std@0.110.0/fs/mod.ts"
import { join } from "https://deno.land/std@0.110.0/path/mod.ts";

const rootDir = 'data';

export async function setupData(identifier: string) {
  const outputDir = join(rootDir, identifier);
  await ensureDir(outputDir);
  return {
    makeDataPath: (filename: string) => join(outputDir, filename),
  }
}