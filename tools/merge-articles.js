#!/usr/bin/env node

/**
 * EXTRACT & MERGE BERITA MANUAL KE ARTICLES.JSON
 * ===============================================
 * Script untuk extract data dari berita1-90.html
 * dan merge dengan articles.json (Web App data)
 */

const fs = require('fs');
const path = require('path');

/**
 * Extract article data dari berita{N}.html
 */
function extractArticleFromHTML(filePath) {
  try {
    const html = fs.readFileSync(filePath, 'utf-8');
    
    // Extract title dari <h1 class="article-title"> atau <title> tag
    let title = '';
    
    // Try <h1 class="article-title">
    let titleMatch = html.match(/<h1[^>]*class="article-title"[^>]*>([\s\S]*?)<\/h1>/);
    if (titleMatch) {
      title = titleMatch[1].replace(/<[^>]*>/g, '').trim();
    }
    
    // Fallback to <title> tag if not found
    if (!title) {
      titleMatch = html.match(/<title>([\s\S]*?)<\/title>/);
      if (titleMatch) {
        // Extract only the main title part (before " - Warta Jabar")
        title = titleMatch[1]
          .replace(/<[^>]*>/g, '')
          .replace(/\s*-\s*Warta\s+Jabar.*$/i, '')
          .trim();
      }
    }
    
    // Extract category dari <span class="article-category">
    let category = 'Berita';
    const categoryMatch = html.match(/<span[^>]*class="article-category"[^>]*>([\s\S]*?)<\/span>/);
    if (categoryMatch) {
      category = categoryMatch[1].replace(/<[^>]*>/g, '').trim() || 'Berita';
    }
    
    // Extract date dari <time> tag
    let dateFormatted = '';
    const timeMatch = html.match(/<time[^>]*>([\s\S]*?)<\/time>/);
    if (timeMatch) {
      const timeText = timeMatch[1].replace(/<[^>]*>/g, '').trim();
      dateFormatted = timeText;
    }
    
    // Extract image dari <img class="article-image">
    let image = '';
    const imageMatch = html.match(/<img[^>]*class="article-image"[^>]*src="([^"]*)"[^>]*>/);
    if (imageMatch) {
      image = imageMatch[1].trim();
    }
    
    // Extract content dari all <p> tags dalam <article> atau <main>
    let content = '';
    const articleMatch = html.match(/<article>([\s\S]*?)<\/article>/);
    const mainContent = articleMatch ? articleMatch[1] : html;
    
    const pTags = mainContent.match(/<p>([\s\S]*?)<\/p>/g) || [];
    content = pTags
      .map(p => {
        // Remove HTML tags but keep text
        return p.replace(/<[^>]*>/g, '').trim();
      })
      .filter(p => p && p.length > 10) // Filter out very short paragraphs
      .join('\n\n');
    
    return {
      title: title || 'Tanpa Judul',
      category: category,
      dateFormatted: dateFormatted || '',
      image: image || '',
      content: content || 'Konten tidak dapat diektrak',
    };
  } catch (err) {
    console.error(`❌ Error reading ${filePath}: ${err.message}`);
    return null;
  }
}

/**
 * Convert formatted date to YYYY-MM-DD
 */
function convertDateFormat(formattedDate) {
  // Format: "30 Januari 2026"
  const months = {
    'januari': '01', 'februari': '02', 'maret': '03', 'april': '04',
    'mei': '05', 'juni': '06', 'juli': '07', 'agustus': '08',
    'september': '09', 'oktober': '10', 'november': '11', 'desember': '12'
  };
  
  const match = formattedDate.match(/(\d{1,2})\s+(\w+)\s+(\d{4})/i);
  if (match) {
    const day = match[1].padStart(2, '0');
    const month = months[match[2].toLowerCase()];
    const year = match[3];
    return month ? `${year}-${month}-${day}` : '';
  }
  return '';
}

/**
 * Main function
 */
async function mergeArticles() {
  try {
    console.log('🔍 Scanning berita files...\n');
    
    // Load existing articles.json
    const articlesPath = './articles.json';
    let existingData = { articles: [] };
    
    if (fs.existsSync(articlesPath)) {
      const fileContent = fs.readFileSync(articlesPath, 'utf-8');
      existingData = JSON.parse(fileContent);
    }
    
    console.log(`✓ Found ${existingData.articles.length} articles from Web App\n`);
    
    // Extract data dari berita1-90.html
    const manualArticles = [];
    for (let i = 1; i <= 90; i++) {
      const filePath = `./berita${i}.html`;
      
      if (fs.existsSync(filePath)) {
        const data = extractArticleFromHTML(filePath);
        
        if (data && data.title && data.title !== 'Tanpa Judul') {
          const article = {
            id: existingData.articles.length + manualArticles.length + 1,
            title: data.title,
            excerpt: data.content.substring(0, 150) + '...',
            content: data.content,
            category: data.category,
            image: data.image.startsWith('http') ? data.image : `../${data.image}`,
            date: convertDateFormat(data.dateFormatted) || new Date().toISOString().split('T')[0],
            author: 'Redaksi',
            dateFormatted: data.dateFormatted,
            url: `berita${i}.html`
          };
          
          manualArticles.push(article);
          const titlePreview = data.title.substring(0, 60);
          console.log(`✓ [${i}] ${titlePreview}${data.title.length > 60 ? '...' : ''}`);
        }
      }
    }
    
    console.log(`\n✓ Extracted ${manualArticles.length} articles from berita files\n`);
    
    // Merge Web App + Manual articles
    const allArticles = [
      ...existingData.articles,
      ...manualArticles
    ];
    
    // Renumber IDs
    allArticles.forEach((article, index) => {
      article.id = index + 1;
      article.url = `berita${index + 1}.html`;
    });
    
    // Update articles.json
    const finalData = {
      version: '1.0',
      generatedAt: new Date().toISOString(),
      totalArticles: allArticles.length,
      articles: allArticles
    };
    
    fs.writeFileSync(articlesPath, JSON.stringify(finalData, null, 2), 'utf-8');
    
    console.log('============================================================');
    console.log('✅ MERGE COMPLETED SUCCESSFULLY!');
    console.log('============================================================');
    console.log(`\n📊 Statistics:`);
    console.log(`   • Web App articles: ${existingData.articles.length}`);
    console.log(`   • Manual articles: ${manualArticles.length}`);
    console.log(`   • Total articles: ${allArticles.length}`);
    console.log(`\n📁 Output:`);
    console.log(`   • Updated: articles.json`);
    console.log(`\n🚀 Next Steps:`);
    console.log(`   1. Refresh news.html in browser`);
    console.log(`   2. All articles should now display\n`);
    
  } catch (error) {
    console.error(`\n❌ ERROR: ${error.message}\n`);
    process.exit(1);
  }
}

// Run
mergeArticles();
