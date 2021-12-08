import { ensureDir } from "https://deno.land/std@0.110.0/fs/mod.ts"
import { dirname, fromFileUrl, join, resolve } from "https://deno.land/std@0.110.0/path/mod.ts";

const rootDir = 'data';
const workingDir = 'working';
const __dirname = dirname(fromFileUrl(import.meta.url));

export async function setupData(identifier: string) {
  const outputDir = join(rootDir, identifier);
  await ensureDir(outputDir);
  return {
    makeDataPath: (filename: string) => join(outputDir, filename),
  }
}

export const dataFile = (filename: string) => join(resolve(__dirname, '..', workingDir, filename))