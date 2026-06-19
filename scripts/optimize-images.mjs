import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const PUBLIC = path.join(process.cwd(), 'public');

// [file, maxWidth] — width caps tuned to how large each image is actually
// rendered (planets in cards are large; insight thumbs and the stamp are small).
const targets = [
  ['planet-01.png', 1200],
  ['planet-02.png', 1200],
  ['planet-03.png', 1200],
  ['planet-04.png', 1200],
  ['planet-05.png', 1200],
  ['planet-06.png', 700],
  ['planet-07.png', 700],
  ['planet-08.png', 700],
  ['planet-09.png', 1200],
  ['cover.png', 1600],
  ['map.png', 1600],
  ['get-started.png', 1200],
  ['whats-new.png', 1200],
  ['stamp.png', 400],
];

let before = 0;
let after = 0;

for (const [file, maxWidth] of targets) {
  const input = await readFile(path.join(PUBLIC, file));
  const output = await sharp(input)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();
  await writeFile(path.join(PUBLIC, file.replace(/\.png$/, '.webp')), output);

  before += input.length;
  after += output.length;
  const saved = ((1 - output.length / input.length) * 100).toFixed(1);
  console.log(
    `${file.padEnd(18)} ${(input.length / 1024).toFixed(0).padStart(5)} KB -> `
      + `${(output.length / 1024).toFixed(0).padStart(4)} KB  (-${saved}%)`,
  );
}

console.log(
  `\nTOTAL  ${(before / 1024 / 1024).toFixed(2)} MB -> ${(after / 1024 / 1024).toFixed(2)} MB`,
);
