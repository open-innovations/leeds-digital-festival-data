deno run --unstable --allow-read --allow-write ./scripts/force24.ts
deno run --unstable --allow-read --allow-write ./scripts/twitter.ts ./working/daily_tweet*.csv
deno run --unstable --allow-read --allow-write ./scripts/linkedin.ts ./working/leeds-digital-festival_visitors_1634116360765.xls ./working/leeds-digital-festival_updates_1634116558887.xls
deno run --unstable --allow-read --allow-write ./scripts/website.ts "./working/Google Analytics - Users & Page Views.csv"
deno run --unstable --allow-read --allow-write ./scripts/combine-service.ts