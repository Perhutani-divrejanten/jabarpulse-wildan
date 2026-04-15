# 🚀 WARTA JABAR - Integrasi Google Sheets sebagai CMS

**Gunakan Google Sheets sebagai database artikel untuk website Warta Jabar. Generator otomatis membuat HTML dan memperbarui konten dengan mudah!**

---

## 📋 Mulai Cepat (5 Menit)

### 1️⃣ Siapkan Google Cloud
```bash
# Kunjungi: console.cloud.google.com
# 1. Buat project (misal: "Warta-Jabar-News")
# 2. Aktifkan "Google Sheets API"
# 3. Buat Service Account
# 4. Download kunci JSON
# 5. Simpan ke: tools/credentials.json
```

### 2️⃣ Siapkan Google Sheets
```
Buat spreadsheet dengan kolom:
- title (Judul artikel)
- content (Isi artikel, plain text)
- category (Kategori)
- image (img/file.jpg atau URL)
- date (YYYY-MM-DD)
- author (Nama penulis)
- excerpt (Ringkasan singkat)

Bagikan spreadsheet dengan email yang ada di credentials.json
```

### 3️⃣ Update Konfigurasi
```bash
# Buka: tools/config.js
# Update:
#  - GOOGLE_CREDENTIALS (copy dari credentials.json)
#  - SPREADSHEET_ID (dari URL Google Sheets)
```

### 4️⃣ Generate & Jalankan
```bash
npm install
node tools/generate.js

# Hasil:
# ✅ berita1.html, berita2.html, ... (auto-generated)
# ✅ articles.json (database JSON)
```

### 5️⃣ Uji Website
- Buka `news.html` di browser
- Periksa pagination, filter kategori, dan fitur pencarian

---

## 📁 Struktur File

```
warta-jabar/
├── articles.json              # Database artikel (auto-generated)
├── berita1.html               # Halaman artikel (auto-generated)
├── berita2.html
├── ...
├── news.html                  # Halaman utama, memuat artikel secara dinamis
├── package.json               # Dependensi
│
├── tools/
│  ├── generate.js             # Script generator utama
│  ├── config.js               # Konfigurasi API & setup
│  ├── template.html           # Template halaman artikel
│  └── credentials.json        # Auth Google (PRIVATE!)
│
├── js/
│  ├── load-news.js            # Loader frontend (memuat articles.json)
│  ├── main.js                 # Script frontend lain
│  └── auth.js                 # Script auth (jika digunakan)
│
├── css/
│  └── style.css               # Styling
│
├── img/                       # Folder gambar artikel
│
├── SETUP-GUIDE.md             # Petunjuk setup
├── IMPLEMENTATION-GUIDE.md    # Penjelasan implementasi
├── EXAMPLE-ARTICLES.json      # Contoh format artikel
└── README.md                  # File ini
```

---

## 🔄 Alur Kerja (Workflow)

```
┌─────────────────────────┐
│ 1. Edit Google Sheets   │
│    - Tambah/edit artikel│
└────────────┬────────────┘
             │
             ↓
┌─────────────────────────┐
│ 2. Jalankan Generator   │
│    node tools/generate  │
└────────────┬────────────┘
             │
             ↓
┌─────────────────────────┐
│ 3. Otomatis Ter-generate│
│    - berita*.html       │
│    - articles.json      │
└────────────┬────────────┘
             │
             ↓
┌─────────────────────────┐
│ 4. Website Ter-update   │
│    - news.html memuat   │
│      artikel baru       │
│    - Pagination bekerja │
│    - Pencarian bekerja  │
└─────────────────────────┘
```

---

## 📚 Dokumentasi

Lihat file-file berikut untuk informasi lebih lengkap:

| File | Konten |
|------|--------|
| **SETUP-GUIDE.md** | Panduan setup Google Sheets API |
| **IMPLEMENTATION-GUIDE.md** | Alur kerja + tips lanjutan |
| **EXAMPLE-ARTICLES.json** | Contoh format data artikel |
| **tools/config.js** | Semua parameter konfigurasi |
| **tools/generate.js** | Kode generator (dokumentasi ada di dalam) |
| **js/load-news.js** | Kode frontend untuk memuat articles.json |

---

## ⚙️ Konfigurasi (tools/config.js)

```javascript
module.exports = {
  // Google credentials (salin dari kunci JSON)
  GOOGLE_CREDENTIALS: { ... },
  
  // Spreadsheet ID (dari URL Google Sheets)
  SPREADSHEET_ID: "abc123...",
  
  // Range data di spreadsheet
  RANGE: "Sheet1!A2:G1000",
  
  // Path konfigurasi
  ARTICLE_OUTPUT_DIR: "./",
  ARTICLES_JSON_PATH: "./articles.json",
  TEMPLATE_PATH: "./tools/template.html",
  
  // Konfigurasi gambar
  IMAGE_BASE_URL: "img/",
  
  // Opsi frontend
  ARTICLES_PER_PAGE: 10,
  AUTO_WRAP_PARAGRAPHS: true,
};
```

---

## 🎯 Fitur

### ✅ Sudah Terpasang
- [x] Auto-generate HTML artikel dari Google Sheets
- [x] Generate database `articles.json`
- [x] Memuat artikel secara dinamis di `news.html`
- [x] Pagination (10 artikel per halaman)
- [x] Filter kategori
- [x] Pencarian full-text (title, content, excerpt)
- [x] Responsive (mobile-friendly)
- [x] Lazy-loading gambar
- [x] Auto-wrap teks dengan `<p>` tag
- [x] Dukungan gambar lokal (`img/`) dan URL eksternal
- [x] Auto-format tanggal (format Indonesia)

