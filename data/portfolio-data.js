// portfolio-data.js
// ===== PRELOAD IMAGES =====
function preloadPortfolioImages() {
  console.log('🖼️ Preloading portfolio images...');
  
  portfolioData.forEach(project => {
    const img = new Image();
    img.src = project.image;
  });
  
  console.log('✅ All portfolio images preloaded');
}

// ===== DYNAMIC PORTFOLIO RENDERING =====
function renderPortfolio() {
  const portfolioGrid = document.querySelector('.portfolio-grid');
  
  if (!portfolioGrid) return;
  
  portfolioGrid.innerHTML = '';
  
  portfolioData.forEach((project, index) => {
    const portfolioCard = document.createElement('div');
    portfolioCard.className = 'portfolio-card';
    portfolioCard.style.animationDelay = `${(index + 1) * 0.1}s`;
    
    portfolioCard.innerHTML = `
      <div class="portfolio-image">
        <img src="${project.image}" alt="${project.title}" loading="eager" />
        <div class="portfolio-overlay">
          <a href="${project.link}" target="_blank" class="view-project">Lihat Project</a>
        </div>
      </div>
      <div class="portfolio-content">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      </div>
    `;
    
    portfolioGrid.appendChild(portfolioCard);
  });
  
  // Reinitialize background blur setelah cards di-render
  setTimeout(() => {
    initPortfolioBackgroundBlur();
  }, 100);
}

// ===== BACKGROUND BLUR EFFECT =====
function initPortfolioBackgroundBlur() {
  const blurDivs = document.querySelectorAll('.portfolio-section .background-blur');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  if (blurDivs.length >= 2 && portfolioCards.length > 0) {
    let activeBlur = blurDivs[0];
    let inactiveBlur = blurDivs[1];

    portfolioCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        const imgSrc = card.querySelector('.portfolio-image img').getAttribute('src');
        inactiveBlur.style.backgroundImage = `url(${imgSrc})`;
        inactiveBlur.classList.add('active');
        activeBlur.classList.remove('active');
        [activeBlur, inactiveBlur] = [inactiveBlur, activeBlur];
      });

      card.addEventListener('mouseleave', () => {
        setTimeout(() => {
          const hoveredCard = document.querySelector('.portfolio-card:hover');
          if (!hoveredCard) {
            blurDivs.forEach(blur => blur.classList.remove('active'));
          }
        }, 100);
      });
    });
  }
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
  // Preload gambar terlebih dahulu
  preloadPortfolioImages();
  
  // Render portfolio
  renderPortfolio();
});