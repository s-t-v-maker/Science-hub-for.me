Science Hub - PWA file replacements

1) Replace the existing manifest.webmanifest with this folder's manifest.webmanifest.
2) Replace the existing sw.js with this folder's sw.js.
3) In index.html, make only this one-line change:
   OLD: <link rel="apple-touch-icon" href="./icons/icon-192.png">
   NEW: <link rel="apple-touch-icon" href="./icon-192.png">

Do not replace index.html with a shortened file. Keep the rest of your original website unchanged.
The three icon PNG files must remain in the repository root beside index.html.
After committing the changes, wait for GitHub Pages to publish, then reload the site.
