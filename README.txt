
PediaLink Growth Tool - Full data bundle for GitHub Pages

This ZIP contains:
- index.html (loads the browser-friendly build)
- pediatric-growth-tool.browser.jsx (converted version for direct hosting)
- pediatric-growth-tool.original.jsx (your original full source preserved)
- service-worker.js, manifest.json, offline.html, icons/

Deployment:
1. Upload all files/folders to the root of a public GitHub repository.
2. Settings -> Pages -> Source: main branch, root folder -> Save.
3. Wait ~30-60 seconds. Open https://<your-username>.github.io/<repo-name>/

Notes:
- The original source is preserved as pediatric-growth-tool.original.jsx. Use it for development and building a proper production bundle (CRA/Vite).
- The browser build is a heuristic conversion; if your original uses advanced imports or node-only APIs, it may still need manual tweaks to run in-browser.
- For production performance, I recommend a proper build pipeline. I can create a CRA/Vite setup for you.
