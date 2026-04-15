# ⚡ QUICK REFERENCE (Web App Version)

## 🎯 Setup (First Time) - SUPER SIMPLE! ⚡

```bash
# NO npm install needed! NO credentials needed!

# Just run this:
node tools/generate.js

# Done! Your articles from Google Apps Script are now generated.
```

> **Why so easy?** Web App endpoint at Google handles everything!

---

## 🔄 Daily Workflow (2 Minutes)

```
1. Edit your Google Sheets / Google Apps Script data

2. Run:
   node tools/generate.js

3. Done! 
   • Generated: berita1.html, berita2.html, ... + articles.json
   • Website auto-updates when you open news.html
```

---

## 📁 Important Files

| File | Edit For |
|------|----------|
| `tools/config.js` | WEB_APP_URL (usually OK as-is) |
| `tools/generate.js` | Script logic (don't edit) |
| `js/load-news.js` | Frontend behavior |
| `news.html` | Frontend structure |

---

## ✅ Web App Data Format

Your Google Apps Script should return JSON:

```json
[
  {
    "title": "Judul Artikel",
    "content": "Isi artikel...",
    "category": "Konservasi",
    "image": "img/file.jpg atau https://...",
    "date": "YYYY-MM-DD",
    "author": "Nama Penulis",
    "excerpt": "Ringkasan singkat..."
  },
  { ... }
]
```

Or wrapped:
```json
{
  "articles": [
    { "title": "...", "content": "..." },
    ...
  ]
}
```

---

## 🚀 Command Reference

```bash
# Run generator (fetch from Web App & generate HTML + JSON)
node tools/generate.js

# With npm:
npm run generate

# Check Node
node --version
```

---

## 📊 Generated Output

```
✅ articles.json         ← root folder
✅ berita1.html          ← root folder
✅ berita2.html          ← root folder
... berita{N}.html       ← all in root
```

Frontend loads from: `articles.json`

---

## 🎨 Quick Customizations

### Articles per page
```javascript
// js/load-news.js
const NEWS_CONFIG = {
  ARTICLES_PER_PAGE: 10,  // ← Change to 12, 15, etc
}
```

### Web App URL
```javascript
// tools/config.js
WEB_APP_URL: "https://script.google.com/macros/s/YOUR_URL/exec"
```

### Card styling
```javascript
// js/load-news.js → createArticleCard()
function createArticleCard(article) {
  return `<div><!-- edit here --></div>`;
}
```

---

## 🐛 Troubleshooting

| Error | Solution |
|-------|----------|
| `Web App returned 403` | Check Web App publicly accessible |
| `No articles found` | Check Web App returns valid JSON |
| `404: articles.json` | Run generator first |
| `Images not showing` | Check paths in Google Apps Script |
| `Search broken` | Check `#search-input` ID exists |

---

## 🔐 Security

✅ **No credentials needed!**  
✅ No sensitive API keys exposed  
✅ Web App handles all auth  

---

## ✓ Quick Test

After `node tools/generate.js`:

- [ ] articles.json created
- [ ] berita1.html exists
- [ ] Open news.html 
- [ ] Pagination works
- [ ] Search works
- [ ] Filter works
- [ ] Images load
- [ ] Mobile responsive

---

## ⚙️ Config.js Essentials

```javascript
// The only must-have:
WEB_APP_URL: "https://script.google.com/macros/s/YOUR_URL/exec"

// Defaults are fine:
ARTICLE_OUTPUT_DIR: "./"
ARTICLES_JSON_PATH: "./articles.json"
TEMPLATE_PATH: "./tools/template.html"
ARTICLE_PREFIX: "berita"
AUTO_WRAP_PARAGRAPHS: true
```

---

## 📞 Docs

- **Quick Start:** This file ✓
- **Detailed:** IMPLEMENTATION-GUIDE.md
- **Overview:** README.md
- **Examples:** EXAMPLE-ARTICLES.json

---

**Simple. Fast. Secure.** 🎉

Version: 2.0 (Web App) | Feb 13, 2026
