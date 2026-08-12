# Guess the Stakes

A poker hand replayer with the stakes redacted. Paste hand histories from any
room, replay the hand in big blinds, read the sizing and the stack depth, then
call the level and see how close you were.

Everything runs in the page. Hands are never uploaded — there is no server.

## Sharing a hand

The **Share** button packs the hands into the link itself
(`…/#z=<hands>`), so opening it replays the same hand with the stakes still
hidden. That only works where the page owns its own address bar — which is why
this hosted copy exists. Embedded in a viewer (an iframe, the claude.ai
artifact viewer), the same button copies the hands as text instead, because a
link built there would point at the sandbox frame rather than a real page.

What travels is not the hand history but the hand: seats, blinds, cards, the
action list and the few details the reveal panel shows, written as one line
per hand and then deflated. A hand history is mostly text the replayer never
reads — ids, timestamps, the summary block, the same name spelled out twenty
times — so dropping it takes a one-hand link from about 1,700 characters to
about 350, and a six-hand one from 9,200 to 1,600.

Those packed records are also a paste format: dropped into **Load hands** they
load like a hand history does, which is what the embedded copy shares when it
cannot build a link. `parseHands` recognises them by their `GTS1` first line.

Browsers without `CompressionStream` fall back to `#h=`, the uncompressed
form. Both keys are still read on the way in, and both still accept hand
history text, so every link ever shared keeps working.

Links are capped at ~16k characters — comfortably more hands than anyone
sends at once.

## Formats

Reads PokerStars, GGPoker, partypoker, 888poker, Winamax, WPN / ACR, iPoker
(XML) and Ignition / Bovada, plus tracker exports. Anything else falls through
to a loose reader that copes with most club-app and home-brew exports. Every
parser is run against each hand and the most coherent reading wins, so an
unknown room usually still replays.

Run-it-twice hands are dealt as separate boards, however the room writes them —
named (`*** SECOND TURN ***`), numbered (`*** TURN 2 ***`), or not marked at all.

## Build

`guess-the-stakes.html` is the source. It carries no `<!doctype>`, `<head>` or
`<body>` because the claude.ai artifact runtime supplies those at publish time.
The hosted copy adds them:

```
node build-pages.js     # guess-the-stakes.html -> index.html
```

Edit the source, never `index.html` — it is generated.
