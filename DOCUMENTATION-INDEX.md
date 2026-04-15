# 📑 DOCUMENTATION INDEX & NAVIGATION GUIDE

## 🎯 Quick Navigation

### **New to the Project?**
👉 Start here: **[START-HERE.md](START-HERE.md)** (5 min read)

### **Need Quick Commands?**
👉 Use: **[QUICK-REFERENCE-V2.md](QUICK-REFERENCE-V2.md)** (bookmark this!)

### **Having Issues?**
👉 Check: **[TEST-AND-VALIDATION.md](TEST-AND-VALIDATION.md)** (debugging guide)

### **Want Full Details?**
👉 Read: **[SETUP-GUIDE-V2.md](SETUP-GUIDE-V2.md)** (comprehensive)

---

## 📚 Documentation Files Explained

### For Different Scenarios:

| Scenario | Read This |
|----------|-----------|
| **First time setup** | [START-HERE.md](START-HERE.md) |
| **Quick reference** | [QUICK-REFERENCE-V2.md](QUICK-REFERENCE-V2.md) |
| **Detailed setup** | [SETUP-GUIDE-V2.md](SETUP-GUIDE-V2.md) |
| **Testing/debugging** | [TEST-AND-VALIDATION.md](TEST-AND-VALIDATION.md) |
| **What changed** | [WEB-APP-UPDATE.md](WEB-APP-UPDATE.md) |
| **Project overview** | [README.md](README.md) |
| **Old API method** | [SETUP-GUIDE.md](SETUP-GUIDE.md) |

---

## 🔧 Operational Guides

### Daily Tasks
```
Question: How do I update articles?
Answer: Read "Daily Workflow" in QUICK-REFERENCE-V2.md

Question: How do I generate articles?
Answer: Run: node tools/generate.js
More: See QUICK-REFERENCE-V2.md Step 2
```

### Common Customizations
```
Question: How do I change articles per page?
Answer: Edit js/load-news.js, set ARTICLES_PER_PAGE
More: See QUICK-REFERENCE-V2.md "Customize" section

Question: How do I change article layout?
Answer: Edit js/load-news.js (card) or tools/template.html (article page)
More: See SETUP-GUIDE-V2.md "Customization" section
```

### Troubleshooting
```
Question: Generator shows error
Answer: Check TEST-AND-VALIDATION.md "Error Messages" section

Question: No articles in news.html
Answer: Check TEST-AND-VALIDATION.md "Troubleshooting" section

Question: Web App shows 403 error
Answer: See TEST-AND-VALIDATION.md "Error 2"
```

---

## 📂 File Organization

```
Warta Jabar/
│
├── 📖 DOCUMENTATION (Start Here!)
│   ├── START-HERE.md                ⭐ First time? Start here!
│   ├── QUICK-REFERENCE-V2.md        📋 Keep this nearby
│   ├── SETUP-GUIDE-V2.md            📚 Detailed instructions
│   ├── TEST-AND-VALIDATION.md       🔍 Debugging help
│   ├── WEB-APP-UPDATE.md            📝 What's new
│   ├── DOCUMENTATION-INDEX.md       ← You are here
│   ├── README.md                    ℹ️  Project info (old)
│   ├── SETUP-GUIDE.md               🔧 Old API method
│   └── (other guides)
│
├── 🛠️ TOOLS (Generator Scripts)
│   ├── generate.js                  ← Main generator script
│   ├── config.js                    ← Configuration
│   └── template.html                ← Article page template
│
├── 🎨 FRONTEND (Already Working!)
│   ├── news.html                    ← Loads articles dynamically
│   ├── js/
│   │   ├── load-news.js             ← Pagination, search, filter
│   │   └── (other js files)
│   ├── css/
│   │   └── style.css                ← Styling
│   └── img/                         ← Images folder
│
├── ▶️ RUN SCRIPTS (Windows)
│   ├── generate.bat                 ← Double-click to run
│   └── generate.ps1                 ← PowerShell version
│
├── 📄 CONFIGURATION
│   └── package.json                 ← NPM config
│
├── 📦 AUTO-GENERATED (Created by Generator)
│   ├── articles.json                ← Article database
│   ├── berita1.html                 ← Article pages
│   ├── berita2.html
│   ├── berita3.html
│   └── ... (more articles)
│
└── 📄 OTHER FILES
    ├── index.html
    ├── about.html
    ├── contact.html
    └── (other pages)
```

