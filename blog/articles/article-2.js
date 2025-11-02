// Article 2: Tips CSS Modern
window.currentArticle = {
  id: "tips-css-modern",
  title: "10 Tips CSS Modern yang Harus Kamu Ketahui di 2025",
  excerpt:
    "CSS terus berkembang dengan fitur-fitur baru yang memudahkan styling. Berikut adalah 10 tips CSS modern yang akan meningkatkan skill frontend kamu.",
  thumbnail: "assets/blog/CSS.jpeg",
  category: "tips",
  tags: ["CSS", "Web Development", "Frontend", "Tips"],
  author: "Daffa Rafif Ramadhan",
  date: "2025-10-20",
  readTime: "6 menit",
  content: `
    <h2>1. CSS Grid Layout</h2>
    <p>CSS Grid adalah sistem layout 2D yang powerful untuk membuat layout kompleks dengan mudah:</p>
    <pre><code>.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}</code></pre>
    
    <h2>2. Flexbox untuk Alignment</h2>
    <p>Flexbox sangat berguna untuk alignment dan distribusi space:</p>
    <pre><code>.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}</code></pre>
    
    <h2>3. CSS Variables (Custom Properties)</h2>
    <p>Gunakan CSS variables untuk nilai yang sering digunakan:</p>
    <pre><code>:root {
  --primary-color: #0077ff;
  --spacing: 16px;
}

.button {
  background: var(--primary-color);
  padding: var(--spacing);
}</code></pre>
    
    <h2>4. Clamp() untuk Responsive Typography</h2>
    <p>Function clamp() membuat typography responsive tanpa media queries:</p>
    <pre><code>h1 {
  font-size: clamp(1.5rem, 5vw, 3rem);
}</code></pre>
    
    <h2>5. Aspect Ratio</h2>
    <p>Maintain aspect ratio dengan property baru:</p>
    <pre><code>.video-container {
  aspect-ratio: 16 / 9;
}</code></pre>
    
    <h2>6. Container Queries</h2>
    <p>Query berdasarkan ukuran container, bukan viewport:</p>
    <pre><code>@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}</code></pre>
    
    <h2>7. Backdrop Filter</h2>
    <p>Buat efek blur dan filter pada background:</p>
    <pre><code>.glass {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1);
}</code></pre>
    
    <h2>8. Scroll Snap</h2>
    <p>Buat scroll experience yang smooth:</p>
    <pre><code>.container {
  scroll-snap-type: x mandatory;
}

.item {
  scroll-snap-align: start;
}</code></pre>
    
    <h2>9. Has() Selector</h2>
    <p>Style parent berdasarkan child yang ada:</p>
    <pre><code>.card:has(img) {
  padding: 0;
}</code></pre>
    
    <h2>10. Logical Properties</h2>
    <p>Gunakan logical properties untuk support multi-directional text:</p>
    <pre><code>.element {
  margin-inline-start: 20px;
  padding-block: 10px;
}</code></pre>
    
    <h2>Kesimpulan</h2>
    <p>CSS modern memberikan banyak fitur yang memudahkan development. Mulai gunakan tips-tips ini dalam project kamu untuk code yang lebih clean dan maintainable!</p>
  `,
};
