# 🧪 TEST & VALIDATION GUIDE

## What to Expect When Running the Generator

When you run `node tools/generate.js`, you should see output like this:

### ✅ Expected Output

```
• Starting Google Sheets Article Generator (via Web App)...
• Web App URL: https://script.google.com/macros/s/AKfycbzxZIWenMOIU8_2hXzf9kWjdgNOln0iBuNSw_0Uw4scqTwgbW4Wu8FmG3_6Tuo96z7iRQ/exec
✓ Fetching articles from Web App...
✓ Retrieved 10 articles from Web App
✓ Parsing and validating articles...
✓ Validated 10 articles
✓ Generating HTML article files...
✓ Generated: Judul Artikel 1...
✓ Generated: Judul Artikel 2...
✓ Generated: Judul Artikel 3...
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

## ❌ Common Error Messages & What They Mean

### Error 1: Network Error
```
✗ ERROR: fetch failed: getaddrinfo ENOTFOUND script.google.com

Meaning: Can't reach the Web App URL
Solutions:
1. Check your internet connection
2. Check the WEB_APP_URL in tools/config.js
3. Check if the URL is correct
4. Try pasting URL in browser (should show something)
```

### Error 2: Access Denied
```
✗ ERROR: Web App returned status 403: Forbidden

Meaning: Web App exists but you don't have access
Solutions:
1. Check Web App sharing settings
2. Make sure it's "Share with anyone" or appropriate access level
3. Check URL is correct
4. In Web App settings, verify it's deployed as "Execute as me" or "Access:Anyone"
```

### Error 3: Not Found
```
✗ ERROR: Web App returned status 404: Not Found

Meaning: URL points to non-existent Web App
Solutions:
1. Double-check the URL in tools/config.js
2. Check if Web App was redeployed with new URL
3. Copy URL from Web App deployment settings
```

### Error 4: Invalid JSON
```
✗ ERROR: Unexpected Web App response format. Expected array of articles or {articles: [...]}

Meaning: Web App doesn't return correct JSON format
Solutions:
1. Check Web App actually returns JSON
2. Verify format: array or {articles: [...]}
3. Test by visiting URL in browser to see raw data
4. Check all required fields exist (title, content)
```

### Error 5: Empty Data
```
✗ ERROR: No articles found in Web App response.

Meaning: JSON is valid but no articles data
Solutions:
1. Check your Web App has data
2. Check data structure matches expected format
3. Make sure articles have title and content fields
4. Check article rows aren't empty or missing fields
```

---

## ✅ Verification Checklist

After running the generator, verify these things:

### 1. Files Were Generated
```bash
# Check in your folder:
✓ berita1.html exists
✓ berita2.html exists
✓ ... more berita files
✓ articles.json exists
```

### 2. articles.json is Valid
```bash
# Open articles.json in VS Code or text editor
# Should look like:
{
  "version": "1.0",
  "generatedAt": "2026-02-13T10:30:00.000Z",
  "totalArticles": 10,
  "articles": [
    {
      "id": 1,
      "title": "Judul Artikel",
      "excerpt": "Ringkasan...",
      "content": "<p>Isi artikel...</p>",
      "category": "Konservasi",
      "image": "img/photo.jpg",
      "date": "2026-02-13",
      "author": "Author Name",
      "dateFormatted": "13 Februari 2026",
      "url": "berita1.html"
    },
    ... more articles
  ]
}
```

**✓ Must have:**
- version
- generatedAt
- totalArticles
- articles array with proper structure

### 3. HTML Articles Exist
```bash
# Open berita1.html in VS Code
# You should see valid HTML with:
✓ <!DOCTYPE html>
✓ <html>
✓ Your article title
✓ Article content
✓ Image tag if image provided
✓ Category badge
✓ Date and author
```

### 4. Test in Browser
```
✓ Open news.html in web browser
✓ Should load articles from articles.json
✓ Should show:
   - Article cards with titles, images, excerpts
   - Pagination buttons (Previous/Next)
   - Search box
   - Category filter
   - All articles formatted nicely
```

### 5. Test Functionality
```
✓ Click pagination buttons → should show different articles
✓ Type in search box → should filter articles
✓ Click category badge → should filter by category
✓ Click article title → should open berita{N}.html
✓ Images should load properly
✓ Layout should be responsive on phone/tablet
```

---

## 🔍 Debugging Tips

### 1. Check Web App Output
```
Visit your Web App URL directly in browser:
https://script.google.com/macros/s/.../exec

You should see:
- Either JSON array directly
- Or valid JSON object
- Or see the actual data returned