---

## 🔄 System Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     YOUR DATA SOURCE                            │
│        (Google Sheets / Google Apps Script)                    │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ Returns JSON
                         ▼
      ┌──────────────────────────────────┐
      │   Google Apps Script Web App      │
      │  (Your custom API endpoint)       │
      └────────────────┬─────────────────┘
                       │
                       │ HTTP GET
                       ▼
        ┌──────────────────────────────┐
        │  Node.js Generator Script    │
        │  (tools/generate.js)         │
        │                              │
        │  • Fetch from Web App        │
        │  • Parse JSON                │
        │  • Validate data             │
        │  • Generate HTML             │
        │  • Create articles.json      │
        └────┬──────────────────────┬──┘
             │                      │
       ┌─────▼──────────┐    ┌──────▼─────────┐
       │ berita1.html   │    │ articles.json   │
       │ berita2.html   │    │ (article DB)    │
       │ berita{N}.html │    │                 │
       └────────────────┘    └─────────┬───────┘
                                       │
                                       │
                             ┌─────────▼──────────┐
                             │  news.html         │
                             │  (in browser)      │
                             │                    │
                             │ • Load articles.json
                             │ • Show pagination  │
                             │ • Show search      │
                             │ • Show filters     │
                             └────────────────────┘
```

---

## 📋 Reading Order (Recommended)

### **If You Have 5 Minutes:**
1. [START-HERE.md](START-HERE.md) - Overview & quick start
2. [QUICK-REFERENCE-V2.md](QUICK-REFERENCE-V2.md) - Commands & tips

### **If You Have 15 Minutes:**
1. [START-HERE.md](START-HERE.md)
2. [QUICK-REFERENCE-V2.md](QUICK-REFERENCE-V2.md)
3. [SETUP-GUIDE-V2.md](SETUP-GUIDE-V2.md) - First sections only

### **If You Have 30 Minutes:**
1. [START-HERE.md](START-HERE.md)
2. [WEB-APP-UPDATE.md](WEB-APP-UPDATE.md)
3. [SETUP-GUIDE-V2.md](SETUP-GUIDE-V2.md) - Full read
4. [TEST-AND-VALIDATION.md](TEST-AND-VALIDATION.md) - At least error section

### **Complete Deep Dive:**
1. All documents in order
2. Try running generator
3. Read TEST-AND-VALIDATION.md if issues
4. Customize as needed

---

## 🎯 By Use Case

### **"I just want to run it"**
```
1. Install Node.js
2. Run: node tools/generate.js
3. Open news.html
Done!

Full guide: [START-HERE.md](START-HERE.md)
```

### **"It's not working, help!"**
```
1. Check error message
2. Read: [TEST-AND-VALIDATION.md](TEST-AND-VALIDATION.md)
3. Find your error scenario
4. Follow fix steps

Alternative: [SETUP-GUIDE-V2.md](SETUP-GUIDE-V2.md) troubleshooting section
```

### **"I want to customize the layout"**
```
1. Read: [QUICK-REFERENCE-V2.md](QUICK-REFERENCE-V2.md) "Customize" section
2. Edit files as shown
3. Run generator again

