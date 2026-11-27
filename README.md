Checkout here - https://thekhurapaatimind.github.io/travel-planner/

## Adding trip photos (memory envelopes)

Every timeline card opens like an envelope and drops two polaroids. Photos live in
`assets/memories/` and are named `<card-id>-1.jpg` and `<card-id>-2.jpg`
(`.jpeg`, `.png` and `.webp` also work; iPhone HEIC does not display in most browsers).
Cards without photos show an empty "coming soon" polaroid.

Optional captions go in `assets/memories/captions.json`:

```json
{ "d1-jatayu": ["On top of the eagle", "Squad at the summit"] }
```

| Card id | Activity |
| --- | --- |
| d1-flight | Flight BLR → TRV |
| d1-drive | Drive airport → Jatayu |
| d1-jatayu | Jatayu Earth Centre |
| d1-checkin | Drive to Varkala & hotel check-in |
| d1-sunset | Sunset at Bindu's Cafe |
| d1-night-market | Cliff walk & night market |
| d1-dinner | Dinner at Cafe del Mar |
| d2-sunrise | Sunrise walk, Black Beach |
| d2-breakfast | Coffee Temple + scooties |
| d2-temple-beach | Janardhana Swamy Temple & Papanasam |
| d2-lunch | Lunch at Darjeeling Cafe |
| d2-ride | Kappil / Anjengo scooty ride |
| d2-sunset | Sunset at Trip is Life Cafe |
| d2-dinner | Dinner at InDa Cafe |
| d3-checkout | Hotel checkout (Mon 5:30 AM) |
| d3-train | Train VAK → ALLP |
| d3-alleppey | Alleppey breakfast & sarees |
| d3-houseboat | Houseboat cruise |
| d4-kayak | Backwater kayaking |
| d4-transfer | Tempo Traveller to COK |
| d4-flights | Flights home |
