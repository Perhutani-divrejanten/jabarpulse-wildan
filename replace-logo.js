const fs = require('fs');
const path = require('path');

// Direktori proyek
const projectDir = __dirname;

// Fungsi untuk mengganti konten di file
function replaceLogoInFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        // Pattern untuk menangkap berbagai variasi logo image tag
        const patterns = [
            // Pattern 1: standar dengan warta jabar.png
            /<img\s+src="img\/warta\s+jabar\.png"\s+alt="[^"]*">/gi,
            // Pattern 2: tanpa spasi dalam src
            /<img\s+src="img\/warta\s+jabar\.png"\s*>/gi,
            // Pattern 3: berbagai urutan atribut
            /<img\s+alt="[^"]*"\s+src="img\/warta\s+jabar\.png">/gi,
        ];

        const replacement = '<span class="logo-text">JabarPulse</span>';

        patterns.forEach(pattern => {
            if (pattern.test(content)) {
                content = content.replace(pattern, replacement);
                modified = true;
            }
        });

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✓ Logo updated: ${path.relative(projectDir, filePath)}`);
        }
        return modified;
    } catch (err) {
        console.error(`✗ Error in ${filePath}:`, err.message);
        return false;
    }
}

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

// Update logo di semua file HTML
console.log(`\n🔄 Starting logo replacement process...`);
console.log(`📄 Found ${htmlFiles.length} HTML files\n`);

const updatedCount = htmlFiles.reduce((count, file) => {
    return count + (replaceLogoInFile(file) ? 1 : 0);
}, 0);

console.log(`\n✅ Logo replacement complete!`);
console.log(`📊 Updated: ${updatedCount} files\n`);
