const { brotliCompressSync, gzipSync } = require("zlib");
const { readFileSync, writeFileSync } = require("fs");
const glob = require("glob");
const path = require("path");

const distFolder = "dist";

console.log("🗜️  Generating Brotli + Gzip files...");

const files = glob.sync(`${distFolder}/**/*.{js,css,html,svg,json}`);

files.forEach((file) => {
  const content = readFileSync(file);

  // ------- Brotli -------
  const br = brotliCompressSync(content, {
    params: {
      [require("zlib").constants.BROTLI_PARAM_QUALITY]: 11,
    },
  });
  writeFileSync(file + ".br", br);
  console.log("✔️ " + path.basename(file) + ".br created");

  // ------- Gzip --------
  const gz = gzipSync(content);
  writeFileSync(file + ".gz", gz);
  console.log("✔️ " + path.basename(file) + ".gz created");
});

console.log("🎉 Compression complete!");
