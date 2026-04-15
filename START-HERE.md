# ✅ SETUP COMPLETE - Your Web App Integration is Ready!

## 🎯 What's Ready

Your Warta Jabar website now has a **simplified Google Apps Script Web App integration**. Everything is configured and ready to use!

### ✓ Completed:
- ✅ Updated generator script (tools/generate.js)
- ✅ Simplified configuration (tools/config.js)
- ✅ Removed API dependencies (package.json)
- ✅ Created Windows batch runner (generate.bat)
- ✅ Created PowerShell runner (generate.ps1)
- ✅ Comprehensive documentation (SETUP-GUIDE-V2.md)
- ✅ Quick reference guide (QUICK-REFERENCE-V2.md)

---

## 🚀 Quick Start (3 Steps)

### Step 1: Install Node.js (if not already installed)
```
👉 Download from: https://nodejs.org/
   Choose LTS version
   Run installer
   Restart your computer
```

### Step 2: Run the Generator
```bash
# Option A: Command line
cd "d:\Magang\Perhutani\Warta Jabar"
node tools/generate.js

# Option B: Double-click (Windows)
Double-click: generate.bat
```

### Step 3: Test
```
✓ Open news.html in your browser
✓ You should see articles with pagination, search, filters
✓ Done! 🎉
```

---

## 📂 Files You Now Have

### NEW Files (Web App Version):
```
✅ SETUP-GUIDE-V2.md        ← Read this first!
✅ QUICK-REFERENCE-V2.md    ← Keep handy
✅ WEB-APP-UPDATE.md        ← What changed
✅ generate.bat             ← Windows double-click
✅ generate.ps1             ← Windows PowerShell
```

### UPDATED Files:
```
✏️  tools/config.js         ← Simplified
✏️  tools/generate.js       ← Updated for Web App
✏️  package.json            ← Removed googleapis
```

### ORIGINAL Files (Unchanged):
```
→ news.html
→ js/load-news.js
→ tools/template.html
→ All other files
```

---

## 🎯 Your Web App Integration

### Current Configuration:
```
WEB_APP_URL: https://script.google.com/macros/s/AKfycbzxZIWenMOIU8_2hXzf9kWjdgNOln0iBuNSw_0Uw4scqTwgbW4Wu8FmG3_6Tuo96z7iRQ/exec
```

**Status:** ✅ Already configured in tools/config.js

Your Web App should return JSON in one of these formats:

**Format 1: Direct Array (Simplest)**
```json
[
  {
    "title": "Article 1",
    "content": "Content here",
    "category": "News",
    "image": "img/photo.jpg",
    "date": "2026-02-13",
    "author": "Author Name",
    "excerpt": "Short summary"
  },
  { ... more articles ... }
]
```

**Format 2: Wrapped Object**
```json
{
  "articles": [
    { "title": "...", "content": "..." },
    { ... }
  ]
}
```

---

## 🔄 Daily Workflow

```
1️⃣  Edit articles in your Google Apps Script Web App
   └─ (in whatever form/interface you've built)

2️⃣  Run generator:
   └─ node tools/generate.js
   └─ (or double-click generate.bat)

3️⃣  Done!
   └─ articles.json is updated
   └─ HTML pages are generated
   └─ Open news.html → see all changes
```

---

## 📋 Checklist Before Running

- [ ] Node.js installed? (`node --version` shows a version)
- [ ] Web App URL is correct? (Check in tools/config.js)
- [ ] Web App returns valid JSON? (Check by visiting URL in browser)
- [ ] Web App is publicly accessible? (Not blocked by authentication)

---

## 🐛 Common Issues & Fixes

### "node is not recognized as an internal or external command"
```
→ Node.js not installed
→ Solution: Download from nodejs.org and install
→ Restart your computer after install
```

### "Web App returned status 403"
```
→ Web App is not publicly accessible
→ Solution: Check Web App sharing settings
→ Make sure anyone with link can view
```

### "No articles found in Web App response"
```
→ Web App returns incorrect format
→ Solution: Check Web App returns valid JSON
→ See formats above
```

### "Generator runs but creates empty articles.json"
```
→ Web App data is empty or malformed
→ Solution: Check your Web App data
→ Make sure all required fields exist
```

---

## 📞 Getting Help

