# ⚡ QUICK REFERENCE CARD

## 🎯 Setup (First Time)

```bash
# 1. Install Node.js from nodejs.org

# 2. Follow SETUP-GUIDE.md to get credentials.json
#    → Save to tools/credentials.json

# 3. Update tools/config.js
#    → GOOGLE_CREDENTIALS = paste from JSON
#    → SPREADSHEET_ID = from Google Sheets URL

# 4. Create Google Sheets with columns:
#    A: title | B: content | C: category
#    D: image | E: date | F: author | G: excerpt

# 5. Share spreadsheet with service account email

# 6. Run:
npm install
node tools/generate.js
```

---

## 🔄 Daily Workflow (5 Minutes)

```
1. Edit Google Sheets
   └─ Add/modify article rows

2. Run generator
   └─ node tools/generate.js

3. Done! 
   └─ Website auto-updates from articles.json
```

---

## 📁 Important Files

| File | Edit For |
|------|----------|
| `tools/config.js` | Google API setup |
| `tools/generate.js` | Script logic (don't edit) |
| `js/load-news.js` | Frontend behavior |
| `news.html` | Frontend structure |
| `package.json` | Dependencies |

---

## ✅ Google Sheets Format

```
Row 1 (Headers):    title | content | category | image | date | author | excerpt
Row 2+ (Data):      [your articles with above columns]

Format Tips:
- title:   Any text (MAX 200 chars)
- content: Plain text (auto-wrap dengan <p>)
- category: Konservasi, Pelatihan, Lingkungan, etc
- image:   img/file.jpg or https://url...
- date:    YYYY-MM-DD (2026-02-13)
- author:  Author name
- excerpt: Short summary
```

---

## 🚀 Command Reference

```bash
# Install dependencies (first time only)
npm install

# Generate articles (run after editing Google Sheets)
node tools/generate.js

# Or with npm script:
npm run generate

# Check Node version
node --version

# Check npm version
npm --version
```

---

## 📊 Generated Files Location

```
✅ articles.json         ← in root folder
✅ berita1.html          ← in root folder
✅ berita2.html          ← in root folder
... berita{N}.html       ← all in root
```

---

## 🎨 Customize (Common Changes)

### Change articles per page
```javascript
// File: js/load-news.js
const NEWS_CONFIG = {
  ARTICLES_PER_PAGE: 10,  // ← Change to 12, 15, etc
  ...
}
```

### Change article card styling
```javascript
// File: js/load-news.js
function createArticleCard(article) {
  return `<div class="col-md-6 col-lg-4 mb-4">
    <!-- Edit HTML here -->
  </div>`;
}
```

### Add new spreadsheet column
```
1. Add column H in Google Sheets
2. Edit tools/config.js: RANGE: "Sheet1!A2:H1000"
3. Edit tools/generate.js: parseArticleRow() add row[7]
4. Edit js/load-news.js: createArticleCard() display it
```

---

## 🐛 Quick Troubleshooting

| Error | Fix |
|-------|-----|
| `Invalid credentials` | Re-download JSON key from Google Cloud, paste to config.js |
| `Spreadsheet not found` | Check SPREADSHEET_ID, ensure service account has access |
| `No articles generated` | Check data starts from row 2, fill all required fields |
| `404: articles.json` | Run generator, check file exists in root |
| `Images not showing` | Check img/ folder exists, paths in Google Sheets |
| `Search not working` | Check `#search-input` ID in news.html |

**For more:** See IMPLEMENTATION-GUIDE.md Troubleshooting section

---

## 🔐 Security Reminders

```bash
# Add to .gitignore
echo "tools/credentials.json" >> .gitignore
echo ".env" >> .gitignore
echo "node_modules/" >> .gitignore

# Never push credentials.json to GitHub!
```

---

## 📱 Test Checklist

After running `node tools/generate.js`:

- [ ] articles.json exists (valid JSON)
- [ ] berita1.html exists
- [ ] Open news.html in browser
- [ ] Check pagination works
- [ ] Check category filter works
- [ ] Check search works
- [ ] Check images load
- [ ] Check responsive on mobile

---

## 📞 Documentation Links

- **Setup:** SETUP-GUIDE.md
- **Implementation:** IMPLEMENTATION-GUIDE.md
- **Overview:** README.md
- **Examples:** EXAMPLE-ARTICLES.json
- **Summary:** SOLUTION-SUMMARY.md

---

## 🎯 Config.js Must-Have

```javascript
// REQUIRED fields:
GOOGLE_CREDENTIALS: { /* paste from JSON key */ }
SPREADSHEET_ID: "abc123xyz..."  // from URL
RANGE: "Sheet1!A2:G1000"        // your data range

// OPTIONAL (defaults are good):
ARTICLES_PER_PAGE: 10
IMAGE_BASE_URL: "img/"
AUTO_WRAP_PARAGRAPHS: true
```

---

## ⏱️ Performance Tips

```
✅ Images: JPEG 600px wide, 50-100KB each
✅ Articles: Plain text, let script wrap
✅ Sheets: Max 1000 rows recommended
✅ Cache: Auto 1 hour, browser cache enabled
✅ Generate: Run offline, batch updates
```

---

## 🚀 One-Liner Quick Start

```bash
cd d:\Magang\Perhutani\Warta\ Jabar && \
npm install && \
node tools/generate.js && \
echo "✓ Done! Open news.html"
```

---

**Keep this card nearby! Print it out 🖨️**

Version: 1.0 | Last Updated: 2026-02-13
