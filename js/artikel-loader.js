// Google Apps Script Web App URL (via PHP bridge)
const WEB_APP_URL = 'api.php';

// Get URL Parameter
function getURLParameter(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

// Load Article
async function loadArticle() {
    try {
        const articleId = getURLParameter('id');
        const articleSlug = getURLParameter('slug');
        
        console.log('Article ID:', articleId);
        console.log('Article Slug:', articleSlug);
        
        if (!articleId && !articleSlug) {
            console.warn('Tidak ada ID atau Slug di URL');
            document.getElementById('articleTitle').textContent = 'Masukkan ID atau slug artikel di URL';
            return;
        }

        console.log('Fetching from Web App:', WEB_APP_URL);
        
        // Fetch JSON dari Google Apps Script Web App
        const response = await fetch(WEB_APP_URL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Response from Web App:', data);
        
        if (data.error) {
            throw new Error('Web App Error: ' + data.error);
        }
        
        const articles = data.articles || data;
        console.log('Articles loaded successfully!');
        console.log('Total articles:', articles.length);
        console.log('Articles data:', articles);

        // Cari artikel berdasarkan ID atau Slug
        let article = null;
        if (articleId) {
            console.log('Searching by ID:', articleId);
            article = articles.find(a => String(a.id).trim() == String(articleId).trim());
        } else if (articleSlug) {
            console.log('Searching by Slug:', articleSlug);
            article = articles.find(a => a.slug === articleSlug);
        }

        if (!article) {
            console.warn('Artikel tidak ditemukan');
            console.log('Available articles:', articles.map(a => ({ id: a.id, slug: a.slug, title: a.title })));
            document.getElementById('articleTitle').textContent = 'Artikel tidak ditemukan';
            return;
        }

        console.log('Article found:', article);

        // Update Page Title & Meta
        document.getElementById('pageTitle').textContent = article.title + ' - Warta Jabar';
        document.getElementById('pageKeywords').content = article.category;
        document.getElementById('pageDescription').content = article.excerpt;

        // Update Breadcrumb
        document.getElementById('breadcrumbTitle').textContent = article.title;

        // Update Badge Kategori
        const badgeContainer = document.getElementById('badgeContainer');
        badgeContainer.innerHTML = `<span class="badge-custom">${article.category}</span>`;

        // Update Judul
        document.getElementById('articleTitle').textContent = article.title;

        // Update Tanggal
        document.getElementById('articleDate').textContent = article.date;

        // Update Gambar
        const imgElement = document.getElementById('articleImage');
        imgElement.src = article.image;
        imgElement.alt = article.title;

        // Update Konten - Content sudah dalam format HTML dengan <p></p>
        const contentDiv = document.getElementById('articleContent');
        contentDiv.innerHTML = article.content;
        
        console.log('✅ Article rendered successfully!');

    } catch (error) {
        console.error('❌ Error loading article:', error);
        document.getElementById('articleTitle').textContent = 'Gagal memuat artikel: ' + error.message;
    }
}

// Load article saat halaman selesai dimuat
document.addEventListener('DOMContentLoaded', loadArticle);
