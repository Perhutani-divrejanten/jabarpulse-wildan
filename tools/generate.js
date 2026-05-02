#!/usr/bin/env node

/**
 * GOOGLE SHEETS ARTIKEL GENERATOR (via Google Apps Script Web App)
 * ================================================================
 * Fetch artikel dari Google Apps Script Web App, generate HTML, update articles.json
 * 
 * Usage: node tools/generate.js
 * 
 * Pastikan:
 * 1. tools/config.js sudah dikonfigurasi dengan WEB_APP_URL
 * 2. Google Apps Script Web App sudah deployed
 */

const fs = require('fs');
const path = require('path');
const config = require('./config');

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Format tanggal dari berbagai format ke format Indonesia
 */
function formatDateIndonesia(dateString) {
  if (!dateString) return 'Tanggal tidak diketahui';
  
  try {
    // Clean up date string - remove extra spaces
    dateString = dateString.trim().replace(/\s+/g, ' ');
    
    // Handle format: "2026 - 02 - 02" atau "2026-02-02" atau "2026/02/02"
    let date;
    
    if (dateString.includes('-') || dateString.includes('/')) {
      // Replace various separators with standard format
      const cleaned = dateString.replace(/\s+/g, '').replace(/\//g, '-');
      date = new Date(cleaned);
    } else {
      date = new Date(dateString);
    }
    
    // Check if valid date
    if (isNaN(date.getTime())) {
      return dateString; // Return original if can't parse
    }
    
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  } catch (e) {
    return dateString;
  }
}

/**
 * Auto-wrap plain text dengan <p> tags
 * Pisah dengan double newline atau multiple spaces
 */
function wrapContentWithParagraphs(text) {
  if (!text) return '';
  
  // Trim whitespace
  text = text.trim();
  
  // Split by double newline atau line break
  const paragraphs = text
    .split(/\n\n+|\r\n\r\n+/)
    .map(p => p.trim())
    .filter(p => p.length > 0);
  
  // Wrap each dalam <p> tags
  return paragraphs
    .map(p => `<p>${p}</p>`)
    .join('\n');
}

/**
 * Ambil file ID dari URL Google Drive
 */
function getGoogleDriveFileId(url) {
  if (!url) return null;
  const driveFileIdPatterns = [
    /\/file\/d\/([^\/\?&#]+)/,
    /[?&]id=([^&]+)/,
    /\/open\?id=([^&]+)/,
    /\/uc\?export=(?:download|view)&id=([^&]+)/,
  ];

  for (const pattern of driveFileIdPatterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * Proses image URL - support lokal, Google Drive, dan external
 */
function processImageUrl(imageUrl) {
  if (!imageUrl || imageUrl.trim() === '') {
    return '';
  }
  
  imageUrl = imageUrl.trim();

  if (imageUrl.includes('drive.google.com') || imageUrl.includes('docs.google.com')) {
    const fileId = getGoogleDriveFileId(imageUrl);
    if (fileId) {
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
    }
  }
  
  // Jika URL external (http/https), gunakan as-is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // Jika path lokal, tambah prefix img/
  if (!imageUrl.startsWith('img/')) {
    return `img/${imageUrl}`;
  }
  
  return imageUrl;
}

function getGoogleDriveImageFallback(url) {
  const fileId = getGoogleDriveFileId(url);
  if (!fileId) return url;
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}

/**
 * Get max article ID from existing articles.json
 */
function getMaxArticleId() {
  try {
    if (fs.existsSync(config.ARTICLES_JSON_PATH)) {
      const data = JSON.parse(fs.readFileSync(config.ARTICLES_JSON_PATH, 'utf-8'));
      if (data.articles && Array.isArray(data.articles)) {
        const ids = data.articles.map(a => a.id).filter(id => typeof id === 'number');
        return ids.length > 0 ? Math.max(...ids) : 90; // Start from 91 if no articles
      }
    }
  } catch (err) {
    log(`Warning: Could not read existing articles.json: ${err.message}`, 'warn');
  }
  return 90; // Default start from 91
}

/**
 * Generate HTML article dari template
 */
function generateArticleHTML(article, articleNumber) {
  const templatePath = config.TEMPLATE_PATH;
  
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template tidak ditemukan: ${templatePath}`);
  }
  
  let html = fs.readFileSync(templatePath, 'utf-8');
  
  // Proses content
  let content = article.content || '';
  if (config.AUTO_WRAP_PARAGRAPHS) {
    content = wrapContentWithParagraphs(content);
  }
  
  // Proses image
  let imageHtml = '';
  if (article.image) {
    const imageUrl = processImageUrl(article.image);
    // Gunakan relative path untuk artikel di subfolder (../)
    const relativePath = imageUrl.startsWith('http') ? imageUrl : `../${imageUrl}`;
    const fallbackUrl = imageUrl.includes('drive.google.com/thumbnail?id=') ? getGoogleDriveImageFallback(imageUrl) : '';
    imageHtml = `<div class="sn-img">\n                <img src="${relativePath}" alt="${article.title}"${fallbackUrl ? ` onerror="this.onerror=null;this.src='${fallbackUrl}'"` : ''}>\n                </div>`;
  }
  
  // Buat category badge
  const categoryBadge = article.category 
    ? `<span class="article-category">${article.category}</span>`
    : '';
  
  // Replace template variables
  html = html
    .replace(/{{TITLE}}/g, article.title || 'Artikel Tanpa Judul')
    .replace(/{{CONTENT}}/g, content)
    .replace(/{{IMAGE_HTML}}/g, imageHtml)
    .replace(/{{CATEGORY_BADGE}}/g, categoryBadge)
    .replace(/{{DATE}}/g, article.date || '')
    .replace(/{{DATE_FORMATTED}}/g, formatDateIndonesia(article.date))
    .replace(/{{AUTHOR}}/g, article.author || 'Redaksi')
    .replace(/{{EXCERPT}}/g, article.excerpt || '')
    .replace(/{{ARTICLE_NUMBER}}/g, articleNumber);
  
  return html;
}

/**
 * Generate filename dari article number
 */
function generateFileName(articleNumber) {
  const suffix = config.ARTICLE_SUFFIX || '';
  const fileName = `${config.ARTICLE_PREFIX}${articleNumber}${suffix}.html`;
  return path.join(config.ARTICLE_OUTPUT_DIR, fileName);
}

/**
 * Parse row data dari Google Sheets atau Web App
 * Handle array format [title, content, ...] atau object format {title, content, ...}
 */
function normalizeCategory(category) {
  if (!category) return category;
  // Standardize category spellings
  const normalized = category.trim();
  if (normalized === 'SOsial') {
    return 'Sosial';
  }
  return normalized;
}

function parseArticleRow(row, index, startId = 91) {
  // Jika row adalah object (dari Web App)
  if (typeof row === 'object' && !Array.isArray(row)) {
    return {
      id: row.id || (startId + index),
      title: (row.title || '').trim(),
      content: (row.content || row.isi || row.deskripsi || '').trim(),
      category: normalizeCategory(row.category || row.kategori || ''),
      image: (row.image || row.gambar || '').trim(),
      date: (row.date || row.tanggal || '').trim(),
      author: (row.author || row.penulis || '').trim(),
      excerpt: (row.excerpt || row.ringkasan || '').trim(),
    };
  }
  
  // Jika row adalah array (dari Google Sheets)
  return {
    id: index + startId,
    title: (row[0] || '').trim(),
    content: (row[1] || '').trim(),
    category: normalizeCategory(row[2] || ''),
    image: (row[3] || '').trim(),
    date: (row[4] || '').trim(),
    author: (row[5] || '').trim(),
    excerpt: (row[6] || '').trim(),
  };
}

/**
 * Validasi artikel punya required fields
 */
function isValidArticle(article) {
  return article.title && article.content;
}

/**
 * Log dengan formatting
 */
function log(message, type = 'info') {
  if (!config.VERBOSE && type === 'info') return;
  
  const icons = {
    success: '✓',
    error: '✗',
    warn: '⚠',
    info: '•'
  };
  
  console.log(`${icons[type] || '•'} ${message}`);
}

/**
 * Highlight error message
 */
function logError(message) {
  console.error(`\n❌ ERROR: ${message}\n`);
}

// =============================================================================
// MAIN GENERATOR
// =============================================================================

async function generateArticles() {
  try {
    log('Starting Google Sheets Article Generator (via Web App)...', 'info');
    log(`Web App URL: ${config.WEB_APP_URL}`, 'info');
    
    // ========================================================================
    // STEP 1: Fetch data dari Google Apps Script Web App
    // ========================================================================
    log('Fetching articles from Web App...', 'info');
    
    const response = await fetch(config.WEB_APP_URL);
    
    if (!response.ok) {
      throw new Error(`Web App returned status ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Handle berbeda struktur response
    let rows = [];
    if (Array.isArray(data)) {
      // Jika response langsung array articles
      rows = data;
    } else if (data.articles && Array.isArray(data.articles)) {
      // Jika response punya property articles
      rows = data.articles;
    } else if (data.data && Array.isArray(data.data)) {
      // Jika response punya property data
      rows = data.data;
    } else if (data.result && Array.isArray(data.result)) {
      // Jika response punya property result
      rows = data.result;
    } else if (data.items && Array.isArray(data.items)) {
      // Jika response punya property items
      rows = data.items;
    } else {
      // Try to find any array in the response
      const allValues = Object.values(data);
      const arrayFound = allValues.find(v => Array.isArray(v));
      if (arrayFound) {
        rows = arrayFound;
      } else {
        log('\n📊 Debug Info - Web App Response:', 'info');
        log(JSON.stringify(data).substring(0, 500), 'info');
        throw new Error('Unexpected Web App response format. Expected array or {articles/data/result/items: [...]}');
      }
    }
    
    if (rows.length === 0) {
      throw new Error('No articles found in Web App response.');
    }
    
    log(`Retrieved ${rows.length} articles from Web App`, 'success');
    
    // ========================================================================
    // STEP 2: Parse dan validate articles
    // ========================================================================
    log('Parsing and validating articles...', 'info');
    
    const maxId = getMaxArticleId();
    const startId = maxId + 1;
    
    const articles = rows
      .map((row, index) => parseArticleRow(row, index, startId))
      .filter(article => {
        const valid = isValidArticle(article);
        if (!valid) {
          log(`Skipped row ${article.id}: Missing required fields`, 'warn');
        }
        return valid;
      })
      .slice(0, config.ARTICLES_TO_GENERATE);
    
    if (articles.length === 0) {
      throw new Error('No valid articles found. Check Google Sheets data format.');
    }
    
    log(`Validated ${articles.length} articles`, 'success');
    
    // ========================================================================
    // STEP 4: Generate HTML files
    // ========================================================================
    log('Generating HTML article files...', 'info');
    
    const generatedFiles = [];
    articles.forEach((article, index) => {
      const articleNumber = index + 1;
      const fileName = generateFileName(articleNumber);
      
      try {
        const html = generateArticleHTML(article, articleNumber);
        fs.writeFileSync(fileName, html, 'utf-8');
        generatedFiles.push({
          path: fileName,
          title: article.title,
          number: articleNumber,
        });
        log(`Generated: ${article.title.substring(0, 50)}...`, 'success');
      } catch (err) {
        log(`Failed to generate article ${articleNumber}: ${err.message}`, 'error');
      }
    });
    
    log(`Generated ${generatedFiles.length} HTML files`, 'success');
    
    // ========================================================================
    // STEP 5: Generate articles.json
    // ========================================================================
    log('Generating articles.json...', 'info');
    
    const articlesJson = {
      version: '1.0',
      generatedAt: new Date().toISOString(),
      totalArticles: articles.length,
      articles: articles.map((article, index) => ({
        id: article.id, // Use the id already set in parseArticleRow
        title: article.title,
        excerpt: article.excerpt || article.content.substring(0, config.EXTRACT_EXCERPT_LENGTH) + '...',
        content: article.content,
        category: article.category,
        image: processImageUrl(article.image),
        date: article.date,
        author: article.author,
        dateFormatted: formatDateIndonesia(article.date),
        url: `${config.ARTICLE_PREFIX}${index + 1}${config.ARTICLE_SUFFIX || ''}.html`,
      })),
    };
    
    fs.writeFileSync(
      config.ARTICLES_JSON_PATH,
      JSON.stringify(articlesJson, null, 2),
      'utf-8'
    );
    
    log(`Generated articles.json with ${articlesJson.totalArticles} articles`, 'success');
    
    // ========================================================================
    // STEP 6: Summary
    // ========================================================================
    console.log('\n' + '='.repeat(60));
    console.log('✅ GENERATION COMPLETED SUCCESSFULLY!');
    console.log('='.repeat(60));
    console.log(`\n📊 Statistics:`);
    console.log(`   • Total articles: ${articles.length}`);
    console.log(`   • HTML files generated: ${generatedFiles.length}`);
    console.log(`   • articles.json created: ${config.ARTICLES_JSON_PATH}`);
    console.log(`\n📁 Output Files:`);
    console.log(`   • Articles: ${config.ARTICLE_PREFIX}1.html - ${config.ARTICLE_PREFIX}${articles.length}.html`);
    console.log(`   • Database: ${config.ARTICLES_JSON_PATH}`);
    console.log(`\n🚀 Next Steps:`);
    console.log(`   1. Check generated files: ${config.ARTICLE_OUTPUT_DIR}`);
    console.log(`   2. Verify articles.json is accessible from website`);
    console.log(`   3. Test news.html loads articles dynamically`);
    console.log('\n💡 Tips:');
    console.log(`   • Re-run this script anytime you add/edit articles in Google Sheets`);
    console.log(`   • Use relative paths for local images (img/filename.jpg)`);
    console.log(`   • Use full URL for external images (https://...)`);
    console.log('\n');
    
  } catch (error) {
    logError(error.message);
    console.error('\nDebug Info:');
    console.error(error);
    process.exit(1);
  }
}

// =============================================================================
// RUN GENERATOR
// =============================================================================

// Check jika config sudah dikonfigurasi
if (!config.WEB_APP_URL || config.WEB_APP_URL.includes('YOUR_')) {
  logError('Web App URL belum dikonfigurasi!');
  console.log('📝 Steps:');
  console.log('1. Buka: tools/config.js');
  console.log('2. Set WEB_APP_URL ke Google Apps Script Web App URL Anda:');
  console.log('   WEB_APP_URL: "https://script.google.com/macros/s/YOUR_URL/exec"');
  process.exit(1);
}

// Run generator
generateArticles();
