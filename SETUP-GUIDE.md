# Panduan Setup Google Sheets + Node.js Generator

## 📋 Daftar Isi
1. [Setup Google Sheets API](#1-setup-google-sheets-api)
2. [Setup Node.js Environment](#2-setup-nodejs-environment)
3. [Konfigurasi Credentials](#3-konfigurasi-credentials)
4. [Menjalankan Generator](#4-menjalankan-generator)
5. [Troubleshooting](#5-troubleshooting)

---

## 1. Setup Google Sheets API

### Step 1: Buat Google Cloud Project
1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Klik dropdown "Select a Project" → "New Project"
3. Isi nama project: `Warta-Jabar-News`
4. Klik "Create"

### Step 2: Enable Google Sheets API
1. Di menu samping, cari "APIs & Services" → "Library"
2. Cari "Google Sheets API"
3. Klik hasil search → Klik "ENABLE"
4. Tunggu sampai selesai

### Step 3: Buat Service Account
1. Di "APIs & Services", pilih "Credentials"
2. Klik "Create Credentials" → "Service Account"
3. Isi nama: `warta-jabar-generator`
4. Klik "Create and Continue"
5. Skip optional steps, klik "Done"

### Step 4: Buat JSON Key
1. Di halaman Service Accounts, klik service account yang baru dibuat
2. Buka tab "Keys"
3. Klik "Add Key" → "Create New Key"
4. Pilih "JSON" → Klik "Create"
5. File JSON akan otomatis download (simpan ke folder `tools/`)

### Step 5: Siapkan Google Sheets
1. Buat spreadsheet baru di [Google Sheets](https://sheets.google.com)
2. Namai: `Warta Jabar Articles`
3. Buat kolom dengan header:
   - A: `title`
   - B: `content`
   - C: `category`
   - D: `image`
   - E: `date`
   - F: `author`
   - G: `excerpt`

**Contoh isi:**
```
title                   | content                              | category    | image                  | date       | author
Pohon Langka KaliSOS   | Menemukan spesies pohon langka...    | Konservasi  | img/pohon-langka.jpg  | 2026-02-13 | Adi Suryanto
```

4. Share spreadsheet dengan email service account (cari di JSON key):
   - Klik "Share"
   - Copy email dari JSON key file
   - Paste dan "Share"

5. Copy **Spreadsheet ID** dari URL:
   ```
   https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
   ```

---

## 2. Setup Node.js Environment

### Instalasi Node.js
1. Download dari [nodejs.org](https://nodejs.org/) (LTS version)
2. Install dengan default settings

### Verifikasi Instalasi
Buka terminal/command prompt dan jalankan:
```bash
node --version
npm --version
```

---

## 3. Konfigurasi Credentials

### Step 1: Pindahkan JSON Key
1. Download JSON key dari Google Cloud Console
2. Copy ke folder: `tools/credentials.json`

### Step 2: Konfigurasi tools/config.js
File sudah otomatis dibuat. Update dengan data Anda:

```javascript
module.exports = {
  // Dari JSON key file Anda
  GOOGLE_CREDENTIALS: {
    type: "service_account",
    project_id: "...",
    private_key_id: "...",
    private_key: "-----BEGIN PRIVATE KEY-----\n...",
    client_email: "...",
    client_id: "...",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "...",
    client_x509_cert_url: "..."
  },
  
  // Spreadsheet ID dari URL Google Sheets Anda
  SPREADSHEET_ID: "1234567890abcdefghijklmnop",
  
  // Range tempat data Anda
  RANGE: "Sheet1!A2:G1000",
  
  // Konfigurasi article page
  ARTICLE_OUTPUT_DIR: "./",
  ARTICLES_JSON_PATH: "./articles.json",
  
  // Untuk image
  IMAGE_BASE_URL: "img/",  // atau URL Cloudinary
  CLOUDINARY_URL: ""  // Opsional: https://res.cloudinary.com/your-account/image/upload/
};
```

---

## 4. Menjalankan Generator

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Jalankan Generator
```bash
node tools/generate.js
```

### Output yang Diharapkan
```
✓ Berhasil fetch artikel dari Google Sheets
✓ Generated 5 article files
✓ Updated articles.json
✓ Total: 5 artikel
```

### Hasil di Folder
- Baru generate file: `berita1.html`, `berita2.html`, dst
- File `articles.json` terupdate otomatis

---

## 5. Troubleshooting

### Error: "Invalid credentials"
**Solusi:**
- Pastikan `credentials.json` di folder `tools/`
- Cek JSON key dari Google Cloud Console (masih valid?)
- Coba download key baru

### Error: "Spreadsheet not found"
**Solusi:**
- Cek SPREADSHEET_ID di config.js
- Pastikan email service account punya akses (sudah di-share)
- Cek Range: `Sheet1!A2:G1000` sesuai dengan sheet Anda

### Error: "Empty data from Google Sheets"
**Solusi:**
- Pastikan data dimulai dari row 2 (row 1 adalah header)
- Cek kolom: title, content, category, image, date, author
- Jangan ada baris kosong di tengah data

### Website tidak load articles.json
**Solusi:**
- Jalankan dari server (tidak bisa buka file:// langsung)
- Gunakan Live Server di VS Code atau python server
- Chrome DevTools → Network → cek 404 error

### Image tidak tampil
**Solusi:**
- Cek path image di articles.json
- Jika lokal: `img/filename.jpg` (folder img harus ada)
- Jika external: pastikan URL Cloudinary benar

---

## 📝 Workflow Setiap Hari

1. **Edit artikel di Google Sheets**
   - Buka spreadsheet
   - Tambah/edit row dengan data artikel

2. **Generate ke HTML**
   ```bash
   node tools/generate.js
   ```

3. **Push ke website**
   - Upload file ke server
   - Browser auto-load dari articles.json

---

## 🔧 Customization Tips

### Ubah jumlah artikel per halaman
Edit `js/load-news.js`:
```javascript
const ARTICLES_PER_PAGE = 10;  // Ubah ke 12, 15, dst
```

### Ubah kategori
Tambah kategori baru di Google Sheets → articles.json auto-update

### Filter by date range
Edit `js/load-news.js` function `filterArticles()`

### Custom CSS article page
Edit `tools/template.html` → section `<style>`

---

## 📂 File Structure
```
warta-jabar/
├── articles.json          (auto-generated)
├── berita1.html          (auto-generated & old articles)
├── berita2.html
├── ...
├── news.html             (modified - load dinamis)
├── contact.html
├── index.html
├── css/
│   └── style.css
├── img/                  (article images)
│   ├── pohon-langka.jpg
│   └── ...
├── js/
│   ├── main.js
│   ├── load-news.js      (NEW - load articles.json)
│   ├── artikel-loader.js (existing)
│   └── auth.js
└── tools/               (NEW)
    ├── generate.js      (main script)
    ├── config.js        (Google API config)
    ├── template.html    (article template)
    └── credentials.json (private key - jangan push ke git!)
```

---

## ✅ Checklist Setup
- [ ] Google Cloud Project dibuat
- [ ] Google Sheets API enabled
- [ ] Service Account dibuat & JSON key downloaded
- [ ] Google Sheets siap dengan kolom yang benar
- [ ] Spreadsheet ID tercopy ke config.js
- [ ] Service account email di-share untuk spreadsheet
- [ ] credentials.json ada di folder tools/
- [ ] npm install sudah dijalankan
- [ ] First run: `node tools/generate.js` berhasil
- [ ] articles.json terbuat
- [ ] Website bisa load articles dinamis

Selamat! Setup selesai 🎉
