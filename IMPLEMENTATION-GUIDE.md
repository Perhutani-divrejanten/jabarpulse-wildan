# Panduan Lengkap Integrasi Google Sheets + Website Berita

## 📚 Daftar Isi
1. [Arsitektur Sistem](#arsitektur-sistem)
2. [Setup Awal](#setup-awal)
3. [Workflow Harian](#workflow-harian)
4. [Troubleshooting](#troubleshooting)
5. [Advanced Customization](#advanced-customization)

---

## 🏗️ Arsitektur Sistem

```
Google Sheets (Data Source)
        ↓
   generate.js (Node.js)
        ↓
   articles.json (JSON Database)
        ↓
   Frontend JavaScript
        ↓
   Website (Dynamic/Paginated/Searchable)
```

### Files yang Digunakan:

| File | Fungsi | Dibuat Otomatis? |
|------|--------|-----------------|
| `tools/config.js` | Google API config | Manual |
| `tools/generate.js` | Article generator | Manual |
| `tools/template.html` | Article page template | Manual |
| `tools/credentials.json` | Google auth key | Manual (dari Google Cloud) |
| `articles.json` | Article database | ✅ Auto-generated |
| `berita1.html` - `berita90.html` | Article pages | ✅ Auto-generated |
| `js/load-news.js` | Frontend loader | Manual | `news.html` | Homepage artikel | Modified |

---

## ⚙️ Setup Awal

### Prerequisite
- Node.js v12+ (install dari nodejs.org)
- Google Cloud Project dengan Google Sheets API enabled
- Google Sheets untuk data artikel

### Step 1: Konfigurasi Google Sheets API
**Lihat:** [SETUP-GUIDE.md](SETUP-GUIDE.md) Bagian "Setup Google Sheets API"

Hasil: Anda punya `credentials.json` di folder `tools/`

### Step 2: Buat Google Sheets dengan Kolom
1. Buka [Google Sheets](https://sheets.google.com)
2. Buat spreadsheet baru: "Warta Jabar Articles"
3. Buat kolom header di baris 1:
   - **A:** title
   - **B:** content  
   - **C:** category
   - **D:** image
   - **E:** date
   - **F:** author
   - **G:** excerpt (optional)

**Contoh baris data (baris 2):**
```
Pohon Langka di Jabar | Berita menggiurkan tentang penemuan spesies langka | Konservasi | img/pohon-1.jpg | 2026-02-13 | Adi Suryanto | Ditemukan spesies...
```

4. **PENTING:** Share spreadsheet dengan email service account dari JSON key

### Step 3: Konfigurasi credentials

1. Copy isi `credentials.json` dari Google Cloud
2. Update `tools/config.js`:

```javascript
// tools/config.js
module.exports = {
  GOOGLE_CREDENTIALS: {
    type: "service_account",
    project_id: "...", // Dari JSON key
    private_key: "...",
    client_email: "...",
    // ... sisanya
  },
  
  SPREADSHEET_ID: "123abc...",  // Dari URL Google Sheets
  RANGE: "Sheet1!A2:G1000",
  // ... config lainnya
};
```

### Step 4: Install Dependencies
```bash
cd "d:/Magang/Perhutani/Warta Jabar"
npm install
```

### Step 5: Test Generator
```bash
node tools/generate.js
```

**Output yang diharapkan:**
```
✓ Berhasil fetch artikel dari Google Sheets
✓ Generated 5 article files
✓ Updated articles.json
✓ Total: 5 artikel
```

---

## 📅 Workflow Harian

### Tambah/Edit Artikel di Google Sheets

1. Buka Google Sheets "Warta Jabar Articles"
2. Tambah baris baru atau edit baris existing
3. Kolom yang wajib: `title`, `content`, `category`
4. Kolom image: gunakan path lokal (`img/filename.jpg`) atau URL external
5. Kolom date: gunakan format `YYYY-MM-DD` (2026-02-13)

**Contoh:**
```
Berita Konservasi      | Semua pohon di kawasan... | Konservasi | img/tree.jpg    | 2026-02-13 | Adi   | 
Pelatihan Lingkungan   | Kategori kerja sama...    | Pelatihan  | img/training.jpg | 2026-02-12 | Budi  |
```

### Generate ke HTML

```bash
cd "d:/Magang/Perhutani/Warta Jabar"
node tools/generate.js
```

### Hasil:
- ✅ berita1.html, berita2.html, ... (auto-update)
- ✅ articles.json (update dengan data terbaru)
- ✅ URL artikel berubah menjadi URL di config

### Cek di Website

1. Buka **news.html** di browser
2. Artikel auto-load dari `articles.json`
3. Pagination berfungsi (10 artikel per halaman)
4. Search bekerja
5. Category filter bekerja

---

## 🔍 Struktur articles.json

File ini auto-generate oleh `generate.js`. Format:

```json
{
  "version": "1.0",
  "generatedAt": "2026-02-13T10:30:00.000Z",
  "totalArticles": 90,
  "articles": [
    {
      "id": 1,
      "title": "Perhutani KPH Bandung Selatan...",
      "excerpt": "Berita tentang program PPL siswa SMA...",
      "content": "Perhutani KPH Bandung Selatan dengan bangga menerima...",
      "category": "Pendidikan",
      "image": "img/berita1.jpg",
      "date": "2026-02-13",
      "author": "Adi Suryanto",
      "dateFormatted": "13 Februari 2026",
      "url": "berita1.html"
    },
    {
      "id": 2,
      "title": "...",
      ...
    }
  ]
}
```

Frontend (`load-news.js`) membaca JSON ini dan render dynamic:
- Article cards dengan image, title, excerpt
- Category badges (clickable untuk filter)
- Pagination buttons
- Search functionality

---

## 🐛 Troubleshooting

### Problem: "Invalid credentials"
**Solusi:**
```bash
# 1. Cek JSON key path
ls -la tools/credentials.json

# 2. Download key baru dari Google Cloud Console
# Settings → Service Accounts → Click account → Keys → Create New Key → JSON

# 3. Copy seluruh isi ke tools/config.js
```

### Problem: "Spreadsheet not found"
**Solusi:**
```javascript
// Di config.js, pastikan:
SPREADSHEET_ID: "1abcXYZ..."  // Dari URL: /spreadsheets/d/[INI]/edit

// Juga pastikan:
RANGE: "Sheet1!A2:G1000"  // Sesuai dengan sheet name Anda

// Pastikan service account email sudah di-share ke spreadsheet
```

### Problem: Empty/No Data After Generator
**Solusi:**
```
1. Data harus dimulai dari ROW 2 (row 1 adalah header)
2. Jangan ada baris kosong di tengah-tengah
3. Kolom wajib harus ada: title, content
4. Cek RANGE di config.js - pastikan cakup semua data
```

### Problem: Website tidak load articles.json
**Solusi:**
```
1. articles.json HARUS ada di root folder website
2. JANGAN buka file:// langsung - gunakan HTTP server:
   - Option A: VS Code Live Server extension
   - Option B: python -m http.server 8000
   - Option C: node http-server
3. Check browser DevTools (F12) → Network → articles.json
   - Jika 404: file belum di-generate atau path salah
4. Check browser console untuk JavaScript errors
```

### Problem: Gambar tidak tampil
**Solusi:**
```javascript
// Di Google Sheets, gunakan format path yang benar:

// ❌ SALAH:
Picture.jpg  // Path tidak jelas

// ✅ BENAR (Lokal):
img/foto1.jpg  // Path relatif dari root

// ✅ BENAR (External):
https://res.cloudinary.com/account/image/upload/v1234/foto.jpg
```

### Problem: Pagination tidak bekerja
**Solusi:**
```javascript
// Di tools/config.js:
ARTICLES_PER_PAGE: 10,  // Bisa ubah ke 12, 15, etc

// Atau di js/load-news.js:
const ARTICLES_PER_PAGE = 10;  // Pastikan satu nilai

// Cek browser console untuk error
```

### Problem: Search tidak bekerja
**Solusi:**
```html
<!-- Di news.html, pastikan:
     Input punya ID yang benar -->
<input type="text" id="search-input" placeholder="Cari berita...">

<!-- Load js/load-news.js SEBELUM closing </body> -->
<script src="js/load-news.js"></script>
```

---

## 🚀 Advanced Customization

### Ubah Jumlah Artikel Per Halaman

Edit `js/load-news.js`:

```javascript
const NEWS_CONFIG = {
  JSON_PATH: './articles.json',
  ARTICLES_PER_PAGE: 15,  // Ubah ini (dari 10 ke 15)
  LAZY_LOAD_IMAGES: true,
  CACHE_DURATION: 3600000,
};
```

### Tambah Field Baru ke Spreadsheet

1. **Google Sheets:** Tambah kolom baru (mis. kolom H: "featured")

2. **Generate.js:** Update RANGE:
```javascript
RANGE: "Sheet1!A2:H1000",  // Tambah H
```

3. **Parse:** Update parseArticleRow() di generate.js:
```javascript
function parseArticleRow(row, index) {
  return {
    // ... existing fields
    featured: (row[7] || '').trim(),  // Kolom H = row[7]
  };
}
```

4. **Load-news.js:** Update card template:
```javascript
function createArticleCard(article) {
  const featured = article.featured ? '⭐ Featured' : '';
  return `${featured}...`;
}
```

### Custom Styling Article Cards

Edit `css/style.css` atau add inline di `load-news.js` card template:

```javascript
function createArticleCard(article) {
  return `
    <div class="col-md-6 col-lg-4 mb-4">
      <div class="card h-100 shadow-sm" style="border-radius: 12px;">
        <!-- Your custom styling -->
      </div>
    </div>
  `;
}
```

### Filter Berdasarkan Kategori Spesifik

Edit `load-news.js`:

```javascript
function filterByCategory(category) {
  // Existing code...
  
  // Tambah: Hanya show kategori tertentu
  const allowedCategories = ['Konservasi', 'Pelatihan'];
  if (!allowedCategories.includes(category) && category !== 'semua') {
    return;  // Skip
  }
}
```

### Integrate dengan Email Newsletter

Setiap kali run `generate.js`, kirim email ke subscriber:

```javascript
// Di tools/generate.js, setelah update articles.json:
const nodemailer = require('nodemailer');

async function sendNewsletterEmail(articles) {
  // Setup SMTP
  // Send email dengan latest articles
}
```

---

## 📊 Performance Tips

### Cache Articles di Browser
```javascript
// js/load-news.js sudah ada:
CACHE_DURATION: 3600000,  // Cache 1 jam
```

### Optimize Images
- Gunakan JPEG/WebP untuk foto
- Compress dengan [TinyPNG](https://tinypng.com/)
- Resize ke 600px width (lebih kecil)
- Upload ke CDN (Cloudinary)

### Lazy Load Images
```javascript
// js/load-news.js sudah enable:
LAZY_LOAD_IMAGES: true,
```

---

## 🔗 References

- **Google Sheets API Docs:** https://developers.google.com/sheets/api/
- **Cloud Console:** https://console.cloud.google.com/
- **Bootstrap 4 Docs:** https://getbootstrap.com/docs/4.5/
- **Node.js Docs:** https://nodejs.org/docs/

---

## ✅ Checklist Implementasi

- [ ] Google Cloud Project dibuat
- [ ] Google Sheets API enabled
- [ ] Service Account dibuat dan JSON key downloaded
- [ ] credentials.json dicopy ke tools/
- [ ] Google Sheets dibuat dengan kolom yang benar
- [ ] Service account email di-share ke spreadsheet
- [ ] config.js diupdate dengan credentials  
- [ ] config.js diupdate dengan SPREADSHEET_ID
- [ ] npm install dijalankan
- [ ] First run: `node tools/generate.js` successful
- [ ] articles.json terbuat dan valid
- [ ] news.html bisa load articles dinamis
- [ ] Category filter berfungsi
- [ ] Search berfungsi
- [ ] Pagination berfungsi
- [ ] Images ditampilkan dengan benar

---

## 📞 Tips Debugging

Jika ada masalah, cek **3 hal** ini:

1. **Check Console Errors:**
   ```
   Browser DevTools (F12) → Console → Cek red errors
   ```

2. **Check Network Requests:**
   ```
   DevTools → Network → articles.json
   Status 200? Content benar?
   ```

3. **Check Config Values:**
   ```bash
   node -e "console.log(require('./tools/config.js'))"
   ```

---

**Selamat menggunakan! Jika ada pertanyaan, edit config.js dan test lagi.** 🎉
