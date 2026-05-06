/**
 * DYNAMIC NEWS LOADER
 * ====================
 * Load artikel dari articles.json ke halaman news.html
 * Support: pagination, filtering, search
 * 
 * Usage:
 * <script src="js/load-news.js"></script>
 */

// =============================================================================
// KONFIGURASI
// =============================================================================

const NEWS_CONFIG = {
  JSON_PATH: './articles.json',      // Path ke articles.json
  ARTICLES_PER_PAGE: 12,              // Jumlah artikel per halaman
  LAZY_LOAD_images: true,             // Lazy load images
  CACHE_DURATION: 3600000,            // Cache 1 jam (milliseconds)
};

// =============================================================================
// DEBUG LOGGING
// =============================================================================

function debugLog(message) {
  console.log(message);
}

// =============================================================================
// STATE & CACHE
// =============================================================================

let articlesCache = null;
let currentPage = 1;
let allArticles = [];
let filteredArticles = [];
let activeCategory = null;
let searchQuery = '';
let lastCacheTime = 0;

// =============================================================================
// FETCH & LOAD DATA
// =============================================================================

/**
 * Fetch articles.json dengan caching
 */
async function loadArticlesJSON() {
  try {
    // Cek cache
    if (articlesCache && (Date.now() - lastCacheTime) < NEWS_CONFIG.CACHE_DURATION) {
      debugLog('📦 Using cached articles data');
      return articlesCache;
    }

    debugLog('📥 Fetching articles.json...');
    
    try {
      // Coba fetch dulu (untuk HTTP)
      const response = await fetch(NEWS_CONFIG.JSON_PATH);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      articlesCache = await response.json();
    } catch (fetchError) {
      debugLog('⚠️ Fetch failed, trying XMLHttpRequest fallback: ' + fetchError.message);
      
      // Fallback untuk file lokal menggunakan XMLHttpRequest
      articlesCache = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', NEWS_CONFIG.JSON_PATH, true);
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 0) { // status 0 untuk file lokal
              try {
                const data = JSON.parse(xhr.responseText);
                resolve(data);
              } catch (parseError) {
                reject(new Error('JSON parse error: ' + parseError.message));
              }
            } else {
              reject(new Error(`XMLHttpRequest error! status: ${xhr.status}`));
            }
          }
        };
        xhr.onerror = () => reject(new Error('XMLHttpRequest network error'));
        xhr.send();
      });
    }
    
    lastCacheTime = Date.now();
    
    debugLog(`✓ Loaded ${articlesCache.articles.length} articles`);
    return articlesCache;
    
  } catch (error) {
    debugLog('❌ Error loading articles.json: ' + error.message);
    showErrorMessage('Gagal memuat data berita. Coba refresh halaman.');
    return null;
  }
}

// =============================================================================
// TAMBAHAN: MANUAL ARTICLES BERITA1.HTML - BERITA90.HTML
// =============================================================================

/**
 * Get manual articles
 */