### Documentation:
1. **SETUP-GUIDE-V2.md** - Detailed setup instructions
2. **QUICK-REFERENCE-V2.md** - Quick tips and customizations
3. **WEB-APP-UPDATE.md** - What changed and why
4. **README.md** - Project overview (still valid)

### For Errors:
1. Read error messages carefully
2. Check SETUP-GUIDE-V2.md troubleshooting section
3. Check your Web App returns valid JSON
4. Check Node.js is installed

---

## 🎨 Customization Options

Without editing code, you can:
- Change articles per page (js/load-news.js)
- Customize card styling (js/load-news.js)
- Change article layout (tools/template.html)
- Add new data fields (update Web App and parseArticleRow())

See **QUICK-REFERENCE-V2.md** for examples.

---

## 🔐 Security Notes

✅ **Very Secure:**
- No API credentials stored in code
- Web App handles authentication
- You control what Web App returns
- Can add authorization to Web App if needed

---

## 📊 What Gets Generated

When you run `node tools/generate.js`:

```
✅ articles.json              (Database for news.html)
✅ berita1.html               (Standalone article 1)
✅ berita2.html               (Standalone article 2)
✅ berita3.html               (Standalone article 3)
... (one for each article)
```

**Location:** Root folder

**Used by:**
- news.html loads articles.json for dynamic display
- Each berita{N}.html is a standalone page for that article

---

## 💡 Pro Tips

### 1. Create a Backup
```
After successful generation, keep a copy of articles.json
This protects you if Web App ever goes down
```

### 2. Version Your Articles
```
Add a "version" field in Web App
Helps track changes over time
```

### 3. Test Locally
```
Before making articles public, test in local browser
Verify pagination, search, filters all work
```

### 4. Automate Generation
```
On Windows: Create a scheduled task to run generate.bat
Or use task scheduler to run daily/hourly
```

### 5. Monitor Web App
```
Keep Web App accessible and tested
Set up alerts if it goes down
```

---

## 📈 Next Steps

### Immediate (Today):
1. ✓ Install Node.js (if needed)
2. ✓ Run `node tools/generate.js` once
3. ✓ Test in browser: Open news.html

### This Week:
1. Read SETUP-GUIDE-V2.md
2. Configure your Web App to return proper JSON
3. Add/test your articles
4. Customize styling if needed

### Ongoing:
1. Run generator whenever you update articles
2. Monitor Web App functionality
3. Back up articles.json regularly

---

## 🎓 How It Works (Architecture)

```
Your Google Sheets/Database
         ↓
    Web App (Google Apps Script)
    └─ Returns JSON data
         ↓
    tools/generate.js (Node.js)
    ├─ Fetches JSON
    ├─ Parses articles
    ├─ Generates HTML files (berita1.html, etc)
    └─ Creates articles.json
         ↓
    news.html (Browser)
    └─ Loads articles.json
    └─ Displays with pagination, search, filters
```

---

## ❓ FAQ

**Q: Do I need npm install?**  
A: No! The Web App version has no dependencies.

**Q: How often should I run the generator?**  
A: Whenever you update articles. Daily/hourly if your Web App updates frequently.

**Q: Can I use this with the old Google Sheets API approach?**  
A: You can switch between them. See SETUP-GUIDE.md for old way.

**Q: What if my Web App goes down?**  
A: Keep a backup of articles.json. Website still works with last generated data.

**Q: Can I customize the generated article pages?**  
A: Yes! Edit tools/template.html for layout and styling.

**Q: What fields must my Web App return?**  
A: Minimum: title, content. Optional: category, image, date, author, excerpt.

**Q: Can I add custom fields?**  
A: Yes! Edit parseArticleRow() function in tools/generate.js.

**Q: Is the data real-time?**  
A: No, articles update when you run the generator. This is by design (static site benefits).

---

## 🎉 You're All Set!

Everything is configured and ready to use. 

**You only need Node.js installed, then run:**
```bash
node tools/generate.js
```

That's it! Enjoy your simplified Article Generator! 🚀

---

**Questions?** Check:
- ← SETUP-GUIDE-V2.md (detailed)
- ← QUICK-REFERENCE-V2.md (quick)
- ← WEB-APP-UPDATE.md (what changed)

---

**Status:** ✅ Ready to Generate Articles  
**Date:** February 13, 2026  
**Version:** 2.0 (Web App Edition)
