/**
 * KONFIGURASI ARTIKEL GENERATOR (via Google Apps Script Web App)
 * ============================================================
 * Ubah nilai sesuai dengan setup Anda
 */

module.exports = {
  // ============================================================
  // WEB APP URL - Google Apps Script Web App deployment URL
  // ============================================================
  WEB_APP_URL: "https://script.google.com/macros/s/AKfycbwm07dMCmtW6NVJTBooQlFD9IoKNgDJtj6HDFICr8WMZAr5dMeQsnOgpDPgQErp8EqOGQ/exec",
  // Web App harus return JSON: array of articles [{title, content, ...}, {...}, ...]

  // ============================================================
  // PATH KONFIGURASI - Jangan perlu edit, kecuali struktur folder berbeda
  // ============================================================
  ARTICLE_OUTPUT_DIR: "./",              // Folder output HTML artikel
  ARTICLES_JSON_PATH: "./articles.json",  // Path articles.json
  TEMPLATE_PATH: "./tools/template.html", // Path template HTML

  // ============================================================
  // IMAGE CONFIGURATION
  // ============================================================
  IMAGE_BASE_URL: "img/",  // Prefix untuk local images (img/filename.jpg)
  // Jika pake Cloudinary, enable ini:
  USE_CLOUDINARY: false,
  CLOUDINARY_ACCOUNT: "your-account",

  // ============================================================
  // ARTIKEL KONFIGURASI
  // ============================================================
  ARTICLE_PREFIX: "berita",  // Prefix nama file: berita1-f.html, berita2-f.html, dst
  ARTICLE_SUFFIX: "-f",       // Suffix untuk file generated (hindari nabrak dengan manual files)
  ARTICLES_TO_GENERATE: 999999,  // Max artikel yang di-generate (safety limit)

  // ============================================================
  // CONTENT PROCESSING
  // ============================================================
  AUTO_WRAP_PARAGRAPHS: true,  // Auto-wrap plain text dengan <p> tags
  EXTRACT_EXCERPT_LENGTH: 150,  // Karakter pertama jadi excerpt jika tidak ada

  // ============================================================
  // LOGGING
  // ============================================================
  VERBOSE: true,  // true = detailed logs, false = minimal output
};