### 📋 Fitur Opsional (Bonus)
- [ ] Integrasi newsletter email
- [ ] Tombol share ke sosial media
- [ ] Rating / like artikel
- [ ] Sistem komentar
- [ ] Artikel terkait
- [ ] Estimasi waktu baca
- [ ] Mode gelap (dark mode)

---

## 🛠️ Perintah

```bash
# Install dependensi
npm install

# Generate artikel (jalankan setiap kali update Google Sheets)
node tools/generate.js
```
node tools/generate.js

# Or dengan npm script:
npm run generate
```

---

## 🚨 Common Issues

### ❌ "Invalid credentials"
→ Download JSON key baru dari Google Cloud Console

### ❌ "Spreadsheet not found"
→ Cek SPREADSHEET_ID dan pastikan service account di-share

### ❌ "Empty data"
→ Pastikan data start dari row 2, no empty rows, fill required fields

### ❌ "JavaScript errors in browser"
→ Check DevTools Console (F12) → Cek error message

### ❌ "articles.json not loading"
→ Gunakan HTTP server (jangan file://), bukan hardcoded path

**Lihat IMPLEMENTATION-GUIDE.md untuk troubleshooting lengkap**

---

## 📊 Data Structure

### Google Sheets Columns:
| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| title | content | category | image | date | author | excerpt |

**Contoh:**
```
Berita Konservasi | Berita tentang trees... | Konservasi | img/tree.jpg | 2026-02-13 | Adi | Ditemukan...
```

### articles.json Output:
```json
{
  "version": "1.0",
  "generatedAt": "2026-02-13T10:30:00Z",
  "totalArticles": 90,
  "articles": [
    {
      "id": 1,
      "title": "...",
      "content": "<p>Wrapped with HTML tags</p>",
      "category": "Konservasi",
      "image": "img/tree.jpg",
      "date": "2026-02-13",
      "author": "Adi",
      "dateFormatted": "13 Februari 2026",
      "url": "berita1.html"
    }
  ]
}
```

---

## 🔐 Security Note

⚠️ **IMPORTANT:** `tools/credentials.json` adalah PRIVATE!

```bash
# Add to .gitignore
echo "tools/credentials.json" >> .gitignore
echo "node_modules/" >> .gitignore
echo ".env" >> .gitignore

# Jangan push ke GitHub!
```

---

## 📱 Frontend Integration

### news.html
- Auto-load articles dari articles.json
- Pagination dengan buttons "Sebelumnya" / "Berikutnya"
- Category filter buttons
- Search box

### Article Pages (berita*.html)
- Auto-generated dari template.html
- Include Navbar, Header, Footer
- Image, title, metadata (date, author, category)
- Plain text content auto-wrapped dengan `<p>` tags
- Responsive layout

---

## 💡 Tips & Tricks

### Optimize Images
```
1. Use JPEG/WebP format
2. Compress dengan TinyPNG
3. Max width 600px
4. Upload ke Cloudinary (better than local)
```

### Batch Update
```
1. Edit banyak artikel di Google Sheets
2. Run generator 1x: node tools/generate.js
3. Semua artikel terupdate sekaligus!
```

### Content Ideas
- Plain text content otomatis di-wrap dengan `<p>`
- Gunakan 2x line break untuk paragraph baru
- Images bisa lokal (img/) atau external URL
- Dates format: YYYY-MM-DD

### Monitor Performance
```javascript
// Browser DevTools (F12)
// Network tab → check articles.json loading
// Console tab → check JavaScript errors
// Application tab → check cache
```

---

## 📈 Growth Path

### Phase 1: Basic Setup ✅ 
- Google Sheets API
- Generator script
- Static articles.json
- news.html dynamic loading

### Phase 2: Enhancement 🎯
- Email notifications untuk artikel baru
- Social media share buttons
- Article comments/ratings
- Related articles suggestion

### Phase 3: Advanced 🚀
- Admin dashboard untuk publish
- Scheduled posting
- Analytics integration
- Multi-language support

---

## 🆘 Need Help?

1. **Check Documentation:**
   - SETUP-GUIDE.md → Setup instructions
   - IMPLEMENTATION-GUIDE.md → Detailed workflow
   - tools/generate.js → Well-commented code

2. **Debug:**
   - Browser DevTools (F12)
   - Node.js console output
   - articles.json file content

3. **Test:**
   - Run: `node tools/generate.js`
   - Check: articles.json exists and valid JSON
   - Open: news.html dan inspect

---

## 📞 Contact & Support

- **Setup Issues:** SETUP-GUIDE.md
- **Runtime Issues:** IMPLEMENTATION-GUIDE.md 
- **Code Issues:** Check source comments
- **Browser Issues:** DevTools Console

---

## 📄 License

MIT License - Free to use dan modify

---

## ✨ Credits

Built with:
- Google Sheets API
- Node.js
- Bootstrap 4
- Vanilla JavaScript

---

**Happy Content Management! 🎉**

For detailed setup and implementation, refer to:
- [SETUP-GUIDE.md](SETUP-GUIDE.md) - Google Sheets API Setup
- [IMPLEMENTATION-GUIDE.md](IMPLEMENTATION-GUIDE.md) - Daily Workflow

Generated articles auto-update setiap kali run `node tools/generate.js`
Website auto-load dari articles.json dengan zero code changes!