NOT:
- Error message
- Blank page
- HTML page (that's wrong format)
```

### 2. Check articles.json Content
```javascript
// In browser console (F12), paste:
fetch('articles.json')
  .then(r => r.json())
  .then(d => console.log(d))

// Should show:
{
  version: "1.0",
  generatedAt: "...",
  totalArticles: 10,
  articles: [...]
}
```

### 3. Test Individual Article HTML
```
Open berita1.html in browser
Check:
✓ Title displays correctly
✓ Content is readable
✓ Images show (if provided)
✓ Date is in Indonesian format
✓ No placeholder text like {{TITLE}}
```

### 4. Check Browser Console for Errors
```
Press F12 in browser (on news.html)
Look at Console tab
Common errors to check:
- 404: articles.json (means generator didn't run)
- Fetch failures (network/CORS issues)
- JavaScript errors (check load-news.js)
```

---

## 🚨 Troubleshooting Steps

### If Generator Fails:

**Step 1: Verify Web App**
```bash
# Visit URL in browser
# Should return data, not error
https://script.google.com/macros/s/.../exec
```

**Step 2: Check Config**
```bash
# Open tools/config.js
# Verify WEB_APP_URL is correct
# No typos, no "YOUR_" placeholders
```

**Step 3: Check Network**
```bash
# Try another internet task (download file, etc)
# Make sure internet is working
# Try disabling VPN if using one
```

**Step 4: Check Node.js**
```bash
node --version
# Should show like: v18.12.0
# If not found: install Node.js
```

**Step 5: Recheck Web App Format**

Visit Web App URL, paste response here:
```
[ or { ?
```

### If articles.json is Created but Empty:

**Check 1: Did generator actually run?**
```bash
# Look back at output
# Should say "Retrieved X articles"
# Should say "Validated X articles"
```

**Check 2: What does Web App return?**
```bash
# Visit URL in browser
# Should show JSON with data
# Not empty array []
# Not error page
```

**Check 3: Field names match?**
```javascript
// Your Web App should return:
{
  "title": "...",
  "content": "...",
  "category": "...",
  "image": "...",
  "date": "...",
  "author": "...",
  "excerpt": "..."
}

// OR Indonesian field names are OK too:
{
  "title": "...",        // Same
  "content": "...",      // Same
  "kategori": "...",     // Works (mapped to category)
  "gambar": "...",       // Works (mapped to image)
  "tanggal": "...",      // Works (mapped to date)
  "penulis": "...",      // Works (mapped to author)
  "ringkasan": "..."     // Works (mapped to excerpt)
}
```

### If news.html doesn't Load Articles:

**Step 1: Check articles.json Exists**
```bash
# Should be in root folder
# Not in subfolder
# Exact name: articles.json
```

**Step 2: Check articles.json is Valid**
```javascript
// Open in browser console:
fetch('articles.json').then(r => r.json()).then(d => console.log(d))
// Should show data, not error
```

**Step 3: Check js/load-news.js Loaded**
```bash
# Open news.html in browser
# Press F12 (Developer Tools)
# Network tab → should show load-news.js
# Look for errors in Console tab
```

**Step 4: Check HTML Structure**
```bash
# Find these elements in news.html:
<div id="category-filter"></div>
<div id="articles-container" class="row"></div>
<div id="pagination-container"></div>
<input id="search-input" ...>

# If missing, check news.html wasn't reverted
```

---

## 📈 Performance Checklist

After everything works:

- [ ] Generator runs in less than 5 seconds
- [ ] articles.json is < 1MB
- [ ] news.html loads articles in < 2 seconds
- [ ] Search is responsive (debounced)
- [ ] Pagination works smoothly
- [ ] Images load without delay
- [ ] No console errors

---

## 🎯 Success Criteria

Generator is working correctly when:

✅ **Generator Output:**
- Shows "Retrieved X articles from Web App"
- Shows "Generated X HTML files"
- Shows "✅ GENERATION COMPLETED SUCCESSFULLY"
- No ❌ ERROR messages

✅ **Files Created:**
- berita1.html through berita{N}.html exist
- articles.json exists in root folder
- articles.json is > 100 bytes (has data)

✅ **Browser Display:**
- news.html loads without errors
- Articles display with proper titles, images, metadata
- Pagination works
- Search works
- Filters work
- All styling looks good
- Mobile view is responsive

✅ **Data Integrity:**
- All article fields display correctly
- Dates are in Indonesian format
- Categories are properly labeled
- Images display (if provided)
- Content is properly formatted with paragraphs

---

## 📚 Further Help

If you're still stuck:

1. **Read:** SETUP-GUIDE-V2.md (has more troubleshooting)
2. **Check:** Your Web App data format and content
3. **Verify:** Node.js is installed correctly
4. **Test:** Visit Web App URL directly in browser
5. **Review:** All configuration is correct

---

**You're set!** Just run the generator and enjoy! 🚀
