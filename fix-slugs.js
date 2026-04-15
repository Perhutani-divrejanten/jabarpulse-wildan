const fs = require('fs');

let content = fs.readFileSync('js/load-news.js', 'utf-8');
// Remove all slug fields
content = content.replace(/,"slug":"[^"]*"/g, '');
fs.writeFileSync('js/load-news.js', content, 'utf-8');
console.log('Removed all slug fields');