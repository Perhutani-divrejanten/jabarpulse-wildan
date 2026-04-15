# 🚀 SETUP GUIDE - Google Apps Script Web App Version (SIMPLIFIED)

## ✨ What's New? Web App Approach is MUCH SIMPLER!

Instead of dealing with Google API credentials and service accounts, you now use a Google Apps Script **Web App** that acts as a gateway to your Google Sheets. This means:

- ✅ **NO credentials to manage** - Web App handles authentication
- ✅ **NO API setup** - Simple HTTP GET request
- ✅ **NO complex config** - Just paste the Web App URL
- ✅ **Faster & simpler** - Everything is handled by Google Apps Script

---

## 📋 Prerequisites

1. **Node.js** (v12 or newer) - [Download from nodejs.org](https://nodejs.org/)
2. **Google Apps Script Web App URL** - You've already provided this! ✓
3. **Text editor** - VS Code or any text editor

---

## 🔧 Step 1: Install Node.js

1. Go to [nodejs.org](https://nodejs.org/)
2. Download the **LTS version** (Long Term Support)
3. Run the installer
4. Accept defaults
5. Verify installation:
   ```bash
   node --version
   npm --version
   ```

---

## ✅ Step 2: Update Configuration

The configuration is already set up with your Web App URL! 

**File:** `tools/config.js`

```javascript
module.exports = {
  // Your Web App URL (already configured!)
  WEB_APP_URL: "https://script.google.com/macros/s/AKfycbzxZIWenMOIU8_2hXzf9kWjdgNOln0iBuNSw_0Uw4scqTwgbW4Wu8FmG3_6Tuo96z7iRQ/exec",
  
  // Rest of config is fine as-is
  ARTICLE_OUTPUT_DIR: "./",
  ARTICLES_JSON_PATH: "./articles.json",
  TEMPLATE_PATH: "./tools/template.html",
  // ... other settings
}
```

**⚠️ If you change Web Apps later**, just update the `WEB_APP_URL` value.

---

## 🚀 Step 3: Run the Generator

```bash
# Navigate to project folder (if not already there)
cd "d:\Magang\Perhutani\Warta Jabar"

# Run the generator
node tools/generate.js
```

**Expected output:**
```
✓ Starting Google Sheets Article Generator (via Web App)...
✓ Fetching articles from Web App...
✓ Retrieved 10 articles from Web App
✓ Parsing and validating articles...
✓ Validated 10 articles
✓ Generating HTML article files...
✓ Generated: Artikel 1...
✓ Generated: Artikel 2...
... (more articles)
✓ Generated 10 HTML files
✓ Generating articles.json...
✓ Generated articles.json with 10 articles

============================================================
✅ GENERATION COMPLETED SUCCESSFULLY!
============================================================

📊 Statistics:
   • Total articles: 10
   • HTML files generated: 10
   • articles.json created: ./articles.json

📁 Output Files:
   • Articles: berita1.html - berita10.html
   • Database: ./articles.json

🚀 Next Steps:
   1. Check generated files: ./
   2. Verify articles.json is accessible from website
   3. Test news.html loads articles dynamically

💡 Tips:
   • Re-run this script anytime you add/edit articles in Google Sheets
   • Use relative paths for local images (img/filename.jpg)
   • Use full URL for external images (https://...)
```

---

## 🎉 Step 4: Test It!

1. **Open `news.html`** in your browser
2. You should see your articles with:
   - ✓ Pagination (10 per page)
   - ✓ Search box
   - ✓ Category filter
   - ✓ Images
   - ✓ Article details

---

## 🔄 Daily Workflow (Going Forward)

Whenever you want to update articles:

```bash
# 1. Edit your Google Sheets / Google Apps Script data (add/modify articles)

# 2. Run the generator
node tools/generate.js

# 3. Your website is updated!
```

That's it! The `articles.json` is generated and your `news.html` loads from it automatically.

---

## 📁 What Gets Generated?

| File | Description |
|------|-------------|
| `berita1.html` | Standalone article page for article #1 |
| `berita2.html` | Standalone article page for article #2 |
| `berita{N}.html` | Standalone articles (one per article) |
| `articles.json` | JSON database of all articles (used by news.html) |

---

## 🐛 Troubleshooting

### Error: "node is not recognized"
→ Node.js not installed. Download from [nodejs.org](https://nodejs.org/)

### Error: "Web App returned status 403"
→ Check that your Web App is public (shared with anyone)
→ Verify the WEB_APP_URL in config.js is correct

### Error: "No articles found in Web App response"
→ Check your Web App returns valid JSON
→ Check the data format matches expected fields (title, content, etc)

### Error: "Unexpected Web App response format"
→ Your Web App should return:
   - Option 1: Direct array: `[{title, content, ...}, ...]`
   - Option 2: Wrapped: `{articles: [{title, content, ...}, ...]}`

### No images showing
→ Check image paths in your Google Apps Script data
→ Use `img/filename.jpg` for local images
→ Use full `https://...` for external images

### articles.json not created
→ Check if generator ran successfully (check for ✓ success messages)
→ Check you have write permissions in the folder

---

## 🔐 Security

✅ **Your Web App handles security**
- You can add authentication to the Web App if needed
- No API credentials in your code
- No sensitive data exposed

---

## 📚 Understanding the Web App Approach

### Traditional Way (Old)
```
Google Sheets → Google Sheets API → Credentials/Auth → Generator Script → HTML + JSON
(Complex setup, multiple permissions)
```

### Web App Way (New) ✨
```
Google Sheets → Google Apps Script Web App → Generator Script → HTML + JSON
(Simple HTTP request, Web App handles everything)
```

---

## 💡 Tips & Best Practices

### 1. Image Paths
- **Local images:** `img/filename.jpg`
- **External images:** `https://example.com/image.jpg`

### 2. Date Format
- Use `YYYY-MM-DD` format (e.g., `2026-02-13`)
- Script automatically converts to Indonesian format (13 Februari 2026)

### 3. Content
- Plain text works fine - script auto-wraps with `<p>` tags
- No need for HTML in your Google Sheets

### 4. Categories
- Any text works - displayed as badges
- Common: Konservasi, Pelatihan, Lingkungan, Berita Terbaru, etc.

### 5. Running Frequently
- No speed issues - Web App is fast
- Can run generator multiple times a day
- Only updates changed articles

---

## 🎯 Next Steps

1. ✓ Install Node.js
2. ✓ Configuration is already done (WEB_APP_URL is set)
3. ✓ Run the generator once: `node tools/generate.js`
4. ✓ Test in browser: Open `news.html`
5. ✓ Update articles in your sheet/script anytime
6. ✓ Re-run generator to sync

---

## ❓ FAQ

**Q: Do I need to manually edit Google Sheets?**  
A: No, your Google Apps Script manages the data. You can create a data entry interface in the Web App or use Google Forms.

**Q: How often should I run the generator?**  
A: Whenever you add/update articles. You can run it as often as needed.

**Q: Do I need to commit generators changes?**  
A: Not necessarily. The `articles.json` and `berita*.html` files can be regenerated anytime. You may want to `.gitignore` them.

**Q: Can I customize the article layout?**  
A: Yes! Edit `tools/template.html` for the standalone article pages, or `js/load-news.js` for the news.html card layout.

**Q: What if my Web App is down?**  
A: The generator will fail. Keep a backup of the last `articles.json` for emergencies.

---

## 📞 Support Resources

- **Node.js Help:** [nodejs.org/en/docs/](https://nodejs.org/en/docs/)
- **Google Apps Script Docs:** [developers.google.com/apps-script](https://developers.google.com/apps-script)
- **Script Documentation:** See IMPLEMENTATION-GUIDE.md

---

## 🎓 What Each File Does

| File | Purpose | Edit? |
|------|---------|-------|
| `tools/generate.js` | Fetches from Web App, generates HTML | No |
| `tools/config.js` | Configuration settings | Only WEB_APP_URL |
| `tools/template.html` | HTML template for articles | Yes (customize layout) |
| `js/load-news.js` | Frontend loader & pagination | Yes (customize behavior) |
| `news.html` | News listing page | Yes (customize structure) |
| `package.json` | NPM configuration | No |
| `articles.json` | Auto-generated article database | Auto-generated |
| `berita*.html` | Auto-generated article pages | Auto-generated |

---

## ✨ Summary

```
Web App Approach = Simple, Secure, Fast ⚡

No more credentials, no more complex API setup.
Just run: node tools/generate.js

That's it! 🎉
```

---

**Version:** 2.0 (Web App)  
**Date:** February 13, 2026  
**Status:** Ready to Use ✓