Detailed: [SETUP-GUIDE-V2.md](SETUP-GUIDE-V2.md) customization section
```

### **"What's the architecture?"**
```
See: System Flow Diagram above
Or read: [README.md](README.md) architecture section
Or: [WEB-APP-UPDATE.md](WEB-APP-UPDATE.md) "Key Benefits"
```

### **"I want the old Google API way"**
```
See: [SETUP-GUIDE.md](SETUP-GUIDE.md)
(Note: V2 is simpler and recommended)
```

---

## 🆘 Quick Help Matrix

```
Issue                          → Check This              → Section
─────────────────────────────────────────────────────────────────
"node not found"               → START-HERE.md           → Step 1
Generator fails                → TEST-AND-VALIDATION.md  → Common Errors
No articles show               → TEST-AND-VALIDATION.md  → Troubleshooting
Web App 403 error              → TEST-AND-VALIDATION.md  → Error 2
Articles empty                 → TEST-AND-VALIDATION.md  → If articles.json empty
Search not working             → QUICK-REFERENCE-V2.md   → Troubleshooting
Want to change per page        → QUICK-REFERENCE-V2.md   → Customize
Want to change Web App URL     → SETUP-GUIDE-V2.md       → Configuration
Where are generated files?     → START-HERE.md           → Files You Have
What's new in v2?              → WEB-APP-UPDATE.md       → Everything!
```

---

## 📊 Document Summary

| Document | Length | Best For | Read Time |
|----------|--------|----------|-----------|
| **START-HERE.md** | 4 pages | Quick overview & setup | 5 min |
| **QUICK-REFERENCE-V2.md** | 3 pages | Daily use & quick tips | 3 min |
| **SETUP-GUIDE-V2.md** | 8 pages | Complete setup & troubleshooting | 15 min |
| **TEST-AND-VALIDATION.md** | 6 pages | Testing & debugging | 15 min |
| **WEB-APP-UPDATE.md** | 5 pages | What changed | 10 min |
| **DOCUMENTATION-INDEX.md** | 2 pages | Navigation guide | 3 min |
| **README.md** | 6 pages | Project overview | 15 min |
| **SETUP-GUIDE.md** | 8 pages | Old API method | 20 min |

**Total:** ~50 pages of documentation

---

## 🎓 Learning Path

### **Beginner:**
```
START-HERE.md → Install Node → Run generator → Done!
```

### **Intermediate:**
```
START-HERE.md → QUICK-REFERENCE-V2.md → Try customizations → Read specific sections as needed
```

### **Advanced:**
```
All documents → Understand architecture → Customize deeply → Deploy to production
```

---

## ⚡ TL;DR (Too Long; Didn't Read)

```
1. Install Node.js
2. Run: node tools/generate.js
3. Open news.html in browser
4. See your articles with pagination, search, filters
5. Update articles in your Google Apps Script
6. Re-run generator
7. Done! 🎉
```

---

## 🔗 Quick Links

**Setup & Getting Started:**
- [Installation](START-HERE.md#-setup-first-time---super-simple--)
- [Running Generator](START-HERE.md#-quick-start-3-steps)
- [First Test](START-HERE.md#-next-steps)

**Daily Usage:**
- [Basic Commands](QUICK-REFERENCE-V2.md#-command-reference)
- [Workflow](QUICK-REFERENCE-V2.md#-daily-workflow-2-minutes)
- [Customizations](QUICK-REFERENCE-V2.md#-quick-customizations)

**Advanced:**
- [Architecture](WEB-APP-UPDATE.md#-before-vs-after)
- [Detailed Setup](SETUP-GUIDE-V2.md)
- [Troubleshooting](TEST-AND-VALIDATION.md#-troubleshooting-steps)

---

## 📞 If You Get Stuck

### Quick Checklist:
- [ ] Node.js installed? (run `node --version`)
- [ ] Web App URL valid? (visit in browser)
- [ ] Running from correct folder?
- [ ] Seeing any error messages?

### Then:
1. Check [TEST-AND-VALIDATION.md](TEST-AND-VALIDATION.md)
2. Find your error in "Common Error Messages"
3. Follow the solution steps
4. If still stuck: re-read [SETUP-GUIDE-V2.md](SETUP-GUIDE-V2.md) completely

---

## ✅ You're Ready!

Everything is set up and documented. Pick a document above and start!

**Recommendation:** If you haven't already, read [START-HERE.md](START-HERE.md) first (5 min).

---

**Happy generating! 🎉**

Version: 2.0 (Web App Edition)  
Date: February 13, 2026
