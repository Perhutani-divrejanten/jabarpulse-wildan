const fs = require('fs');
const path = require('path');

const result = [];
for (let i = 1; i <= 90; i++) {
  const file = path.join(__dirname, `../berita${i}.html`);
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, 'utf-8');
  // Ekstrak judul
  let title = '';
  const titleMatch = html.match(/<a[^>]*class=["']sn-title["'][^>]*>\s*([\s\S]*?)\s*<\/a>/i);
  if (titleMatch) title = titleMatch[1].replace(/\s+/g, ' ').trim();
  // Ekstrak gambar
  let image = '';
  const imgMatch = html.match(/<div[^>]*class=["']sn-img["'][^>]*>\s*<img[^>]*src=["']([^"']+)["']/i);
  if (imgMatch) image = imgMatch[1].trim();
  // Ekstrak tanggal
  let date = '';
  const dateMatch = html.match(/<a[^>]*class=["']sn-date["'][^>]*>.*?(\d{2} \w+ \d{4})/i);
  if (dateMatch) date = dateMatch[1].trim();
  result.push({
    id: 1000 + i,
    title,
    excerpt: '',
    content: '',
    category: 'Manual',
    image,
    date,
    author: 'Redaksi',
    dateFormatted: date,
    url: `berita${i}.html`
  });
}
console.log(JSON.stringify(result, null, 2));
