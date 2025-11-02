// ===================================================================
// TEMPLATE ARTIKEL BLOG
// Copy file ini untuk membuat artikel baru
// Ganti nama file menjadi article-X.js (X = nomor urut)
// ===================================================================

window.currentArticle = {
  // ===== METADATA =====
  id: "url-friendly-article-id", // WAJIB: ID unik untuk URL (lowercase, gunakan hyphen)
  // Contoh: 'belajar-react', 'tips-javascript'

  title: "Judul Artikel Anda", // WAJIB: Judul yang menarik dan deskriptif
  // Contoh: '10 Tips JavaScript untuk Developer Pemula'

  excerpt:
    "Ringkasan singkat artikel yang menarik perhatian pembaca. Maksimal 2-3 kalimat.",
  // WAJIB: Excerpt untuk ditampilkan di card blog
  // Tips: Buat menarik, highlight value yang didapat pembaca

  // ===== VISUAL =====
  thumbnail: "assets/blog/your-thumbnail.jpg", // WAJIB: Path ke gambar thumbnail
  // Recommended size: 1200x630px atau 16:9 ratio
  // Format: JPG, PNG, atau WebP
  // Compress sebelum upload untuk performa lebih baik

  // ===== KATEGORI & TAGS =====
  category: "tutorial", // WAJIB: Pilih salah satu kategori
  // Available categories:
  // - 'tutorial'         : Tutorial step-by-step
  // - 'web-development'  : Topik web development umum
  // - 'javascript'       : Khusus JavaScript
  // - 'tips'            : Tips & tricks
  // - 'review'          : Review tools/framework

  tags: ["Tag1", "Tag2", "Tag3", "Tag4"], // WAJIB: 3-5 tags relevan
  // Tips: Gunakan tags yang specific dan searchable
  // Contoh: ['React', 'Hooks', 'State Management', 'Frontend']

  // ===== AUTHOR INFO =====
  author: "Daffa Rafif Ramadhan", // Nama author

  date: "2025-11-01", // WAJIB: Tanggal publish (format: YYYY-MM-DD)

  readTime: "5 menit", // Estimasi waktu baca
  // Rumus: ~200 kata = 1 menit
  // Contoh: artikel 1000 kata ≈ 5 menit

  // ===== CONTENT =====
  content: `
    <!-- STRUKTUR ARTIKEL -->
    
    <h2>Pendahuluan</h2>
    <p>Paragraf pembuka yang menarik. Jelaskan apa yang akan dibahas dan mengapa penting.</p>
    
    <h2>Heading Utama 1</h2>
    <p>Konten paragraf normal dengan <strong>text tebal</strong> dan <em>text miring</em>.</p>
    
    <h3>Sub Heading</h3>
    <p>Penjelasan lebih detail tentang topik.</p>
    
    <!-- LISTS -->
    <h2>Daftar Poin-Poin Penting</h2>
    <ul>
      <li><strong>Poin 1:</strong> Penjelasan singkat poin pertama</li>
      <li><strong>Poin 2:</strong> Penjelasan singkat poin kedua</li>
      <li><strong>Poin 3:</strong> Penjelasan singkat poin ketiga</li>
    </ul>
    
    <!-- NUMBERED LISTS -->
    <h2>Langkah-Langkah</h2>
    <ol>
      <li>Langkah pertama dengan penjelasan detail</li>
      <li>Langkah kedua dengan penjelasan detail</li>
      <li>Langkah ketiga dengan penjelasan detail</li>
    </ol>
    
    <!-- CODE BLOCKS -->
    <h2>Contoh Kode</h2>
    <p>Berikut adalah contoh implementasi dalam JavaScript:</p>
    <pre><code>// Contoh kode JavaScript
function example() {
  const greeting = 'Hello World';
  console.log(greeting);
  return greeting;
}

// Panggil function
example();</code></pre>
    
    <!-- BLOCKQUOTE -->
    <blockquote>
      <p>💡 <strong>Pro Tip:</strong> Gunakan blockquote untuk highlight tips atau catatan penting yang ingin Anda tekankan.</p>
    </blockquote>
    
    <!-- IMAGES (jika perlu) -->
    <h2>Visual Example</h2>
    <p>Penjelasan sebelum gambar.</p>
    <img src="assets/blog/example-image.jpg" alt="Deskripsi gambar" style="width: 100%; border-radius: 12px; margin: 20px 0;" />
    <p style="text-align: center; color: var(--text-secondary); font-size: 0.9rem; margin-top: -10px;">Caption gambar jika perlu</p>
    
    <!-- TABLE (opsional) -->
    <h2>Perbandingan</h2>
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
      <thead>
        <tr style="background: var(--bg-secondary);">
          <th style="padding: 12px; border: 1px solid var(--border-color);">Fitur</th>
          <th style="padding: 12px; border: 1px solid var(--border-color);">Deskripsi</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 12px; border: 1px solid var(--border-color);">Item 1</td>
          <td style="padding: 12px; border: 1px solid var(--border-color);">Penjelasan</td>
        </tr>
        <tr>
          <td style="padding: 12px; border: 1px solid var(--border-color);">Item 2</td>
          <td style="padding: 12px; border: 1px solid var(--border-color);">Penjelasan</td>
        </tr>
      </tbody>
    </table>
    
    <!-- KESIMPULAN -->
    <h2>Kesimpulan</h2>
    <p>Ringkas poin-poin utama artikel. Berikan takeaway yang jelas untuk pembaca.</p>
    
    <p>Terima kasih sudah membaca! Jangan lupa share artikel ini jika bermanfaat. 🚀</p>
    
    <!-- CALL TO ACTION (opsional) -->
    <blockquote>
      <p>📚 <strong>Baca Juga:</strong> <a href="blog-detail.html?id=artikel-terkait">Judul Artikel Terkait</a></p>
    </blockquote>
  `,
};

// ===================================================================
// TIPS PENULISAN ARTIKEL YANG BAIK:
// ===================================================================
//
// 1. JUDUL: Buat judul yang SEO-friendly dan menarik
//    ✅ Good: "10 Tips JavaScript untuk Meningkatkan Performa Website"
//    ❌ Bad: "Tips JS"
//
// 2. EXCERPT: Ringkas tapi informatif (2-3 kalimat max)
//    ✅ Good: Jelaskan value yang didapat pembaca
//    ❌ Bad: Terlalu panjang atau terlalu pendek
//
// 3. STRUCTURE: Gunakan heading hierarchy (h2, h3)
//    - h2 untuk section utama
//    - h3 untuk sub-section
//    - Jangan skip level (h2 langsung ke h4)
//
// 4. PARAGRAF: Keep it short and scannable
//    - 2-4 kalimat per paragraf
//    - Gunakan bullet points untuk lists
//    - Break wall of text dengan heading/images
//
// 5. CODE: Format dengan benar
//    - Gunakan <pre><code> untuk code blocks
//    - Add comments di code untuk penjelasan
//    - Test code sebelum publish
//
// 6. IMAGES: Optimize sebelum upload
//    - Compress dengan TinyPNG atau similar
//    - Use descriptive alt text
//    - Recommended size: 1200px width max
//
// 7. LINKS: Internal & external
//    - Link ke artikel terkait
//    - Source ke dokumentasi resmi
//    - Open external links in new tab
//
// 8. PROOFREADING: Always check before publish
//    - Typos dan grammar
//    - Code yang working
//    - Links yang valid
//    - Images yang load
//
// ===================================================================
