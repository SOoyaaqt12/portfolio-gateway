// ===== BLOG DETAIL SYSTEM =====

const articleFiles = [
  "blog/articles/article-1.js",
  "blog/articles/article-2.js",
  "blog/articles/article-3.js",
];

let currentArticle = null;
let allArticles = [];

// ===== GET ARTICLE ID FROM URL =====
function getArticleIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

// ===== LOAD ALL ARTICLES =====
async function loadAllArticles() {
  try {
    const promises = articleFiles.map((file) => loadArticleFile(file));
    const results = await Promise.all(promises);
    allArticles = results.filter((article) => article !== null);
    return allArticles;
  } catch (error) {
    console.error("Error loading articles:", error);
    return [];
  }
}

// ===== LOAD SINGLE ARTICLE FILE =====
function loadArticleFile(filePath) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = filePath;

    script.onload = () => {
      if (window.currentArticle) {
        const article = { ...window.currentArticle };
        delete window.currentArticle;
        resolve(article);
      } else {
        resolve(null);
      }
    };

    script.onerror = () => {
      console.warn(`Failed to load ${filePath}`);
      resolve(null);
    };

    document.head.appendChild(script);
  });
}

// ===== FIND AND RENDER ARTICLE =====
async function findAndRenderArticle() {
  const articleId = getArticleIdFromURL();

  if (!articleId) {
    showError("Artikel tidak ditemukan");
    return;
  }

  // Load all articles
  await loadAllArticles();

  // Find the article
  currentArticle = allArticles.find((article) => article.id === articleId);

  if (!currentArticle) {
    showError("Artikel tidak ditemukan");
    return;
  }

  // Render article
  renderArticle(currentArticle);

  // Load related articles
  loadRelatedArticles(currentArticle);
}

// ===== RENDER ARTICLE =====
function renderArticle(article) {
  // Update page title
  document.getElementById(
    "pageTitle"
  ).textContent = `${article.title} - Daffa Rafif Ramadhan`;

  // Update article header
  document.getElementById("articleTitle").textContent = article.title;
  document.getElementById("articleCategory").textContent = getCategoryLabel(
    article.category
  );
  document.getElementById("articleAuthor").textContent = article.author;
  document.getElementById("articleDate").textContent = formatDate(article.date);
  document.getElementById("articleReadTime").textContent = article.readTime;

  // Update thumbnail
  const thumbnail = document.getElementById("articleThumbnail");
  thumbnail.src = article.thumbnail;
  thumbnail.alt = article.title;

  // Update tags
  const tagsContainer = document.getElementById("articleTags");
  tagsContainer.innerHTML = article.tags
    .map((tag) => `<span class="tag">#${tag}</span>`)
    .join("");

  // Update content
  document.getElementById("articleContent").innerHTML = article.content;

  // Add syntax highlighting if needed
  highlightCode();
}

// ===== LOAD RELATED ARTICLES =====
function loadRelatedArticles(article) {
  // Find articles with similar tags or category
  const related = allArticles
    .filter((a) => a.id !== article.id)
    .filter((a) => {
      // Same category or has matching tags
      return (
        a.category === article.category ||
        a.tags.some((tag) => article.tags.includes(tag))
      );
    })
    .slice(0, 3); // Limit to 3 articles

  const relatedContainer = document.getElementById("relatedArticles");

  if (related.length === 0) {
    relatedContainer.innerHTML = "<p>Tidak ada artikel terkait</p>";
    return;
  }

  relatedContainer.innerHTML = related
    .map(
      (a) => `
    <a href="blog-detail.html?id=${a.id}" class="related-card">
      <img src="${a.thumbnail}" alt="${a.title}" />
      <div class="related-content">
        <h3>${a.title}</h3>
        <p>${a.excerpt}</p>
        <span class="read-more-small">Baca →</span>
      </div>
    </a>
  `
    )
    .join("");
}

// ===== SHARE FUNCTIONS =====
function shareToTwitter() {
  if (!currentArticle) return;
  const url = window.location.href;
  const text = encodeURIComponent(currentArticle.title);
  window.open(
    `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
    "_blank"
  );
}

function shareToWhatsApp() {
  if (!currentArticle) return;
  const url = window.location.href;
  const text = encodeURIComponent(`${currentArticle.title}\n\n${url}`);
  window.open(`https://wa.me/?text=${text}`, "_blank");
}

function copyLink() {
  const url = window.location.href;
  navigator.clipboard
    .writeText(url)
    .then(() => {
      alert("✅ Link berhasil disalin!");
    })
    .catch(() => {
      alert("❌ Gagal menyalin link");
    });
}

// ===== UTILITY FUNCTIONS =====
function getCategoryLabel(category) {
  const labels = {
    tutorial: "Tutorial",
    "web-development": "Web Development",
    javascript: "JavaScript",
    tips: "Tips & Tricks",
    review: "Review",
  };
  return labels[category] || category;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("id-ID", options);
}

function showError(message) {
  const container = document.querySelector(".article-container");
  if (container) {
    container.innerHTML = `
      <div class="error-message">
        <h2>❌ ${message}</h2>
        <p>Artikel yang Anda cari tidak ditemukan atau telah dihapus.</p>
        <a href="blog.html" class="btn btn-primary">← Kembali ke Blog</a>
      </div>
    `;
  }
}

function highlightCode() {
  // Add syntax highlighting for code blocks
  const codeBlocks = document.querySelectorAll("pre code");
  codeBlocks.forEach((block) => {
    block.classList.add("language-javascript");
  });
}

// ===== INITIALIZE =====
document.addEventListener("DOMContentLoaded", () => {
  findAndRenderArticle();
});
