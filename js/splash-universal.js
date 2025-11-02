// ===== UNIVERSAL SPLASH SCREEN LOGIC =====
// INCLUDE DI SEMUA HALAMAN
// Splash screen muncul saat load/reload, TIDAK muncul saat navigasi antar halaman

// ===== INTERCEPT NAVIGATION SEBELUM LOAD =====
// Set flag SEBELUM halaman di-unload
(function() {
  // Cek apakah datang dari navigasi internal
  const isFromNavigation = sessionStorage.getItem('isNavigating') === 'true';
  
  // Jika dari navigasi, langsung hide splash
  if (isFromNavigation) {
    console.log('🎬 From navigation - hiding splash immediately');
    const splash = document.getElementById('splash-screen');
    if (splash) {
      splash.style.display = 'none';
    }
    document.body.classList.remove('loading');
    sessionStorage.removeItem('isNavigating');
  }
})();

// Prevent browser scroll restoration
if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
}

// Force scroll to top
window.scrollTo(0, 0);
document.documentElement.scrollTop = 0;

// Flag untuk track apakah splash screen sudah selesai
let splashScreenCompleted = false;

// ===== SETUP NAVIGATION INTERCEPTOR IMMEDIATELY =====
// Jalankan segera, tidak tunggu DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupNavigationInterceptor);
} else {
  setupNavigationInterceptor();
}

function setupNavigationInterceptor() {
  // Intercept ALL clicks on document
  document.addEventListener('click', (e) => {
    // Cari anchor tag terdekat
    const link = e.target.closest('a');
    
    if (!link) return;
    
    const href = link.getAttribute('href');
    
    // Cek apakah ini internal link
    const internalPages = [
      'index.html',
      'portfolio.html', 
      'certificates.html',
      'blog.html',
      'contact.html',
      'blog-detail.html'
    ];
    
    const isInternal = internalPages.some(page => href && href.includes(page));
    
    if (isInternal) {
      // Tandai bahwa user sedang navigasi
      sessionStorage.setItem('isNavigating', 'true');
      console.log('🔗 Internal link clicked:', href);
    }
  }, true); // Use capture phase
}

// ===== SPLASH SCREEN ANIMATION =====
window.addEventListener("load", () => {
  const splash = document.getElementById("splash-screen");

  if (!splash) {
    console.warn("⚠️ Splash screen element not found");
    sessionStorage.removeItem('isNavigating');
    return;
  }

  // Cek apakah datang dari navigasi
  const isFromNavigation = sessionStorage.getItem('isNavigating') === 'true';

  // Pastikan scroll di atas
  window.scrollTo(0, 0);

  // ===== SKIP SPLASH JIKA DARI NAVIGASI =====
  if (isFromNavigation) {
    console.log("🎬 Navigation detected - skipping splash screen");
    
    splash.style.display = "none";
    document.body.classList.remove("loading");
    splashScreenCompleted = true;
    
    // Clear flag
    sessionStorage.removeItem('isNavigating');
    
    // Force scroll
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }, 50);
    
    return;
  }

  // ===== TAMPILKAN SPLASH (LOAD/RELOAD/EXTERNAL) =====
  console.log("🎬 Page loaded - showing splash screen");
  
  // Clear flag (jaga-jaga)
  sessionStorage.removeItem('isNavigating');
  
  setTimeout(() => {
    splash.classList.add("fade-out");

    setTimeout(() => {
      splash.style.display = "none";
      splashScreenCompleted = true;
    }, 500);

    document.body.classList.remove("loading");

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 50);

    console.log("🎬 Splash screen completed");
  }, 2000); // 2 detik
});

// ===== VISIBILITY CHANGE HANDLER =====
document.addEventListener("visibilitychange", () => {
  if (!document.hidden && !splashScreenCompleted) {
    const splash = document.getElementById("splash-screen");
    if (splash && splash.style.display !== "none") {
      window.scrollTo(0, 0);
    }
  }
});

console.log("🎬 Universal splash screen script loaded");