function getManualArticles() { return [
  {
    "id": 1,
    "title": "Perhutani KPH Bandung Selatan Dukung Program PPL Siswa SMA Muhammadiyah 4 Bandung",
    "excerpt": "Perhutani KPH Bandung Selatan menerima siswa SMA Muhammadiyah 4 Bandung untuk PPL, mendukung pembelajaran aplikatif dan pengenalan lingkungan kerja.",
    "content": "Perum Perhutani KPH Bandung Selatan menerima siswa kelas XI SMA Muhammadiyah 4 Kota Bandung untuk Praktik Pengalaman Lapangan (PPL). Kegiatan ini bertujuan memberikan pengalaman kerja nyata dan pengenalan lingkungan kerja. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para siswa diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "date": "2026-01-09",
    "author": "WK",
    "dateFormatted": "09 Januari 2026",
    "category": "Pendidikan",
    "image": "img/Picture1.jpg",
    "url": "berita1.html"
  },
  {
    "id": 2,
    "title": "Peringatan Serikat Karyawan Perhutani Bandung Selatan Dibarengi Bantuan Bibit",
    "excerpt": "Serikat Karyawan Perhutani Bandung Selatan memperingati hari jadi ke-21 dengan syukuran dan penyerahan bantuan bibit buah-buahan.",
    "content": "Serikat Karyawan (Sekar) Perum Perhutani KPH Bandung Selatan memperingati hari jadi ke-21 dengan tema 'Perusahaan Eksis, Karyawan Sejahtera'. Acara diadakan di aula kantor KPH Bandung Selatan dengan syukuran pemotongan tumpeng dan penyerahan bantuan bibit buah-buahan untuk masyarakat sekitar. Kegiatan dihadiri jajaran manajemen, pengurus Sekar, dan karyawan. Sekar menjadi wadah aspirasi karyawan dan mitra manajemen untuk memajukan perusahaan dan kesejahteraan karyawan.",
    "date": "2026-01-13",
    "author": "WK",
    "dateFormatted": "13 Januari 2026",
    "category": "Sosial",
    "image": "img/Picture2.jpg",
    "url": "berita2.html"
  },
  {
    "id": 3,
    "title": "Perhutani Dampingi Kunjungan Menteri Lingkungan Hidup ke Hulu Sungai Citarum",
    "excerpt": "Menteri Lingkungan Hidup RI melakukan kunjungan kerja ke hulu Sungai Citarum, didampingi Perhutani KPH Bandung Selatan dan jajaran.",
    "content": "Menteri Lingkungan Hidup RI, Hanif Faisol Nurofiq, melakukan kunjungan kerja ke kawasan hulu Sungai Citarum/Situ Cisanti, didampingi jajaran Perhutani Jawa Barat dan Banten serta KPH Bandung Selatan. Kunjungan membahas rencana intervensi pengelolaan lingkungan hidup dengan pendekatan sosial dan kolaborasi lintas pemangku kepentingan. Perhutani KPH Bandung Selatan mendukung penuh upaya pelestarian kawasan hulu Sungai Citarum.",
    "date": "2026-01-16",
    "author": "WK",
    "dateFormatted": "16 Januari 2026",
    "category": "Kunjungan Kerja",
    "image": "img/Picture3.jpg",
    "url": "berita3.html"
  },
  {
    "id": -996,
    "title": "Perhutani Bandung Utara dan Komunitas Penat Lakukan Aksi Nyata Tanam Pohon",
    "excerpt": "Perhutani Bandung Utara bersama Komunitas Penat melakukan aksi penanaman pohon di Curug Cibanban untuk menjaga sumber mata air dan ekosistem.",
    "content": "Perhutani KPH Bandung Utara melaksanakan penanaman pohon bersama Komunitas Pendaki Napas Tua (Penat) di wilayah hutan RPH Cibodas, Manglayang Barat, blok Curug Cibanban. Penanaman ratusan bibit pohon seperti damar, rasamala, pinus, puspa, dan mahoni bertujuan menjaga sumber mata air dan memperkuat ketahanan ekosistem. Kegiatan ini menjadi bentuk kepedulian nyata terhadap pelestarian kawasan hutan dan sumber air.",
    "date": "2026-01-03",
    "author": "WK",
    "dateFormatted": "03 Januari 2026",
    "category": "Lingkungan",
    "image": "img/Picture4.png",
    "url": "berita4.html"
  },
  {
    "id": -995,
    "title": "Perhutani Terima Kegiatan PKL Mahasiswi Universitas Terbuka di Bandung",
    "excerpt": "Perhutani KPH Bandung Utara menerima kegiatan PKL mahasiswi Universitas Terbuka, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perum Perhutani KPH Bandung Utara menerima kegiatan Praktek Kerja Lapang (PKL) mahasiswi Universitas Terbuka. Program PKL berlangsung satu bulan penuh, memberi kesempatan memperluas wawasan dalam pengelolaan hutan, dari teori hingga praktik lapangan. Perhutani berkomitmen mendukung mahasiswa memperkaya pemahaman kehutanan melalui pengalaman praktis.",
    "date": "2026-01-06",
    "author": "WK",
    "dateFormatted": "06 Januari 2026",
    "category": "Pendidikan",
    "image": "img/Picture5.jpg",
    "url": "berita5.html"
  },
  {
    "id": -994,
    "title": "Perhutani Bandung Utara Lepas Mahasiswa UNPAS Usai Rampungkan PKL",
    "excerpt": "Perhutani Bandung Utara resmi melepas mahasiswa UNPAS yang telah menyelesaikan PKL, mempererat hubungan dunia akademik dan Perhutani.",
    "content": "Perum Perhutani KPH Bandung Utara resmi melepas dua mahasiswa Universitas Pasundan (UNPAS) Bandung yang telah menyelesaikan PKL selama tiga bulan. Administratur KPH Bandung Utara menyampaikan apresiasi atas dedikasi mahasiswa dan berharap pengalaman PKL menjadi bekal berharga untuk karier di masa depan. Kegiatan ini mempererat hubungan kerja sama antara dunia akademik dan Perhutani.",
    "date": "2026-01-07",
    "author": "WK",
    "dateFormatted": "07 Januari 2026",
    "category": "Pendidikan",
    "image": "img/Picture6.jpg",
    "url": "berita6.html"
  },
  {
    "id": -993,
    "title": "Perhutani KPH Bandung Utara Perkuat Koordinasi Pengelolaan Wisata Hutan dengan Mitra",
    "excerpt": "Perhutani KPH Bandung Utara menyelenggarakan koordinasi dengan mitra kelola wisata, memperkuat sinergi pengelolaan hutan dan pemanfaatan kawasan.",
    "content": "Perum Perhutani KPH Bandung Utara menyelenggarakan kegiatan koordinasi dengan mitra kelola wisata di wilayah kerja KPH Bandung Utara. Kegiatan diikuti mitra kelola wisata dari empat BKPH, membahas komitmen bersama menjaga kelestarian hutan, perawatan tanaman, pengamanan kawasan, dan optimalisasi pemanfaatan hasil hutan secara berkelanjutan.",
    "date": "2026-01-15",
    "author": "WK",
    "dateFormatted": "15 Januari 2026",
    "category": "Wisata",
    "image": "img/Picture7.png",
    "url": "berita7.html"
  },
  {
    "id": -992,
    "title": "Perhutani KPH Bandung Utara Dukung Aksi Penanaman 'Rindu Rindang Kota Bandung'",
    "excerpt": "Perhutani KPH Bandung Utara melalui Saka Wanabakti Kota Bandung turut berpartisipasi dalam aksi penanaman 'Rindu Rindang Kota Bandung'.",
    "content": "Perum Perhutani KPH Bandung Utara melalui Saka Wanabakti Kota Bandung berpartisipasi dalam aksi penanaman 'Rindu Rindang Kota Bandung: Kolaborasi Kami untuk Bumi'. Kegiatan ini bertujuan meningkatkan indeks hijau dan daya dukung ekologi perkotaan, memperkuat kesadaran masyarakat akan pelestarian lingkungan, dan melibatkan berbagai unsur lintas sektor.",
    "date": "2026-01-17",
    "author": "WK",
    "dateFormatted": "17 Januari 2026",
    "category": "Lingkungan",
    "image": "img/Picture8.png",
    "url": "berita8.html"
  },
  {
    "id": -991,
    "title": "Perhutani Bersama Stakeholder Lakukan Patroli Siaga Bencana Alam di Cikole",
    "excerpt": "Perhutani KPH Bandung Utara melaksanakan patroli gabungan untuk mengantisipasi gangguan keamanan hutan dan potensi bencana alam di Cikole.",
    "content": "Perum Perhutani KPH Bandung Utara melaksanakan patroli gabungan untuk mengantisipasi gangguan keamanan hutan, potensi bencana alam, dan risiko pohon tumbang di wilayah hutan RPH Lembang, BKPH Lembang, Desa Cikole, Kecamatan Lembang. Kegiatan diikuti jajaran Perhutani, Polri, dan pemerintah desa, bertujuan memberikan pelayanan kepada masyarakat dan imbauan terkait potensi bencana alam.",
    "date": "2026-01-17",
    "author": "WK",
    "dateFormatted": "17 Januari 2026",
    "category": "Bencana Alam",
    "image": "img/Picture9.jpg",
    "url": "berita9.html"
  },
  {
    "id": -990,
    "title": "Perhutani Bersama Stakeholder Tekan PKS Pengelolaan Wisata Ciwangun Indah Camp Di Bandung",
    "excerpt": "Perhutani KPH Bandung Utara menandatangani PKS dengan PT Ciwangun Indah Cemerlang untuk pengelolaan Wisata Ciwangun Indah Camp.",
    "content": "Perhutani KPH Bandung Utara menandatangani Perjanjian Kerja Sama (PKS) dengan PT Ciwangun Indah Cemerlang untuk pengelolaan Wisata Ciwangun Indah Camp di Petak 62A, E, dan J RPH Cisarua, BKPH Lembang, Desa Cihanjuang Rahayu, Kecamatan Cisarua, Kabupaten Bandung Barat. PKS bertujuan pengelolaan wisata alam berbasis kemitraan bisnis.",
    "date": "2026-01-25",
    "author": "WK",
    "dateFormatted": "25 Januari 2026",
    "category": "Wisata",
    "image": "img/Picture10.png",
    "url": "berita10.html"
  },
  {
    "id": -989,
    "title": "Perhutani KPH Bandung Utara Perkuat Sinergi dengan TNI Dukung Pembentukan Koperasi Kelurahan Merah Putih",
    "excerpt": "Perhutani KPH Bandung Utara melaksanakan koordinasi dengan TNI mendukung pembentukan Koperasi Kelurahan Merah Putih.",
    "content": "Perhutani KPH Bandung Utara melaksanakan koordinasi dengan Kodim 0618/Kota Bandung untuk pengajuan proses Koperasi Kelurahan Merah Putih (KKMP). Kegiatan dihadiri jajaran Perhutani dan TNI, membahas mekanisme pengajuan, tujuan pendirian koperasi, dan harapan manfaat ekonomi bagi masyarakat desa sekitar hutan.",
    "date": "2026-01-26",
    "author": "WK",
    "dateFormatted": "26 Januari 2026",
    "category": "Kemitraan",
    "image": "img/Picture11.png",
    "url": "berita11.html"
  },
  {
    "id": -988,
    "title": "Perhutani KPH Banten Gelar Job Training Tebangan 2026",
    "excerpt": "Perhutani KPH Banten menggelar Job Training Tebangan untuk meningkatkan pemahaman dan keterampilan kerja petugas dan mitra kerja.",
    "content": "Perhutani KPH Banten menggelar Job Training Tebangan untuk mengawali proses produksi tebangan Tahun 2026 di wilayah KPH Banten. Pelatihan teknis penebangan kayu bertujuan meningkatkan pemahaman dan keterampilan kerja petugas mandor tebang dan mitra kerja, memastikan seluruh proses produksi kayu berjalan sesuai standar teknis, aman, dan tertib administrasi.",
    "date": "2026-01-17",
    "author": "WK",
    "dateFormatted": "17 Januari 2026",
    "category": "Pelatihan",
    "image": "img/Picture12.jpg",
    "url": "berita12.html"
  },
  {
    "id": -987,
    "title": "Perhutani KPH Banten Dukung Program Strategis Nasional Pembangunan Koperasi Desa Merah Putih Di Kabupaten Lebak Banten",
    "excerpt": "Perhutani KPH Banten mendukung Program Strategis Nasional pembangunan Koperasi Desa Merah Putih di Kabupaten Lebak, memperkuat sinergi lintas sektoral.",
    "content": "Perhutani KPH Banten menjalin sinergi lintas sektoral bersama Kodim 06/03 Lebak dan Dinas Koperasi dan UKM Kabupaten Lebak untuk mendukung Program Strategis Nasional pembangunan Koperasi Desa Merah Putih (KDMP). Rapat koordinasi membahas kesiapan lahan dan pemenuhan aspek legalitas dalam rencana pembangunan sarana dan prasarana KDMP.",
    "date": "2026-01-23",
    "author": "WK",
    "dateFormatted": "23 Januari 2026",
    "category": "Ekonomi",
    "image": "img/Picture13.jpg",
    "url": "berita13.html"
  },
  {
    "id": -986,
    "title": "Jalin Sinergi, Perhutani Bogor Kunjungi Polsek Tenjo",
    "excerpt": "Perhutani KPH Bogor menjalin sinergitas dengan Polsek Tenjo untuk menjaga keamanan hutan dan pencegahan gangguan keamanan hutan.",
    "content": "Perum Perhutani KPH Bogor menjalin sinergitas dengan Polsek Tenjo dalam menjaga keamanan hutan melalui kunjungan ke Polsek Tenjo. Kegiatan bertujuan menjalin sinergi bersama Polsek Tenjo dalam pencegahan dan penanganan gangguan keamanan hutan di wilayah RPH Tenjo dan memenuhi undangan Pisah Sambut Kapolsek Tenjo.",
    "date": "2026-01-06",
    "author": "WK",
    "dateFormatted": "06 Januari 2026",
    "category": "Kemitraan",
    "image": "img/Picture14.jpg",
    "url": "berita14.html"
  },
  {
    "id": -985,
    "title": "Perhutani KPH Bogor Bersama LMDH dan KTH Gelar Pentas Seni SymForest",
    "excerpt": "Perhutani KPH Bogor menjadi lokasi Pentas Seni SymForest yang diinisiasi KTH Kampung Rimba dan LMDH Puncak Lestari, mendukung promosi wisata alam.",
    "content": "Perum Perhutani KPH Bogor menjadi lokasi Pentas Seni SymForest yang diinisiasi KTH Kampung Rimba dan LMDH Puncak Lestari. Kegiatan dihadiri jajaran Perhutani, LMDH, KTH, dan tamu undangan dari Dinas Kebudayaan dan Pariwisata Kabupaten Bogor. Pentas seni bertujuan mempromosikan wisata alam dan pelestarian budaya Nusantara.",
    "date": "2026-01-07",
    "author": "WK",
    "dateFormatted": "07 Januari 2026",
    "category": "Pendidikan",
    "image": "img/Picture15.jpg",
    "url": "berita15.html"
  },
  {
    "id": -984,
    "title": "Perhutani Bogor Terima Kunjungan DPRD Komisi IV Provinsi Banten di Parung Panjang",
    "excerpt": "Perhutani KPH Bogor menerima kunjungan DPRD Komisi IV Provinsi Banten di Parung Panjang, membahas pengembangan proyek karbon dan agroforestri.",
    "content": "Perum Perhutani KPH Bogor menerima kunjungan DPRD Komisi IV Provinsi Banten di Kantor BKPH Parung Panjang. Kunjungan membahas pengembangan proyek karbon dengan sistem agroforestri dan pemberdayaan masyarakat. Perhutani mendukung diskusi dan sharing positif untuk kebijakan kawasan hutan berkelanjutan.",
    "date": "2026-01-09",
    "author": "WK",
    "dateFormatted": "09 Januari 2026",
    "category": "Kunjungan Kerja",
    "image": "img/Picture16.jpg",
    "url": "berita16.html"
  },
  {
    "id": -983,
    "title": "Perhutani Bogor Hadiri Tanam Jagung Serentak Polri di Cigombong",
    "excerpt": "Perhutani KPH Bogor hadiri Panen Jagung Serentak Kuartal I Polri di Cigombong, mendukung ketahanan pangan nasional.",
    "content": "Perum Perhutani KPH Bogor hadiri Panen Jagung Serentak Kuartal I Polri di Desa Tugu Jaya, Kecamatan Cigombong, Kabupaten Bogor. Kegiatan mendukung swasembada pangan nasional dan memperkuat ketahanan pangan serta kesejahteraan petani lokal.",
    "date": "2026-01-08",
    "author": "WK",
    "dateFormatted": "08 Januari 2026",
    "category": "Ketahanan Pangan",
    "image": "img/Picture17.jpg",
    "url": "berita17.html"
  },
  {
    "id": -982,
    "title": "Perhutani Bogor Bersama CV. Emir Tusin Dampingi LMDH Binaan Untuk Tingkatkan Produktifitas",
    "excerpt": "Perhutani KPH Bogor bersama CV. Emir Tusin lakukan pendampingan kepada LMDH binaan agar produktif dalam berwiraswasta dan mengembangkan usaha kehutanan.",
    "content": "Perum Perhutani KPH Bogor bersama CV. Emir Tusin melakukan pendampingan kepada LMDH binaan agar produktif dalam berwiraswasta. Pendampingan mencakup legalitas usaha, pembuatan NIB, izin PIRT, persiapan izin edar dan sertifikasi halal. Kegiatan bertujuan memberdayakan LMDH dan KTH untuk berdaya, produktif, dan inovatif.",
    "date": "2026-01-08",
    "author": "WK",
    "dateFormatted": "08 Januari 2026",
    "category": "Ekonomi",
    "image": "img/Picture18.jpg",
    "url": "berita18.html"
  },
  {
    "id": -981,
    "title": "Perhutani Bogor Dukung Bitagure 5 di Parung Panjang, Tanamkan Generasi Muda Cinta Lingkungan",
    "excerpt": "Perhutani KPH Bogor mendukung Bitagure ke-5 di Parung Panjang, menanamkan generasi muda cinta lingkungan dan mempererat tali persaudaraan Pramuka.",
    "content": "Perum Perhutani KPH Bogor mendukung pelaksanaan Bitagure ke-5 di KHDTK BP2SDM Kementerian Kehutanan, Parung Panjang. Kegiatan bertujuan menanamkan nilai tanggung jawab pelestarian sumber daya alam, mempererat tali persaudaraan Pramuka, dan membentuk generasi peduli lingkungan.",
    "date": "2026-01-26",
    "author": "WK",
    "dateFormatted": "26 Januari 2026",
    "category": "Lingkungan",
    "image": "img/Picture19.jpg",
    "url": "berita19.html"
  },
  {
    "id": -980,
    "title": "Pererat Sinergisitas, Perhutani KPH Bogor Silaturahmi ke Kodim 0621 Kabupaten Bogor",
    "excerpt": "Perhutani KPH Bogor silaturahmi ke Kodim 0621 Kabupaten Bogor, mempererat sinergi pengelolaan dan pengamanan kawasan hutan.",
    "content": "Perum Perhutani KPH Bogor silaturahmi ke Kodim 0621 Kabupaten Bogor di Cibinong, mempererat sinergi pengelolaan dan pengamanan kawasan hutan. Kegiatan membahas dukungan penanganan Gukamhut, rencana program Koperasi Desa Merah Putih, dan kolaborasi strategis untuk pemberdayaan masyarakat desa sekitar hutan.",
    "date": "2026-01-27",
    "author": "WK",
    "dateFormatted": "27 Januari 2026",
    "category": "Kemitraan",
    "image": "img/Picture20.jpg",
    "url": "berita20.html"
  },
  {
    "id": -979,
    "title": "Perhutani Ciamis Serahkan Bantuan Bibit Kepada Paguyuban Peduli Alam Dan Lingkungan Ciamis",
    "excerpt": "Perhutani KPH Ciamis menyerahkan bantuan bibit tanaman kepada Paguyuban Peduli Alam dan Lingkungan Galuh Asri, mendukung kelestarian lingkungan.",
    "content": "Perum Perhutani KPH Ciamis menyerahkan bantuan bibit tanaman kepada Paguyuban Peduli Alam dan Lingkungan Galuh Asri di wisata bukit baros Desa Ciomas Kecamatan Panjalu. Kegiatan bertujuan menjaga kelestarian lingkungan dan mendukung program penghijauan di area Bukit Baros.",
    "date": "2026-01-09",
    "author": "WK",
    "dateFormatted": "09 Januari 2026",
    "category": "Lingkungan",
    "image": "img/Picture21.jpg",
    "url": "berita21.html"
  },
  {
    "id": -978,
    "title": "Perhutani KPH Ciamis Perkuat Sinergitas Bersama Dengan Setda Kota Banjar Terkait Mitigasi Bencana",
    "excerpt": "Perhutani KPH Ciamis melakukan kunjungan silaturahmi dan koordinasi ke Setda Kota Banjar, memperkuat sinergitas mitigasi bencana alam.",
    "content": "Perum Perhutani KPH Ciamis melakukan kunjungan silaturahmi dan koordinasi ke Kantor Setda Kota Banjar. Kegiatan membahas pencegahan dan penanganan bencana alam, mendukung program pemerintah daerah dalam aspek lingkungan dan keamanan wilayah, serta memastikan penanganan bencana dilakukan secara terpadu.",
    "date": "2026-01-28",
    "author": "WK",
    "dateFormatted": "28 Januari 2026",
    "category": "Bencana Alam",
    "image": "img/Picture22.jpg",
    "url": "berita22.html"
  },
  {
    "id": -977,
    "title": "Sinergi Keamanan dan Ekonomi, Perhutani KPH Cianjur Sambangi Dandim 0608",
    "excerpt": "Perhutani KPH Cianjur melaksanakan koordinasi dengan Dandim 0608 Cianjur, mendukung pembangunan ekonomi desa dan pelestarian lingkungan.",
    "content": "Perum Perhutani KPH Cianjur melaksanakan koordinasi dengan Dandim 0608 Cianjur untuk sinkronisasi program dan penguatan kerja sama lintas sektor. Kegiatan membahas penggunaan kawasan hutan untuk mendukung pembangunan Koperasi Merah Putih, mendukung pembangunan ekonomi desa dan pelestarian lingkungan.",
    "date": "2026-01-15",
    "author": "WK",
    "dateFormatted": "15 Januari 2026",
    "category": "Kemitraan",
    "image": "img/Picture23.png",
    "url": "berita23.html"
  },
  {
    "id": -976,
    "title": "Tingkatkan Keamanan Wisatawan, Perhutani Cianjur dan Polsek Tanggeung Pastikan Keamanan Wisatawan di Curug Citambur",
    "excerpt": "Perhutani KPH Cianjur bersinergi dengan Polsek Tanggeung melaksanakan pengamanan terpadu di Curug Citambur, mendukung kenyamanan wisatawan.",
    "content": "Perum Perhutani KPH Cianjur bersinergi dengan Polsek Tanggeung melaksanakan pengamanan terpadu di kawasan wana wisata Curug Citambur, Kecamatan Pasirkuda, Kabupaten Cianjur. Kegiatan bertujuan menjaga situasi keamanan dan kenyamanan pengunjung, serta mitigasi potensi bencana alam di kawasan wisata.",
    "date": "2026-01-05",
    "author": "WK",
    "dateFormatted": "05 Januari 2026",
    "category": "Wisata",
    "image": "img/Picture24.jpg",
    "url": "berita24.html"
  },
  {
    "id": -975,
    "title": "Perkuat Sinergi, Perhutani Bersama Kejari Lakukan Sosialisasi Penanganan Hukum Perdata dan Tata Usaha Negara",
    "excerpt": "Perhutani KPH Cianjur memperkokoh sinergi strategis dengan Kejari Cianjur melalui sosialisasi penanganan masalah hukum di bidang Perdata dan Tata Usaha Negara.",
    "content": "Perum Perhutani KPH Cianjur memperkokoh sinergi strategis dengan Kejari Cianjur melalui sosialisasi intensif penanganan masalah hukum di bidang Perdata dan Tata Usaha Negara (DATUN). Kegiatan bertujuan mengoptimalkan pengamanan aset negara dan kelestarian hutan di wilayah Kabupaten Cianjur.",
    "date": "2026-01-09",
    "author": "WK",
    "dateFormatted": "09 Januari 2026",
    "category": "Hukum",
    "image": "img/Picture25.jpg",
    "url": "berita25.html"
  },
  {
    "id": -974,
    "title": "Tingkatkan Kewaspadaan Musim Hujan, Perhutani Cianjur Bersama BPBD dan Pemdes Cidadap Gelar Sosialisasi Mitigasi Partisipatif",
    "excerpt": "Perhutani KPH Cianjur bersinergi dengan BPBD dan Pemdes Cidadap menggelar sosialisasi mitigasi partisipatif untuk menekan risiko bencana di wilayah rawan.",
    "content": "Perum Perhutani KPH Cianjur bersinergi dengan BPBD Kabupaten Cianjur dan Pemdes Cidadap menggelar sosialisasi kesiapsiagaan bencana hidrometeorologi. Kegiatan bertujuan menekan risiko bencana di wilayah rawan longsor dan banjir, mengedepankan mitigasi partisipatif masyarakat, dan meningkatkan pemahaman warga mengenai batas kawasan hutan dan risiko bencana.",
    "date": "2026-01-05",
    "author": "WK",
    "dateFormatted": "05 Januari 2026",
    "category": "Bencana Alam",
    "image": "img/Picture26.jpg",
    "url": "berita26.html"
  },
  {
    "id": -973,
    "title": "Perhutani KPH Cianjur Lakukan Konsolidasi dan Pengamanan Lahan Kompensasi di Sukanagara",
    "excerpt": "Perhutani KPH Cianjur bersama TNI, Polri, Pertamina, BPN, dan Muspika melaksanakan konsolidasi dan pengamanan lahan kompensasi di Sukanagara.",
    "content": "Perum Perhutani KPH Cianjur bersama TNI, Polri, Pertamina, BPN, dan Muspika melaksanakan konsolidasi dan pengamanan lapangan di lokasi calon lahan kompensasi di Sukanagara, Kabupaten Cianjur. Kegiatan bertujuan memastikan status hukum dan kondisi fisik lahan, mengantisipasi potensi gangguan keamanan hutan dan sengketa lahan, serta memperkuat kerja sama strategis lintas instansi.",
    "date": "2026-01-21",
    "author": "WK",
    "dateFormatted": "21 Januari 2026",
    "category": "Pertanahan",
    "image": "img/Picture27.jpg",
    "url": "berita27.html"
  },
  {
    "id": -972,
    "title": "Tingkatkan Kualitas SDM, Perhutani KPH Cianjur Lepas Mahasiswi Ilmu Komunikasi UIMA Pasca Magang",
    "excerpt": "Tingkatkan Kualitas SDM, Perhutani KPH Cianjur Lepas Mahasiswi Ilmu Komunikasi UIMA Pasca Magang, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Tingkatkan Kualitas SDM, Perhutani KPH Cianjur Lepas Mahasiswi Ilmu Komunikasi UIMA Pasca Magang. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Pelatihan",
    "image": "img/Picture28.jpg",
    "date": "2026-01-22",
    "author": "WK",
    "dateFormatted": "22 Januari 2026",
    "url": "berita28.html"
  },
  {
    "id": -971,
    "title": "Sinergi Perhutani Cianjur, TNI, dan Pemkab Perkuat Ekonomi Desa melalui Koperasi Merah Putih",
    "excerpt": "Sinergi Perhutani Cianjur, TNI, dan Pemkab Perkuat Ekonomi Desa melalui Koperasi Merah Putih, mendukung pengembangan ekonomi desa.",
    "content": "Sinergi Perhutani Cianjur, TNI, dan Pemkab Perkuat Ekonomi Desa melalui Koperasi Merah Putih. Kegiatan ini bertujuan mendukung pengembangan ekonomi desa. Perhutani berkomitmen mendukung pengembangan ekonomi desa melalui pembentukan koperasi.",
    "category": "Ekonomi",
    "image": "img/Picture29.jpg",
    "date": "2026-01-26",
    "author": "WK",
    "dateFormatted": "26 Januari 2026",
    "url": "berita29.html"
  },
  {
    "id": -970,
    "title": "Perhutani Bersama PGE Karaha Teken PKS Pemanfaatan Air di Garut",
    "excerpt": "Perhutani Bersama PGE Karaha Teken PKS Pemanfaatan Air di Garut, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani Bersama PGE Karaha Teken PKS Pemanfaatan Air di Garut. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Kemitraan",
    "image": "img/Picture30.jpg",
    "date": "2026-01-22",
    "author": "WK",
    "dateFormatted": "22 Januari 2026",
    "url": "berita30.html"
  },
  {
    "id": -969,
    "title": "Perhutani dan LMDH Gelar Patroli Bersama Lindungi Hutan di Garut",
    "excerpt": "Perhutani dan LMDH Gelar Patroli Bersama Lindungi Hutan di Garut, mendukung pengelolaan bencana.",
    "content": "Perhutani dan LMDH Gelar Patroli Bersama Lindungi Hutan di Garut. Kegiatan ini bertujuan mendukung pengelolaan bencana. Perhutani berkomitmen mendukung pengelolaan bencana.",
    "category": "Lingkungan",
    "image": "img/Picture31.jpg",
    "date": "2026-01-26",
    "author": "WK",
    "dateFormatted": "26 Januari 2026",
    "url": "berita31.html"
  },
  {
    "id": -968,
    "title": "Perhutani Bersama Pertamina Area Karaha Lakukan Penanaman di Garut",
    "excerpt": "Perhutani Bersama Pertamina Area Karaha Lakukan Penanaman di Garut, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani Bersama Pertamina Area Karaha Lakukan Penanaman di Garut. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Lingkungan",
    "image": "img/Picture32.jpg",
    "date": "2026-01-13",
    "author": "WK",
    "dateFormatted": "13 Januari 2026",
    "url": "berita32.html"
  },
  {
    "id": -967,
    "title": "Perhutani Dukung Panen Raya Jagung Kuartal I Tahun 2026 di Garut",
    "excerpt": "Perhutani Dukung Panen Raya Jagung Kuartal I Tahun 2026 di Garut, mendukung ketahanan pangan.",
    "content": "Perhutani Dukung Panen Raya Jagung Kuartal I Tahun 2026 di Garut. Kegiatan ini bertujuan mendukung ketahanan pangan. Perhutani berkomitmen mendukung ketahanan pangan.",
    "category": "Ketahanan Pangan",
    "image": "img/Picture33.jpg",
    "date": "2026-01-13",
    "author": "WK",
    "dateFormatted": "13 Januari 2026",
    "url": "berita33.html"
  },
  {
    "id": -966,
    "title": "Perhutani Salurkan Bantuan Bibit Untuk Paguyuban Warga Darangdan",
    "excerpt": "Perhutani Salurkan Bantuan Bibit Untuk Paguyuban Warga Darangdan, mendukung pelestarian kawasan hutan.",
    "content": "Perhutani Salurkan Bantuan Bibit Untuk Paguyuban Warga Darangdan. Kegiatan ini bertujuan menjaga sumber mata air dan memperkuat ketahanan ekosistem. Penanaman ratusan bibit pohon seperti damar, rasamala, pinus, puspa, dan mahoni bertujuan menjaga sumber mata air dan memperkuat ketahanan ekosistem. Kegiatan ini menjadi bentuk kepedulian nyata terhadap pelestarian kawasan hutan dan sumber air.",
    "category": "Lingkungan",
    "image": "img/Picture34.jpg",
    "date": "2026-01-13",
    "author": "WK",
    "dateFormatted": "13 Januari 2026",
    "url": "berita34.html"
  },
  {
    "id": -965,
    "title": "Perhutani KPH Indramayu Perkuat Kemitraan dengan Masyarakat Desa Hutan",
    "excerpt": "Perhutani KPH Indramayu Perkuat Kemitraan dengan Masyarakat Desa Hutan, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani KPH Indramayu Perkuat Kemitraan dengan Masyarakat Desa Hutan. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Kemitraan",
    "image": "img/Picture35.jpg",
    "date": "2026-01-13",
    "author": "WK",
    "dateFormatted": "13 Januari 2026",
    "url": "berita35.html"
  },
  {
    "id": -964,
    "title": "Perhutani KPH Indramayu Dukung Program Revitalisasi Tambak Pantura Berkelanjutan",
    "excerpt": "Perhutani KPH Indramayu Dukung Program Revitalisasi Tambak Pantura Berkelanjutan, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani KPH Indramayu Dukung Program Revitalisasi Tambak Pantura Berkelanjutan. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Lingkungan",
    "image": "img/Picture36.jpg",
    "date": "2026-01-13",
    "author": "WK",
    "dateFormatted": "13 Januari 2026",
    "url": "berita36.html"
  },
  {
    "id": -963,
    "title": "Perhutani KPH Indramayu Serahkan Sertifikat Magang Kepada Mahasiswi Universitas Wiralodra",
    "excerpt": "Perhutani KPH Indramayu Serahkan Sertifikat Magang Kepada Mahasiswi Universitas Wiralodra, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani KPH Indramayu Serahkan Sertifikat Magang Kepada Mahasiswi Universitas Wiralodra. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Pelatihan",
    "image": "img/Picture37.jpg",
    "date": "2026-01-18",
    "author": "WK",
    "dateFormatted": "18 Januari 2026",
    "url": "berita37.html"
  },
  {
    "id": -962,
    "title": "Perhutani Menjadi Narasumber Dalam Acara FGD di Universitas Negeri Jakarta",
    "excerpt": "Perhutani Menjadi Narasumber Dalam Acara FGD di Universitas Negeri Jakarta, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani Menjadi Narasumber Dalam Acara FGD di Universitas Negeri Jakarta. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Pelatihan",
    "image": "img/Picture38.jpg",
    "date": "2026-01-21",
    "author": "WK",
    "dateFormatted": "21 Januari 2026",
    "url": "berita38.html"
  },
  {
    "id": -961,
    "title": "Perhutani KPH Indramayu Bersama Stakeholder Gelar Patroli Siaga Bencana",
    "excerpt": "Perhutani KPH Indramayu Bersama Stakeholder Gelar Patroli Siaga Bencana, mendukung pengelolaan bencana.",
    "content": "Perhutani KPH Indramayu Bersama Stakeholder Gelar Patroli Siaga Bencana. Kegiatan ini bertujuan mendukung pengelolaan bencana. Perhutani berkomitmen mendukung pengelolaan bencana.",
    "category": "Bencana Alam",
    "image": "img/Picture39.jpg",
    "date": "2026-01-26",
    "author": "WK",
    "dateFormatted": "26 Januari 2026",
    "url": "berita39.html"
  },
  {
    "id": -960,
    "title": "Perhutani KPH Majalengka Dukung Kegiatan Sosial Harlah ke-21 Sekar Perhutani",
    "excerpt": "Perhutani KPH Majalengka Dukung Kegiatan Sosial Harlah ke-21 Sekar Perhutani, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani KPH Majalengka Dukung Kegiatan Sosial Harlah ke-21 Sekar Perhutani. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Sosial",
    "image": "img/Picture40.jpg",
    "date": "2026-01-23",
    "author": "WK",
    "dateFormatted": "23 Januari 2026",
    "url": "berita40.html"
  },
  {
    "id": -959,
    "title": "Perhutani KPH Majalengka Gelar FGD Bersama Pengelola Wisata Batu Lawang Di Kawasan Hutan",
    "excerpt": "Perhutani KPH Majalengka Gelar FGD Bersama Pengelola Wisata Batu Lawang Di Kawasan Hutan, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani KPH Majalengka Gelar FGD Bersama Pengelola Wisata Batu Lawang Di Kawasan Hutan. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Wisata",
    "image": "img/Picture41.jpg",
    "date": "2026-01-27",
    "author": "WK",
    "dateFormatted": "27 Januari 2026",
    "url": "berita41.html"
  },
  {
    "id": -958,
    "title": "Perhutani KPH Majalengka dan Kejari Majalengka Perkuat Kerja Sama Bidang Hukum",
    "excerpt": "Perhutani KPH Majalengka dan Kejari Majalengka Perkuat Kerja Sama Bidang Hukum, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani KPH Majalengka dan Kejari Majalengka Perkuat Kerja Sama Bidang Hukum. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Hukum",
    "image": "img/Picture42.jpg",
    "date": "2026-01-14",
    "author": "WK",
    "dateFormatted": "14 Januari 2026",
    "url": "berita42.html"
  },
  {
    "id": -957,
    "title": "Perhutani KPH Majalengka Perkuat Sinergi dengan Kodim 0617 Majalengka untuk Dukung Pemberdayaan Ekonomi Desa",
    "excerpt": "Perhutani KPH Majalengka Perkuat Sinergi dengan Kodim 0617 Majalengka untuk Dukung Pemberdayaan Ekonomi Desa, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani KPH Majalengka Perkuat Sinergi dengan Kodim 0617 Majalengka untuk Dukung Pemberdayaan Ekonomi Desa. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Ekonomi",
    "image": "img/Picture43.jpg",
    "date": "2026-01-21",
    "author": "WK",
    "dateFormatted": "21 Januari 2026",
    "url": "berita43.html"
  },
  {
    "id": -956,
    "title": "Perhutani KPH Kuningan Bersama Polres Kuningan Rencanakan Penanaman Pohon Bersama",
    "excerpt": "Perhutani KPH Kuningan Bersama Polres Kuningan Rencanakan Penanaman Pohon Bersama, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani KPH Kuningan Bersama Polres Kuningan Rencanakan Penanaman Pohon Bersama. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Lingkungan",
    "image": "img/Picture44.jpg",
    "date": "2026-01-26",
    "author": "WK",
    "dateFormatted": "26 Januari 2026",
    "url": "berita44.html"
  },
  {
    "id": -955,
    "title": "Perhutani KPH Kuningan Perkuat Koordinasi Lintas Sektor bersama Denpom Kuningan",
    "excerpt": "Perhutani KPH Kuningan Perkuat Koordinasi Lintas Sektor bersama Denpom Kuningan, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani KPH Kuningan Perkuat Koordinasi Lintas Sektor bersama Denpom Kuningan. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Kemitraan",
    "image": "img/Picture45.jpg",
    "date": "2026-01-26",
    "author": "WK",
    "dateFormatted": "26 Januari 2026",
    "url": "berita45.html"
  },
  {
    "id": -954,
    "title": "Hadapi Tahun 2026, Perhutani KPH Kuningan Bersama BPBD Kuningan Perkuat Mitigasi Bencana",
    "excerpt": "Hadapi Tahun 2026, Perhutani KPH Kuningan Bersama BPBD Kuningan Perkuat Mitigasi Bencana, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Hadapi Tahun 2026, Perhutani KPH Kuningan Bersama BPBD Kuningan Perkuat Mitigasi Bencana. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Bencana Alam",
    "image": "img/Picture46.jpg",
    "date": "2026-01-09",
    "author": "WK",
    "dateFormatted": "09 Januari 2026",
    "url": "berita46.html"
  },
  {
    "id": -953,
    "title": "Perhutani KPH Kuningan dan Yonif TP 839 Perkuat Sinergi Bahas Ketahanan Pangan",
    "excerpt": "Perhutani KPH Kuningan dan Yonif TP 839 Perkuat Sinergi Bahas Ketahanan Pangan, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani KPH Kuningan dan Yonif TP 839 Perkuat Sinergi Bahas Ketahanan Pangan. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Ketahanan Pangan",
    "image": "img/Picture47.jpg",
    "date": "2026-01-11",
    "author": "WK",
    "dateFormatted": "11 Januari 2026",
    "url": "berita47.html"
  },
  {
    "id": -952,
    "title": "Perum Perhutani KPH Kuningan Melakukan Pelantikan Tapak Rimba (Petara) Tahun 2026 Berlangsung Sukses",
    "excerpt": "Perum Perhutani KPH Kuningan Melakukan Pelantikan Tapak Rimba (Petara) Tahun 2026 Berlangsung Sukses, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perum Perhutani KPH Kuningan Melakukan Pelantikan Tapak Rimba (Petara) Tahun 2026 Berlangsung Sukses. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Pelatihan",
    "image": "img/Picture48.jpg",
    "date": "2026-01-11",
    "author": "WK",
    "dateFormatted": "11 Januari 2026",
    "url": "berita48.html"
  },
  {
    "id": -951,
    "title": "Perhutani KPH Kuningan Fokus Memproduksi Kayu di Awal Tahun 2026, dan Laksanakan Cutting Test Tebangan",
    "excerpt": "Perhutani KPH Kuningan Fokus Memproduksi Kayu di Awal Tahun 2026, dan Laksanakan Cutting Test Tebangan, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani KPH Kuningan Fokus Memproduksi Kayu di Awal Tahun 2026, dan Laksanakan Cutting Test Tebangan. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Produksi Kayu",
    "image": "img/Picture49.jpg",
    "date": "2026-01-23",
    "author": "WK",
    "dateFormatted": "23 Januari 2026",
    "url": "berita49.html"
  },
  {
    "id": -950,
    "title": "Perhutani KPH Kuningan Melakukan Pembinaan Rutin Produksi Getah Pinus di TPG Bagarurung BKPH Garawangi",
    "excerpt": "Perhutani KPH Kuningan Melakukan Pembinaan Rutin Produksi Getah Pinus di TPG Bagarurung BKPH Garawangi, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani KPH Kuningan Melakukan Pembinaan Rutin Produksi Getah Pinus di TPG Bagarurung BKPH Garawangi. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Produksi Getah",
    "image": "img/Picture50.jpg",
    "date": "2026-01-25",
    "author": "WK",
    "dateFormatted": "25 Januari 2026",
    "url": "berita50.html"
  },
  {
    "id": -949,
    "title": "Perhutani KPH Kuningan Hadiri Peresmian Gedung Baru TBM Pondok Kata RZ dan Festival Kaulinan Barudak",
    "excerpt": "Perhutani KPH Kuningan Hadiri Peresmian Gedung Baru TBM Pondok Kata RZ dan Festival Kaulinan Barudak, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani KPH Kuningan Hadiri Peresmian Gedung Baru TBM Pondok Kata RZ dan Festival Kaulinan Barudak. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Sosial",
    "image": "img/Picture51.jpg",
    "date": "2026-01-27",
    "author": "WK",
    "dateFormatted": "27 Januari 2026",
    "url": "berita51.html"
  },
  {
    "id": -948,
    "title": "Perhutani KPH Kuningan, Kodim 0615, dan Pemda Kuningan Sinergi Dukung Program KDMP",
    "excerpt": "Perhutani KPH Kuningan, Kodim 0615, dan Pemda Kuningan Sinergi Dukung Program KDMP, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani KPH Kuningan, Kodim 0615, dan Pemda Kuningan Sinergi Dukung Program KDMP. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Kemitraan",
    "image": "img/Picture52.jpg",
    "date": "2026-01-27",
    "author": "WK",
    "dateFormatted": "27 Januari 2026",
    "url": "berita52.html"
  },
  {
    "id": -947,
    "title": "Perhutani KPH Purwakarta Sosialisasikan Keamanan dan Kelestarian Hutan kepada Masyarakat",
    "excerpt": "Perhutani KPH Purwakarta Sosialisasikan Keamanan dan Kelestarian Hutan kepada Masyarakat, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani KPH Purwakarta Sosialisasikan Keamanan dan Kelestarian Hutan kepada Masyarakat. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Sosialisasi",
    "image": "img/Picture53.jpg",
    "date": "2026-01-18",
    "author": "WK",
    "dateFormatted": "18 Januari 2026",
    "url": "berita53.html"
  },
  {
    "id": -946,
    "title": "Perhutani KPH Purwakarta Sosialisasikan Skema KKP dan KKPP",
    "excerpt": "Perhutani KPH Purwakarta Sosialisasikan Skema KKP dan KKPP, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani KPH Purwakarta Sosialisasikan Skema KKP dan KKPP. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Sosialisasi",
    "image": "img/Picture54.jpg",
    "date": "2026-01-27",
    "author": "WK",
    "dateFormatted": "27 Januari 2026",
    "url": "berita54.html"
  },
  {
    "id": -945,
    "title": "Perhutani KPH Purwakarta Fasilitasi Roadshow Paguyuban LMDH untuk Penguatan Kemitraan",
    "excerpt": "Perhutani KPH Purwakarta Fasilitasi Roadshow Paguyuban LMDH untuk Penguatan Kemitraan, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani KPH Purwakarta Fasilitasi Roadshow Paguyuban LMDH untuk Penguatan Kemitraan. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Kemitraan",
    "image": "img/Picture55.jpg",
    "date": "2026-01-08",
    "author": "WK",
    "dateFormatted": "08 Januari 2026",
    "url": "berita55.html"
  },
  {
    "id": -944,
    "title": "Pehutani KPH Purwakarta dan LMDH Gelar Patroli Bersama Cegah Gangguan Keamanan Hutan",
    "excerpt": "Pehutani KPH Purwakarta dan LMDH Gelar Patroli Bersama Cegah Gangguan Keamanan Hutan, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Pehutani KPH Purwakarta dan LMDH Gelar Patroli Bersama Cegah Gangguan Keamanan Hutan. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Lingkungan",
    "image": "img/Picture56.jpg",
    "date": "2026-01-12",
    "author": "WK",
    "dateFormatted": "12 Januari 2026",
    "url": "berita56.html"
  },
  {
    "id": -943,
    "title": "Perhutani KPH Purwakarta Serahkan Sharing Kayu Jabon Kepada PT Java Unggul Sejahtera",
    "excerpt": "Perhutani KPH Purwakarta Serahkan Sharing Kayu Jabon Kepada PT Java Unggul Sejahtera, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani KPH Purwakarta Serahkan Sharing Kayu Jabon Kepada PT Java Unggul Sejahtera. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Produksi Kayu",
    "image": "img/Picture57.jpg",
    "date": "2026-01-09",
    "author": "WK",
    "dateFormatted": "09 Januari 2026",
    "url": "berita57.html"
  },
  {
    "id": -942,
    "title": "Perhutani KPH Purwakarta Teken PKS Pemanfaatan Jasa Lingkungan Usaha Wisata Kuliner",
    "excerpt": "Perhutani KPH Purwakarta Teken PKS Pemanfaatan Jasa Lingkungan Usaha Wisata Kuliner, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani KPH Purwakarta Teken PKS Pemanfaatan Jasa Lingkungan Usaha Wisata Kuliner. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Wisata",
    "image": "img/Picture58.jpg",
    "date": "2026-01-15",
    "author": "WK",
    "dateFormatted": "15 Januari 2026",
    "url": "berita58.html"
  },
  {
    "id": -941,
    "title": "Perhutani Menerima Kunjungan LMDH Tapak Jabar, Perkuat Sinergi Pengelolaan Hutan",
    "excerpt": "Perhutani Menerima Kunjungan LMDH Tapak Jabar, Perkuat Sinergi Pengelolaan Hutan, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani Menerima Kunjungan LMDH Tapak Jabar, Perkuat Sinergi Pengelolaan Hutan. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Kemitraan",
    "image": "img/Picture59.png",
    "date": "2026-01-23",
    "author": "WK",
    "dateFormatted": "23 Januari 2026",
    "url": "berita59.html"
  },
  {
    "id": -940,
    "title": "Perhutani KPH Purwakarta laksanakan Closing Meeting PHL Tahun 2026",
    "excerpt": "Perhutani KPH Purwakarta laksanakan Closing Meeting PHL Tahun 2026, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani KPH Purwakarta laksanakan Closing Meeting PHL Tahun 2026. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Lingkungan",
    "image": "img/Picture60.jpg",
    "date": "2026-01-24",
    "author": "WK",
    "dateFormatted": "24 Januari 2026",
    "url": "berita60.html"
  },
  {
    "id": -939,
    "date": "2026-01-27",
    "author": "WK",
    "dateFormatted": "27 Januari 2026",
    "title": "Perhutani KPH Purwakarta Dukung Program Koperasi Desa Merah Putih di Kabupaten Purwakarta",
    "excerpt": "Perhutani KPH Purwakarta Dukung Program Koperasi Desa Merah Putih di Kabupaten Purwakarta, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani KPH Purwakarta Dukung Program Koperasi Desa Merah Putih di Kabupaten Purwakarta. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Pendidikan",
    "image": "img/Picture61.jpg",
    "url": "berita61.html"
  },
  {
    "id": -938,
    "date": "2026-01-28",
    "author": "WK",
    "dateFormatted": "28 Januari 2026",
    "title": "Perhutani Purwakarta Dengan PT.Temp Solusi Kreasi Menandatangani Perjanjian Perpanjangan Kerjasama",
    "excerpt": "Perhutani Purwakarta Dengan PT.Temp Solusi Kreasi Menandatangani Perjanjian Perpanjangan Kerjasama, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",  
    "content": "Perhutani Purwakarta Dengan PT.Temp Solusi Kreasi Menandatangani Perjanjian Perpanjangan Kerjasama. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Pendidikan",
    "image": "img/Picture62.jpg",
    "url": "berita62.html"
  },
  {
    "id": -937,
    "date": "2026-01-08",
    "author": "WK",
    "dateFormatted": "08 Januari 2026",
    "title": "Perhutani Sukabumi Hadiri Pelepasan Panen Raya Jagung Kuartal I 2026, Perkuat Ketahan Pangan Sukabumi",
    "excerpt": "Perhutani Sukabumi Hadiri Pelepasan Panen Raya Jagung Kuartal I 2026, Perkuat Ketahan Pangan Sukabumi, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani Sukabumi Hadiri Pelepasan Panen Raya Jagung Kuartal I 2026, Perkuat Ketahan Pangan Sukabumi. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Pendidikan",
    "image": "img/Picture63.jpg",
    "url": "berita63.html"
  },
  {
    "id": -936,
    "date": "2026-01-12",
    "author": "WK",
    "dateFormatted": "12 Januari 2026",
    "title": "Perhutani KPH Sukabumi Salurkan Ratusan Bibit Buah untuk Dukung Hari Bakti Desa Nasional 2026",
    "excerpt": "Perhutani KPH Sukabumi Salurkan Ratusan Bibit Buah untuk Dukung Hari Bakti Desa Nasional 2026, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani KPH Sukabumi Salurkan Ratusan Bibit Buah untuk Dukung Hari Bakti Desa Nasional 2026. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Pendidikan",
    "image": "img/Picture64.jpg",
    "url": "berita64.html"
  },
  {
    "id": -935,
    "date": "2026-01-20",
    "author": "WK",
    "dateFormatted": "20 Januari 2026",
    "title": "Perhutani KPH Sukabumi dan BPBD Kabupaten Sukabumi Perpanjang Kerja Sama Penanggulangan Bencana",
    "excerpt": "Perhutani KPH Sukabumi dan BPBD Kabupaten Sukabumi Perpanjang Kerja Sama Penanggulangan Bencana, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani KPH Sukabumi dan BPBD Kabupaten Sukabumi Perpanjang Kerja Sama Penanggulangan Bencana. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Pendidikan",
    "image": "img/Picture65.jpg",
    "url": "berita65.html"
  },
  {
    "id": -934,
    "date": "2026-01-12",
    "author": "WK",
    "dateFormatted": "12 Januari 2026",
    "title": "Perhutani KPH Sukabumi Bersama Mitra Sadap dan Warga Desa Bojonglopang Tanam Pohon Peringati Harlah ke-21",
    "excerpt": "Perhutani KPH Sukabumi Bersama Mitra Sadap dan Warga Desa Bojonglopang Tanam Pohon Peringati Harlah ke-21, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani KPH Sukabumi Bersama Mitra Sadap dan Warga Desa Bojonglopang Tanam Pohon Peringati Harlah ke-21. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Pendidikan",
    "image": "img/Picture66.jpg",
    "url": "berita66.html"
  },
  {
    "id": -933,
    "date": "2026-01-21",
    "author": "WK",
    "dateFormatted": "21 Januari 2026",
    "title": "Perhutani KPH Sukabumi Bersinergi dengan Damkar Sukabumi Perkuat Pengawasan APAR",
    "excerpt": "Perhutani KPH Sukabumi Bersinergi dengan Damkar Sukabumi Perkuat Pengawasan APAR, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani KPH Sukabumi Bersinergi dengan Damkar Sukabumi Perkuat Pengawasan APAR. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Pendidikan",
    "image": "img/Picture67.jpg",
    "url": "berita67.html"
  },
  {
    "id": -932,
    "date": "2026-01-22",
    "author": "WK",
    "dateFormatted": "22 Januari 2026",
    "title": "Perhutani Sukabumi Dukung Penguatan Ekonomi Desa Melalui Koperasi Desa Merah Putih",
    "excerpt": "Perhutani Sukabumi Dukung Penguatan Ekonomi Desa Melalui Koperasi Desa Merah Putih, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani Sukabumi Dukung Penguatan Ekonomi Desa Melalui Koperasi Desa Merah Putih. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Pendidikan",
    "image": "img/Picture68.jpg",
    "url": "berita68.html"
  },
  {
    "id": -931,
    "date": "2026-01-25",
    "author": "WK",
    "dateFormatted": "25 Januari 2026",
    "title": "Perhutani KPH Sukabumi Dukung Regenerasi, Pinsaka Pimpin Pelantikan Anggota Saka Wanabakti",
    "excerpt": "Perhutani KPH Sukabumi Dukung Regenerasi, Pinsaka Pimpin Pelantikan Anggota Saka Wanabakti, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani KPH Sukabumi Dukung Regenerasi, Pinsaka Pimpin Pelantikan Anggota Saka Wanabakti. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Pendidikan",
    "image": "img/Picture69.jpg",
    "url": "berita69.html"
  },
  {
    "id": -930,
    "date": "2026-01-27",
    "author": "WK",
    "dateFormatted": "27 Januari 2026",
    "title": "Perhutani KPH Sukabumi Bersama Pemkab Sukabumi Gelar Rapat Koordinasi Persiapan Tinjauan Lapangan Koperasi Desa Merah Putih",
    "excerpt": "Perhutani KPH Sukabumi Bersama Pemkab Sukabumi Gelar Rapat Koordinasi Persiapan Tinjauan Lapangan Koperasi Desa Merah Putih, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani KPH Sukabumi Bersama Pemkab Sukabumi Gelar Rapat Koordinasi Persiapan Tinjauan Lapangan Koperasi Desa Merah Putih. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Pendidikan",
    "image": "img/Picture70.jpg",
    "url": "berita70.html"
  },
  {
    "id": -929,
    "title": "Perhutani KPH Sumedang Tangani Pasca Longsor Desa Pamekarsari Dengan Penanaman Pohon Bersama Muspika Buahdua",
    "excerpt": "Perhutani KPH Sumedang Tangani Pasca Longsor Desa Pamekarsari Dengan Penanaman Pohon Bersama Muspika Buahdua, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani KPH Sumedang Tangani Pasca Longsor Desa Pamekarsari Dengan Penanaman Pohon Bersama Muspika Buahdua. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Pendidikan",
    "image": "img/Picture71.jpg",
    "date": "2026-01-09",
    "author": "WK",
    "dateFormatted": "09 Januari 2026",
    "url": "berita71.html"
  },
  {
    "id": -928,
    "title": "Perhutani KPH Tasikmalaya Dukung Gerakan Nasional GG Lestari 2026 di Pasir Datar Galunggung",
    "excerpt": "Perhutani Tasikmalaya Dukung Gerakan Nasional GG Lestari 2026 di Pasir Datar Galunggung, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani Tasikmalaya Dukung Gerakan Nasional GG Lestari 2026 di Pasir Datar Galunggung. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Pendidikan",
    "image": "img/Picture72.jpg",
    "date": "2026-01-05",
    "author": "WK",
    "dateFormatted": "05 Januari 2026",
    "url": "berita72.html"
  },
  {
    "id": -927,
    "title": "Perhutani Tasikmalaya Perkuat Kerja Sama Pemanfaatan Jasa Lingkungan Bersama Pemerintah Kabupaten Tasikmalaya",
    "excerpt": "Perhutani Tasikmalaya Perkuat Kerja Sama Pemanfaatan Jasa Lingkungan Bersama Pemerintah Kabupaten Tasikmalaya, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani Tasikmalaya Perkuat Kerja Sama Pemanfaatan Jasa Lingkungan Bersama Pemerintah Kabupaten Tasikmalaya. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Pendidikan",
    "image": "img/Picture73.jpg",
    "date": "2026-01-06",
    "author": "WK",
    "dateFormatted": "06 Januari 2026",
    "url": "berita73.html"
  },
  {
    "id": -926,
    "title": "Perhutani KPH Tasikmalaya Kembangkan Kebun Pangkas Pinus Bocor Getah",
    "excerpt": "Perhutani KPH Tasikmalaya Kembangkan Kebun Pangkas Pinus Bocor Getah, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani KPH Tasikmalaya Kembangkan Kebun Pangkas Pinus Bocor Getah. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Pendidikan",
    "image": "img/Picture74.jpg",
    "date": "2026-01-07",
    "author": "WK",
    "dateFormatted": "07 Januari 2026",
    "url": "berita74.html"
  },
  {
    "id": -925,
    "title": "Perhutani KPH Tasikmalaya Perkuat Legalitas Usaha Kopi LMDH Kahirupan",
    "excerpt": "Perhutani KPH Tasikmalaya Perkuat Legalitas Usaha Kopi LMDH Kahirupan, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani KPH Tasikmalaya Perkuat Legalitas Usaha Kopi LMDH Kahirupan. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Pendidikan",
    "image": "img/Picture75.jpg",
    "date": "2026-01-07",
    "author": "WK",
    "dateFormatted": "07 Januari 2026",
    "url": "berita75.html"
  },
  {
    "id": -924,
    "title": "Perhutani Tasikmalaya Hadiri Sosialisasi Percepatan Reforma Agraria di Karangjaya",
    "excerpt": "Perhutani Tasikmalaya Hadiri Sosialisasi Percepatan Reforma Agraria di Karangjaya, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani Tasikmalaya Hadiri Sosialisasi Percepatan Reforma Agraria di Karangjaya. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Pendidikan",
    "image": "img/Picture76.jpg",
    "date": "2026-01-14",
    "author": "WK",
    "dateFormatted": "14 Januari 2026",
    "url": "berita76.html"
  },
  {
    "id": -923,
    "title": "Perhutani KPH Tasikmalaya Laksanakan Penanaman Perdana Kebun Pangkas Pinus Bocor Getah",
    "excerpt": "Perhutani KPH Tasikmalaya Laksanakan Penanaman Perdana Kebun Pangkas Pinus Bocor Getah, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani KPH Tasikmalaya Laksanakan Penanaman Perdana Kebun Pangkas Pinus Bocor Getah. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Pendidikan",
    "image": "img/Picture77.jpg",
    "date": "2026-01-14",
    "author": "WK",
    "dateFormatted": "14 Januari 2026",
    "url": "berita77.html"
  },
  {
    "id": -922,
    "title": "Perhutani Tasikmalaya Bahas Pengembangan Wisata Curug Badak Hanoman Bersama LMDH Kahuripan",
    "excerpt": "Perhutani Tasikmalaya Bahas Pengembangan Wisata Curug Badak Hanoman Bersama LMDH Kahuripan, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani Tasikmalaya Bahas Pengembangan Wisata Curug Badak Hanoman Bersama LMDH Kahuripan. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Pendidikan",
    "image": "img/Picture78.jpg",
    "date": "2026-01-15",
    "author": "WK",
    "dateFormatted": "",
    "url": "berita78.html"
  },
  {
    "id": -921,
    "title": "Perhutani KPH Tasikmalaya Kukuhkan Anggota Saka Wanabakti Angkatan ke-42",
    "excerpt": "Perhutani KPH Tasikmalaya Kukuhkan Anggota Saka Wanabakti Angkatan ke-42, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani KPH Tasikmalaya Kukuhkan Anggota Saka Wanabakti Angkatan ke-42. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Pendidikan",
    "image": "img/Picture79.jpg",
    "date": "2026-01-19",
    "author": "WK",
    "dateFormatted": "19 Januari 2026",
    "url": "berita79.html"
  },
  {
    "id": -920,
    "title": "Perhutani KPH Tasikmalaya Dukung Program Tasik Hejo, Dampingi Bupati dan Wakil Bupati dalam Aksi Tanam Pohon",
    "excerpt": "Perhutani KPH Tasikmalaya Dukung Program Tasik Hejo, Dampingi Bupati dan Wakil Bupati dalam Aksi Tanam Pohon, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani KPH Tasikmalaya Dukung Program Tasik Hejo, Dampingi Bupati dan Wakil Bupati dalam Aksi Tanam Pohon. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Pendidikan",
    "image": "img/Picture80.jpg",
    "date": "2026-01-26",
    "author": "WK",
    "dateFormatted": "26 Januari 2026",
    "url": "berita80.html"
  },
  {
    "id": -919,
    "title": "Perhutani KPH Tasikmalaya Dukung Program Tasik Hejo, Dampingi Bupati dan Wakil Bupati dalam Aksi Tanam Pohon",
    "excerpt": "Perhutani KPH Tasikmalaya Dukung Program Tasik Hejo, Dampingi Bupati dan Wakil Bupati dalam Aksi Tanam Pohon, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani KPH Tasikmalaya Dukung Program Tasik Hejo, Dampingi Bupati dan Wakil Bupati dalam Aksi Tanam Pohon. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Pendidikan",
    "image": "img/Picture81.jpg",
    "date": "2026-01-29",
    "author": "WK",
    "dateFormatted": "29 Januari 2026",
    "url": "berita81.html"
  },
  {
    "id": -918,
    "title": "Perhutani KPH Tasikmalaya dan CDK Wilayah VI Terima Silaturahmi Semarak Priatim",
    "excerpt": "Perhutani KPH Tasikmalaya dan CDK Wilayah VI Terima Silaturahmi Semarak Priatim, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani KPH Tasikmalaya dan CDK Wilayah VI Terima Silaturahmi Semarak Priatim. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Pendidikan",
    "image": "img/Picture82.jpg",
    "date": "2026-01-29",
    "author": "WK",
    "dateFormatted": "29 Januari 2026",
    "url": "berita82.html"
  },
  {
    "id": -917,
    "title": "Perhutani KPH Tasikmalaya Hadiri Peringatan Harlah ke-21 SEKAR Perhutani DPD Tasikmalaya",
    "excerpt": "Perhutani KPH Tasikmalaya Hadiri Peringatan Harlah ke-21 SEKAR Perhutani DPD Tasikmalaya, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani KPH Tasikmalaya Hadiri Peringatan Harlah ke-21 SEKAR Perhutani DPD Tasikmalaya. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Pendidikan",
    "image": "img/Picture83.jpg",
    "date": "2026-01-29",
    "author": "WK",
    "dateFormatted": "29 Januari 2026",
    "url": "berita83.html"
  },
  {
    "id": -916,
    "title": "Dukung Ketahanan Pangan, KPH Sukabumi Hadiri Peluncuran Penanaman Jagung Serentak 750 Hektar di Palabuhanratu",
    "excerpt": "Dukung Ketahanan Pangan, KPH Sukabumi Hadiri Peluncuran Penanaman Jagung Serentak 750 Hektar di Palabuhanratu, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Dukung Ketahanan Pangan, KPH Sukabumi Hadiri Peluncuran Penanaman Jagung Serentak 750 Hektar di Palabuhanratu. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Pendidikan",
    "image": "img/Picture84.jpg",
    "date": "2026-01-29",
    "author": "WK",
    "dateFormatted": "29 Januari 2026",
    "url": "berita84.html"
  },
  {
    "id": -915,
    "title": "Dukung Swasembada Nasional, Perhutani Hadiri Penanaman Jagung Serentak Kuartal I di Bogor",
    "excerpt": "Dukung Swasembada Nasional, Perhutani Hadiri Penanaman Jagung Serentak Kuartal I di Bogor, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Dukung Swasembada Nasional, Perhutani Hadiri Penanaman Jagung Serentak Kuartal I di Bogor. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Pendidikan",
    "image": "img/Picture85.jpg",
    "date": "2026-01-29",
    "author": "WK",
    "dateFormatted": "29 Januari 2026",
    "url": "berita85.html"
  },
  {
    "id": -914,
    "title": "Perhutani Bogor Hadiri Penanaman Serentak Jagung Kuartal I Polri di Kecamatan Tenjo",
    "excerpt": "Perhutani Bogor Hadiri Penanaman Serentak Jagung Kuartal I Polri di Kecamatan Tenjo, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani Bogor Hadiri Penanaman Serentak Jagung Kuartal I Polri di Kecamatan Tenjo. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Pendidikan",
    "image": "img/Picture86.jpg",
    "date": "2026-01-29",
    "author": "WK",
    "dateFormatted": "29 Januari 2026",
    "url": "berita86.html"
  },
  {
    "id": -913,
    "title": "Perhutani KPH Indramayu Dukung Polres Indramayu Tanam Jagung Serentak",
    "excerpt": "Perhutani KPH Indramayu Dukung Polres Indramayu Tanam Jagung Serentak, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani KPH Indramayu Dukung Polres Indramayu Tanam Jagung Serentak. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Pendidikan",
    "image": "img/Picture87.jpg",
    "date": "2026-01-30",
    "author": "WK",
    "dateFormatted": "30 Januari 2026",
    "url": "berita87.html"
  },
  {
    "id": -912,
    "title": "Perhutani Kuningan Dukung Penanaman Jagung Serentak di Gunungkeling Kuningan",
    "excerpt": "Perhutani Kuningan Dukung Penanaman Jagung Serentak di Gunungkeling Kuningan, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani Kuningan Dukung Penanaman Jagung Serentak di Gunungkeling Kuningan. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Pendidikan",
    "image": "img/Picture88.jpg",
    "date": "2026-01-28",
    "author": "WK",
    "dateFormatted": "28 Januari 2026",
    "url": "berita88.html"
  },
  {
    "id": -911,
    "title": "Dukung Ketahanan Pangan, Perhutani Lakukan Peninjauan Lokasi KDMP di Cilimusari",
    "excerpt": "Dukung Ketahanan Pangan, Perhutani Lakukan Peninjauan Lokasi KDMP di Cilimusari, mendukung pengembangan wawasan dan keterampilan praktis",
    "content": "Dukung Ketahanan Pangan, Perhutani Lakukan Peninjauan Lokasi KDMP di Cilimusari. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Pendidikan",
    "image": "img/Picture89.jpg",
    "date": "2026-01-29",
    "author": "WK",
    "dateFormatted": "29 Januari 2026",
    "url": "berita89.html"
  },
  {
    "id": -910,
    "title": "Perhutani KPH Purwakarta Berikan Edukasi PUHH kepada Mahasiswa Universitas Hiroshima",
    "excerpt": "Perhutani KPH Purwakarta Berikan Edukasi PUHH kepada Mahasiswa Universitas Hiroshima, mendukung pengembangan wawasan dan keterampilan praktis di bidang kehutanan.",
    "content": "Perhutani KPH Purwakarta Berikan Edukasi PUHH kepada Mahasiswa Universitas Hiroshima. Kegiatan ini bertujuan memberikan pengalaman kerja nyata serta pengenalan lingkungan kerja kepada para peserta. Peserta mengikuti aktivitas pembelajaran dan pendampingan sesuai tugas dan fungsi Perhutani. Kegiatan dilaksanakan mulai 5 Januari hingga 5 Februari 2026. Perhutani berkomitmen mendukung dunia pendidikan dengan memberikan ruang pembelajaran aplikatif. Para peserta diharapkan memanfaatkan kesempatan untuk menambah wawasan, meningkatkan keterampilan, dan memahami etika kerja di lingkungan perusahaan.",
    "category": "Pendidikan",
    "image": "img/Picture90.jpg",
    "date": "2026-01-30",
    "author": "Redaksi",
    "dateFormatted": "30 Januari 2026",
    "url": "berita90.html"
  }
]
; }

