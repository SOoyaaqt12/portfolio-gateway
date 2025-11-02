// ===== BLOG SYSTEM =====
// Sistem blog yang memuat artikel dari file JS terpisah

// Daftar file artikel - hanya berisi referensi ke file
const articleFiles = [
  "blog/articles/article-1.js",
  "blog/articles/article-2.js",
  "blog/articles/article-3.js",
  // Tambahkan file artikel baru di sini
];

let allArticles = [];
let currentCategory = "all";
let currentPage = 1;
const articlesPerPage = 6;

// ===== LOAD ARTICLES FROM FILES =====
async function loadArticles() {
  console.log("📚 Loading articles...");

  try {
    // Load semua artikel dari file terpisah
    const promises = articleFiles.map((file) => loadArticleFile(file));
    const results = await Promise.all(promises);

    // Filter artikel yang berhasil dimuat
    allArticles = results.filter((article) => article !== null);

    // Sort berdasarkan tanggal terbaru
    allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));

    console.log(`✅ ${allArticles.length} articles loaded`);

    // Render blog grid
    renderBlogGrid();
    setupFilters();
    setupSearch();
  } catch (error) {
    console.error("Error loading articles:", error);
    showError("Gagal memuat artikel. Silakan refresh halaman.");
  }
}

// ===== LOAD SINGLE ARTICLE FILE =====
function loadArticleFile(filePath) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = filePath;

    script.onload = () => {
      // Artikel akan di-export ke window.currentArticle
      if (window.currentArticle) {
        const article = { ...window.currentArticle };
        delete window.currentArticle; // Clear untuk artikel berikutnya
        resolve(article);
      } else {
        console.warn(`No article data found in ${filePath}`);
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

// ===== RENDER BLOG GRID =====
function renderBlogGrid() {
  const blogGrid = document.getElementById("blogGrid");
  if (!blogGrid) return;

  // Filter artikel berdasarkan kategori
  let filteredArticles =
    currentCategory === "all"
      ? allArticles
      : allArticles.filter((article) => article.category === currentCategory);

  // Pagination
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

  // Clear grid
  blogGrid.innerHTML = "";

  if (paginatedArticles.length === 0) {
    blogGrid.innerHTML = `
      <div class="no-articles">
        <p>📭 Tidak ada artikel yang ditemukan</p>
      </div>
    `;
    return;
  }

  // Render artikel
  paginatedArticles.forEach((article, index) => {
    const articleCard = createArticleCard(article, index);
    blogGrid.appendChild(articleCard);
  });

  // Render pagination
  renderPagination(filteredArticles.length);
}

// ===== CREATE ARTICLE CARD =====
function createArticleCard(article, index) {
  const card = document.createElement("div");
  card.className = "blog-card";
  card.style.animationDelay = `${index * 0.1}s`;

  card.innerHTML = `
    <div class="blog-image">
      <img src="${article.thumbnail}" alt="${article.title}" loading="lazy" />
      <div class="blog-category">${getCategoryLabel(article.category)}</div>
    </div>
    <div class="blog-content">
      <div class="blog-meta">
        <span class="blog-date">📅 ${formatDate(article.date)}</span>
        <span class="blog-read-time">⏱️ ${article.readTime}</span>
      </div>
      <h3>${article.title}</h3>
      <p>${article.excerpt}</p>
      <div class="blog-footer">
        <div class="blog-tags">
          ${article.tags
            .slice(0, 3)
            .map((tag) => `<span class="tag">#${tag}</span>`)
            .join("")}
        </div>
        <a href="blog-detail.html?id=${article.id}" class="read-more">
          Baca Selengkapnya →
        </a>
      </div>
    </div>
  `;

  return card;
}

// ===== SETUP FILTERS =====
function setupFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update active state
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Update current category
      currentCategory = btn.getAttribute("data-category");
      currentPage = 1; // Reset ke halaman pertama

      // Re-render grid
      renderBlogGrid();
    });
  });
}

// ===== SETUP SEARCH =====
function setupSearch() {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();

    if (searchTerm === "") {
      renderBlogGrid();
      return;
    }

    // Filter artikel berdasarkan search term
    const filteredArticles = allArticles.filter((article) => {
      return (
        article.title.toLowerCase().includes(searchTerm) ||
        article.excerpt.toLowerCase().includes(searchTerm) ||
        article.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
      );
    });

    // Render filtered results
    renderSearchResults(filteredArticles);
  });
}

// ===== RENDER SEARCH RESULTS =====
function renderSearchResults(articles) {
  const blogGrid = document.getElementById("blogGrid");
  if (!blogGrid) return;

  blogGrid.innerHTML = "";

  if (articles.length === 0) {
    blogGrid.innerHTML = `
      <div class="no-articles">
        <p>🔍 Tidak ada artikel yang cocok dengan pencarian</p>
      </div>
    `;
    document.getElementById("pagination").innerHTML = "";
    return;
  }

  articles.forEach((article, index) => {
    const articleCard = createArticleCard(article, index);
    blogGrid.appendChild(articleCard);
  });

  // Hide pagination saat search
  document.getElementById("pagination").innerHTML = "";
}

// ===== PAGINATION =====
function renderPagination(totalArticles) {
  const pagination = document.getElementById("pagination");
  if (!pagination) return;

  const totalPages = Math.ceil(totalArticles / articlesPerPage);

  if (totalPages <= 1) {
    pagination.innerHTML = "";
    return;
  }

  let paginationHTML = "";

  // Previous button
  if (currentPage > 1) {
    paginationHTML += `<button class="page-btn" onclick="changePage(${
      currentPage - 1
    })">← Prev</button>`;
  }

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    if (i === currentPage) {
      paginationHTML += `<button class="page-btn active">${i}</button>`;
    } else {
      paginationHTML += `<button class="page-btn" onclick="changePage(${i})">${i}</button>`;
    }
  }

  // Next button
  if (currentPage < totalPages) {
    paginationHTML += `<button class="page-btn" onclick="changePage(${
      currentPage + 1
    })">Next →</button>`;
  }

  pagination.innerHTML = paginationHTML;
}

function changePage(page) {
  currentPage = page;
  renderBlogGrid();

  // Scroll to top of blog grid
  document
    .getElementById("blogGrid")
    .scrollIntoView({ behavior: "smooth", block: "start" });
}

// ===== UTILITY FUNCTIONS =====
function getCategoryLabel(category) {
  const labels = {
    tutorial: "Tutorial",
    "web-development": "Web Dev",
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
  const blogGrid = document.getElementById("blogGrid");
  if (blogGrid) {
    blogGrid.innerHTML = `
      <div class="error-message">
        <p>❌ ${message}</p>
      </div>
    `;
  }
}

// ===== INITIALIZE =====
document.addEventListener("DOMContentLoaded", () => {
  loadArticles();
});
