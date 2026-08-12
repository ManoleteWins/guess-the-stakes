/* Builds the hosted copy of the replayer.
 *
 * guess-the-stakes.html is written for the claude.ai artifact skeleton, which
 * supplies <!doctype>, <head> and <body> at publish time — so the source has
 * none of its own. Served straight from a web host that markup lands in quirks
 * mode with no viewport meta, which breaks the felt's sizing on mobile. This
 * wraps it instead of forking it: one source, both targets.
 *
 *   node build-pages.js     ->  index.html
 */
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'guess-the-stakes.html');
const OUT = path.join(__dirname, 'index.html');

const src = fs.readFileSync(SRC, 'utf8');

/* Everything up to the end of the first <style> block belongs in <head>
   (the source opens with <title> then one big stylesheet); the rest is body. */
const cut = src.indexOf('</style>');
if (cut === -1) throw new Error('no </style> found — the source layout changed');
const head = src.slice(0, cut + '</style>'.length);
const body = src.slice(cut + '</style>'.length);

const out = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="Poker hand replayer with the stakes hidden — replay a hand, read the play, then call the level.">
<meta name="color-scheme" content="light">
${head}
</head>
<body>
${body.replace(/^\s*\n/, '')}</body>
</html>
`;

fs.writeFileSync(OUT, out);
console.log('wrote ' + path.relative(__dirname, OUT) + '  (' + out.length + ' bytes)');
