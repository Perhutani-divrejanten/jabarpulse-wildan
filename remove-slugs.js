const fs = require('fs');

let content = fs.readFileSync('js/load-news.js', 'utf-8');
content = content.replace(/,"slug":"[^"]*"/g, '');
fs.writeFileSync('js/load-news.js', content, 'utf-8');
console.log('Removed slug fields from manual articles');