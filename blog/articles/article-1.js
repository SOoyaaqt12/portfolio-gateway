// Article 1: Memulai dengan React
window.currentArticle = {
  id: "react-untuk-pemula",
  title: "Memulai Belajar React: Panduan Lengkap untuk Pemula",
  excerpt:
    "React adalah library JavaScript populer untuk membangun user interface. Pelajari dasar-dasar React dan mulai membangun aplikasi web modern.",
  thumbnail: "assets/blog/article-2.jpeg",
  category: "tutorial",
  tags: ["React", "JavaScript", "Web Development", "Frontend"],
  author: "Daffa Rafif Ramadhan",
  date: "2025-10-15",
  readTime: "8 menit",
  content: `
    <h2>Apa itu React?</h2>
    <p>React adalah library JavaScript yang dikembangkan oleh Facebook untuk membangun user interface yang interaktif dan dinamis. React menggunakan konsep component-based architecture yang membuat kode lebih modular dan mudah di-maintain.</p>
    
    <h2>Mengapa Memilih React?</h2>
    <ul>
      <li><strong>Component-Based:</strong> Memudahkan pengembangan dengan membagi UI menjadi komponen-komponen kecil</li>
      <li><strong>Virtual DOM:</strong> Performa yang optimal dengan update UI yang efisien</li>
      <li><strong>Rich Ecosystem:</strong> Banyak library dan tools pendukung</li>
      <li><strong>Komunitas Besar:</strong> Mudah menemukan solusi dan dokumentasi</li>
    </ul>
    
    <h2>Instalasi React</h2>
    <p>Cara termudah untuk memulai project React adalah menggunakan Create React App:</p>
    <pre><code>npx create-react-app my-app
cd my-app
npm start</code></pre>
    
    <h2>Membuat Component Pertama</h2>
    <p>Component adalah building block dari aplikasi React. Berikut contoh component sederhana:</p>
    <pre><code>function Welcome() {
  return <h1>Hello, React!</h1>;
}

export default Welcome;</code></pre>
    
    <h2>Props dan State</h2>
    <p>Props digunakan untuk mengirim data dari parent ke child component, sedangkan State digunakan untuk menyimpan data yang bisa berubah dalam component.</p>
    
    <h2>Kesimpulan</h2>
    <p>React adalah tools yang powerful untuk membangun aplikasi web modern. Dengan memahami konsep dasar seperti components, props, dan state, Anda sudah bisa mulai membangun aplikasi React pertama Anda!</p>
  `,
};
