const fs = require('fs');
const path = require('path');

const projectDir = __dirname;

// Fungsi untuk mengganti konten di file
function replaceBrandingInFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        // Simple string replacements - order matters!
        const replacements = [
            // Title patterns
            [/- Warta Janten</gi, '- JabarPulse</'],
            [/- Warta Jabar</gi, '- JabarPulse</'],
            
            // Footer copyright - exact match
            ['<strong>Warta Janten</strong>', '<strong>JabarPulse</strong>'],
            ['<strong>Warta Jabar</strong>', '<strong>JabarPulse</strong>'],
            ['Copyright © 2026 Warta Janten', 'Copyright © 2026 JabarPulse'],
            ['Copyright © 2026 Warta Jabar', 'Copyright © 2026 JabarPulse'],
            ['Copyright © 2026 Warta Janten.', 'Copyright © 2026 JabarPulse.'],
            ['Copyright © 2026 Warta Jabar.', 'Copyright © 2026 JabarPulse.'],
            
            // Paragraph text
            ['adalah portal berita digital yang berfokus pada penyajian', 'adalah platform berita digital terkini yang berfokus pada penyajian'],
            ['Warta Jabar berkomitmen', 'JabarPulse berkomitmen'],
        ];

        replacements.forEach(([search, replace]) => {
            if (typeof search === 'string' && content.includes(search)) {
                content = content.split(search).join(replace);
                modified = true;
            } else if (search instanceof RegExp) {
                if (search.test(content)) {
                    content = content.replace(search, replace);
                    modified = true;
                }
            }
        });

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✓ ${path.relative(projectDir, filePath)}`);
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
        
        if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
            findHtmlFiles(fullPath);
        } else if (file.endsWith('.html')) {
            htmlFiles.push(fullPath);
        }
    });
}

findHtmlFiles(projectDir);

console.log(`\n🔄 Comprehensive Branding Replacement\n`);
console.log(`📄 Found ${htmlFiles.length} HTML files\n`);

const startTime = Date.now();
const updatedCount = htmlFiles.reduce((count, file) => {
    return count + (replaceBrandingInFile(file) ? 1 : 0);
}, 0);

const endTime = Date.now();

console.log(`\n✅ Replacement complete!`);
console.log(`📊 Updated: ${updatedCount} files`);
console.log(`⏱️  Time: ${(endTime - startTime) / 1000}s\n`);
