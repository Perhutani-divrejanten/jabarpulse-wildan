const fs = require('fs');
const path = require('path');

// Direktori proyek
const projectDir = __dirname;

// Fungsi untuk mengganti konten di file
function replaceInFile(filePath, replacements) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        replacements.forEach(({ old, new: newText }) => {
            if (content.includes(old)) {
                content = content.replace(new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newText);
                modified = true;
            }
        });

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✓ Updated: ${path.relative(projectDir, filePath)}`);
        }
        return modified;
    } catch (err) {
        console.error(`✗ Error in ${filePath}:`, err.message);
        return false;
    }
}

// Definisi penggantian
const replacements = [
    {
        old: '<title>Portal Berita Jawa Barat & Banten - Warta Janten</title>',
        new: '<title>JabarPulse - Portal Berita Jawa Barat Terkini</title>'
    },
    {
        old: 'Warta Janten',
        new: 'JabarPulse'
    },
    {
        old: 'Warta Jabar',
        new: 'JabarPulse'
    },
    {
        old: '<img src="img/warta jabar.png" alt="Warta Jabar">',
        new: '<span class="logo-text">JabarPulse</span>'
    },
    {
        old: '<img src="img/warta jabar.png" alt="Warta Janten">',
        new: '<span class="logo-text">JabarPulse</span>'
    },
    {
        old: 'adalah portal berita digital yang berfokus pada penyajian',
        new: 'adalah portal berita digital terkini yang berfokus pada penyajian informasi,  analisis, dan reportase mendalam'
    }
];

// Scan semua file HTML
let htmlFiles = [];
function findHtmlFiles(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !file.startsWith('.')) {
            findHtmlFiles(fullPath);
        } else if (file.endsWith('.html')) {
            htmlFiles.push(fullPath);
        }
    });
}

findHtmlFiles(projectDir);

// Update semua file HTML
console.log(`\n🔄 Starting rebranding process...`);
console.log(`📄 Found ${htmlFiles.length} HTML files\n`);

const updatedCount = htmlFiles.reduce((count, file) => {
    return count + (replaceInFile(file, replacements) ? 1 : 0);
}, 0);

console.log(`\n✅ Rebranding complete!`);
console.log(`📊 Updated: ${updatedCount} files\n`);

console.log(`\n⚠️  Next steps:\n`);
console.log(`1. Add CSS for .logo-text class in css/style.css`);
console.log(`2. Test all pages to ensure logo displays correctly\n`);