// =============================================================================
// FILTERING & SORTING
// =============================================================================

/**
 * Sort articles berdasarkan id descending (id terbesar di atas)
 */
function sortArticlesByIdDesc(articles) {
  return articles.slice().sort((a, b) => (b.id || 0) - (a.id || 0));
}

/**
 * Filter articles berdasarkan category
 */
function filterByCategory(category) {
  activeCategory = category;
  currentPage = 1;
  
  if (!category || category === 'semua') {
    filteredArticles = [...allArticles];
  } else {
    filteredArticles = allArticles.filter(a => 
      a.category && a.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  applySearch();
  renderArticles();
  renderCategoryFilter();
}

/**
 * Search articles
 */
function filterBySearch(query) {
  searchQuery = query.toLowerCase();
  currentPage = 1;
  applySearch();
  renderArticles();
}

/**
 * Apply search filter ke filteredArticles
 */
function applySearch() {
  if (!searchQuery) {
    // Jika no search, use category filter
    if (!activeCategory || activeCategory === 'semua') {
      filteredArticles = [...allArticles];
    } else {
      filteredArticles = allArticles.filter(a => 
        a.category && a.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }
  } else {
    // Search di kategori yang di-filter
    let source = allArticles;
    
    if (activeCategory && activeCategory !== 'semua') {
      source = allArticles.filter(a => 
        a.category && a.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }
    
    filteredArticles = source.filter(a => 
      a.title.toLowerCase().includes(searchQuery) ||
      a.excerpt.toLowerCase().includes(searchQuery) ||
      a.content.toLowerCase().includes(searchQuery)
    );
  }
}

// =============================================================================
// RENDERING
// =============================================================================

/**
 * Render articles dengan pagination
 */
function renderArticles() {
  const startIdx = (currentPage - 1) * NEWS_CONFIG.ARTICLES_PER_PAGE;
  const endIdx = startIdx + NEWS_CONFIG.ARTICLES_PER_PAGE;
  const pageArticles = filteredArticles.slice(startIdx, endIdx);
  
  const container = document.getElementById('articles-container');
  
  if (!container) {
    console.warn('Element #articles-container tidak ditemukan');
    return;
  }
  
  // Clear container
  container.innerHTML = '';
  
  if (pageArticles.length === 0) {
    container.innerHTML = '<div class="alert alert-info">Tidak ada artikel yang ditemukan.</div>';
    document.getElementById('pagination-container').innerHTML = '';
    return;
  }
  
  // Render each article
  pageArticles.forEach(article => {
    const articleHTML = createArticleCard(article);
    container.innerHTML += articleHTML;
  });
  
  // Setup lazy loading jika enabled
  if (NEWS_CONFIG.LAZY_LOAD_images) {
    setupLazyLoading();
  }
  
  // Render pagination
  renderPagination();
  
  // Scroll ke top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Create HTML article card
 */
function createArticleCard(article) {
  const imageHtml = article.image 
    ? `<div class="card-img-top ratio-16x9"><img src="${article.image}" alt="${article.title}" loading="lazy" style="object-fit:cover;width:100%;height:100%;"></div>`
    : '<div class="card-img-top ratio-16x9 bg-light"></div>';
  
  const categoryHtml = article.category 
    ? `<a href="#" onclick="filterByCategory('${article.category}'); return false;" class="badge badge-secondary">${article.category}</a>`
    : '';
  
  return `
    <div class="col-md-6 col-lg-4 mb-4">
      <div class="card h-100 shadow-sm">
        ${imageHtml}
        <div class="card-body d-flex flex-column">
          <div class="mb-2">${categoryHtml}</div>
          <h5 class="card-title">
            <a href="${article.url}" class="text-decoration-none text-dark">
              ${article.title}
            </a>
          </h5>
          <p class="card-text text-muted small flex-grow-1">
            ${article.excerpt}
          </p>
          <div class="text-muted small mt-auto">
            <small>📅 ${article.dateFormatted}</small><br>
            <small>✍️ ${article.author}</small>
          </div>
        </div>
        <div class="card-footer bg-white border-top-0">
          <a href="${article.url}" class="btn btn-sm">Baca Selengkapnya →</a>
        </div>
      </div>
    </div>
  `;
}

/**
 * Render pagination controls
 */
function renderPagination() {
  const totalPages = Math.ceil(filteredArticles.length / NEWS_CONFIG.ARTICLES_PER_PAGE);
  const container = document.getElementById('pagination-container');
  
  if (!container || totalPages <= 1) {
    if (container) container.innerHTML = '';
    return;
  }
  
  let html = '<nav><ul class="pagination justify-content-center">';
  
  // Previous button
  if (currentPage > 1) {
    html += `
      <li class="page-item">
        <a class="page-link" href="#" onclick="goToPage(${currentPage - 1}); return false;">&lt;</a>
      </li>
    `;
  } else {
    html += '<li class="page-item disabled"><span class="page-link">&lt;</span></li>';
  }
  
  // Page numbers
  const paginationItems = getPaginationPages(totalPages, currentPage, 7);
  for (const item of paginationItems) {
    if (item.type === 'page') {
      if (item.page === currentPage) {
        html += `<li class="page-item active"><span class="page-link">${item.page}</span></li>`;
      } else {
        html += `
          <li class="page-item">
            <a class="page-link" href="#" onclick="goToPage(${item.page}); return false;">${item.page}</a>
          </li>
        `;
      }
    } else {
      html += '<li class="page-item disabled"><span class="page-link">...</span></li>';
    }
  }
  
  // Next button
  if (currentPage < totalPages) {
    html += `
      <li class="page-item">
        <a class="page-link" href="#" onclick="goToPage(${currentPage + 1}); return false;">&gt;</a>
      </li>
    `;
  } else {
    html += '<li class="page-item disabled"><span class="page-link">&gt;</span></li>';
  }
  
  html += '</ul></nav>';
  container.innerHTML = html;
}

/**
 * Build pagination page item list with maximum button count.
 */
function getPaginationPages(totalPages, currentPage, maxButtons = 7) {
  if (totalPages <= maxButtons) {
    return Array.from({ length: totalPages }, (_, i) => ({ type: 'page', page: i + 1 }));
  }

  const pages = [];

  if (currentPage <= 4) {
    for (let i = 1; i <= 5; i++) {
      pages.push({ type: 'page', page: i });
    }
    pages.push({ type: 'ellipsis' });
    pages.push({ type: 'page', page: totalPages });
    return pages;
  }

  if (currentPage >= totalPages - 3) {
    pages.push({ type: 'page', page: 1 });
    pages.push({ type: 'ellipsis' });
    for (let i = totalPages - 4; i <= totalPages; i++) {
      pages.push({ type: 'page', page: i });
    }
    return pages;
  }

  pages.push({ type: 'page', page: 1 });
  pages.push({ type: 'ellipsis' });
  pages.push({ type: 'page', page: currentPage - 1 });
  pages.push({ type: 'page', page: currentPage });
  pages.push({ type: 'page', page: currentPage + 1 });
  pages.push({ type: 'ellipsis' });
  pages.push({ type: 'page', page: totalPages });
  return pages;
}

// =============================================================================
// PAGINATION & NAVIGATION
// =============================================================================

/**
 * Go to specific page
 */
function goToPage(page) {
  const maxPage = Math.ceil(filteredArticles.length / NEWS_CONFIG.ARTICLES_PER_PAGE);
  if (page >= 1 && page <= maxPage) {
    currentPage = page;
    renderArticles();
  }
}

/**
 * Load more button handler (alternative to pagination)
 */
function loadMore() {
  const maxPage = Math.ceil(filteredArticles.length / NEWS_CONFIG.ARTICLES_PER_PAGE);
  if (currentPage < maxPage) {
    currentPage++;
    renderArticles();
  }
}

// =============================================================================
// CATEGORY FILTERING
// =============================================================================

/**
 * Get unique categories dari articles
 */
function getCategories() {
  const categories = new Set(allArticles
    .filter(a => a.category)
    .map(a => a.category)
  );
  return ['Semua', ...Array.from(categories).sort()];
}

/**
 * Render category filter buttons
 */
function renderCategoryFilter() {
  const container = document.getElementById('category-filter');
  if (!container) {
    console.warn('Element #category-filter tidak ditemukan');
    return;
  }
  const categories = getCategories();
  let html = '';
  categories.forEach(category => {
    let isActive = '';
    if (!activeCategory || activeCategory.toLowerCase() === 'semua') {
      isActive = category === 'Semua' ? 'active' : '';
    } else {
      isActive = (category.toLowerCase() === activeCategory.toLowerCase()) ? 'active' : '';
    }
    const value = category === 'Semua' ? 'semua' : category;
    html += `
      <button class="btn btn-sm mr-2 mb-2 ${isActive}"
              onclick="filterByCategory('${value}'); return false;">
        ${category}
      </button>
    `;
  });
  container.innerHTML = html;
}

// =============================================================================
// SEARCH
// =============================================================================

/**
 * Setup search input handler
 */
function setupSearchHandler() {
  const searchInput = document.getElementById('search-input');
  
  if (!searchInput) return;
  
  // Debounce search
  let searchTimeout;
  
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      filterBySearch(e.target.value);
    }, 300);
  });
}

/**
 * Show error message
 */
function showErrorMessage(message) {
  const container = document.getElementById('articles-container');
  if (container) {
    container.innerHTML = `<div class="alert alert-danger">${message}</div>`;
  }
}

// =============================================================================
// LAZY LOADING
// =============================================================================

/**
 * Setup lazy loading untuk images
 */
function setupLazyLoading() {
  if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.src;  // Start loading
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
}

// =============================================================================
// INITIALIZATION
// =============================================================================

/**
 * Initialize news loader saat DOM ready
 */
async function initializeNewsLoader() {
  debugLog('🚀 Initializing News Loader...');
  
  // Load articles.json
  const data = await loadArticlesJSON();
  
  if (!data || !data.articles) {
    debugLog('❌ Error: articles.json not found or invalid');
    return;
  }
  
  // Gabungkan dengan berita manual dan urutkan berdasarkan id terbaru terlebih dahulu
  allArticles = sortArticlesByIdDesc(data.articles.concat(getManualArticles()));
  filteredArticles = [...allArticles];
  
  debugLog(`✓ Loaded ${allArticles.length} articles total`);
  
  // Render UI
  renderArticles();
  renderCategoryFilter();
  setupSearchHandler();
  
  debugLog('✓ News Loader initialized');
}

// Run saat DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeNewsLoader);
} else {
  initializeNewsLoader();
}

// =============================================================================
// UTILITY FUNCTIONS (Global scope untuk onclick handlers)
// =============================================================================

// Export functions ke global scope untuk HTML onclick
window.loadArticlesJSON = loadArticlesJSON;
window.filterByCategory = filterByCategory;
window.filterBySearch = filterBySearch;
window.goToPage = goToPage;
window.loadMore = loadMore;



