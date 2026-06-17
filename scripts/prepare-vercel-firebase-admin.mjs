import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const functionDir = join(rootDir, ".vercel", "output", "functions", "__server.func");
const functionPackagePath = join(functionDir, "package.json");
const rootNodeModules = join(rootDir, "node_modules");
const functionNodeModules = join(functionDir, "node_modules");

if (!existsSync(functionPackagePath)) {
  console.log("[postbuild] Vercel function output not found; skipping Firebase Admin install.");
  process.exit(0);
}

const rootPackage = JSON.parse(readFileSync(join(rootDir, "package.json"), "utf8"));
const functionPackage = JSON.parse(readFileSync(functionPackagePath, "utf8"));

functionPackage.type = "module";
functionPackage.private = true;
functionPackage.dependencies = {
  ...(functionPackage.dependencies ?? {}),
  "firebase-admin": rootPackage.dependencies["firebase-admin"],
  "google-gax": rootPackage.dependencies["google-gax"] ?? "^5.0.6",
  "@google-cloud/firestore": rootPackage.dependencies["@google-cloud/firestore"] ?? "^8.0.0",
  "@google-cloud/storage": rootPackage.dependencies["@google-cloud/storage"] ?? "^7.17.3",
};

writeFileSync(functionPackagePath, `${JSON.stringify(functionPackage, null, 2)}\n`);

const copied = new Set();

function packageDir(packageName) {
  return join(rootNodeModules, ...packageName.split("/"));
}

function outputPackageDir(packageName) {
  return join(functionNodeModules, ...packageName.split("/"));
}

function copyPackage(packageName) {
  if (copied.has(packageName)) return;

  const source = packageDir(packageName);
  const manifestPath = join(source, "package.json");

  if (!existsSync(manifestPath)) {
    console.warn(`[postbuild] Skipping missing package ${packageName}`);
    return;
  }

  copied.add(packageName);

  const target = outputPackageDir(packageName);
  mkdirSync(dirname(target), { recursive: true });
  cpSync(source, target, {
    recursive: true,
    force: true,
    dereference: true,
    filter: (path) => !path.includes(`${packageName.split("/").pop()}/node_modules/.cache`),
  });

  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const dependencyNames = new Set([
    ...Object.keys(manifest.dependencies ?? {}),
    ...Object.keys(manifest.optionalDependencies ?? {}),
    ...Object.keys(manifest.peerDependencies ?? {}),
  ]);

  for (const dependencyName of dependencyNames) {
    copyPackage(dependencyName);
  }
}

mkdirSync(functionNodeModules, { recursive: true });

for (const packageName of Object.keys(functionPackage.dependencies)) {
  copyPackage(packageName);
}

console.log(
  `[postbuild] Copied ${copied.size} runtime packages into Vercel function output, including firebase-admin.`,
);
