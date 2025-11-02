// ===== UNIVERSAL SPLASH SCREEN LOGIC =====
// INCLUDE DI SEMUA HALAMAN
// Splash screen muncul saat load/reload, TIDAK muncul saat navigasi antar halaman

// ===== CHECK NAVIGATION TYPE =====
// performance.navigation.type:
// 0 = Normal navigation (click link)
// 1 = Reload (F5 / refresh button)
// 2 = Back/Forward button
const navigationType = performance.getPerformance ? performance.getPerformance().navigation.type : performance.navigation.type;

// Cek apakah datang dari navigasi internal (klik link dalam website)
const isFromNavigation = sessionStorage.getItem('isNavigating') === 'true';

// Prevent browser scroll restoration
if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
}

// Force scroll to top saat script dijalankan
window.scrollTo(0, 0);
document.documentElement.scrollTop = 0;

// Flag untuk track apakah splash screen sudah selesai
let splashScreenCompleted = false;

// ===== INTERCEPT ALL NAVIGATION LINKS =====
// Tandai bahwa user sedang navigasi (klik link)
document.addEventListener("DOMContentLoaded", () => {
  // Tandai semua link internal
  const internalLinks = document.querySelectorAll('a[href^="index.html"], a[href^="portfolio.html"], a[href^="certificates.html"], a[href^="blog.html"], a[href^="contact.html"], a[href="./"], a[href^="blog-detail.html"]');
  
  internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Tandai bahwa user sedang navigasi
      sessionStorage.setItem('isNavigating', 'true');
      console.log('🔗 Navigation link clicked - splash will be skipped on next page');
    });
  });
});

// ===== SPLASH SCREEN ANIMATION =====
window.addEventListener("load", () => {
  const splash = document.getElementById("splash-screen");

  if (!splash) {
    console.warn("⚠️ Splash screen element not found");
    // Clear flag jika splash tidak ada
    sessionStorage.removeItem('isNavigating');
    return;
  }

  // Pastikan scroll di atas saat load
  window.scrollTo(0, 0);

  // ===== CEK: APAKAH DARI NAVIGASI INTERNAL? =====
  if (isFromNavigation) {
    console.log("🎬 Navigating from internal link - skipping splash screen");
    
    // Langsung hide splash screen tanpa animasi
    splash.style.display = "none";
    document.body.classList.remove("loading");
    splashScreenCompleted = true;
    
    // Clear navigation flag
    sessionStorage.removeItem('isNavigating');
    
    // Force scroll ke atas
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }, 50);
    
    return; // EXIT - tidak tampilkan splash screen
  }

  // ===== TAMPILKAN SPLASH SCREEN (LOAD/RELOAD) =====
  console.log("🎬 Page loaded/reloaded - showing splash screen");
  console.log(`📊 Navigation type: ${navigationType} (0=link, 1=reload, 2=back/forward)`);
  
  // Clear navigation flag (jaga-jaga)
  sessionStorage.removeItem('isNavigating');
  
  setTimeout(() => {
    // Tambah class fade-out untuk animasi
    splash.classList.add("fade-out");

    // Tunggu animasi selesai baru display none
    setTimeout(() => {
      splash.style.display = "none";
      splashScreenCompleted = true;
    }, 500); // Sesuai dengan durasi transition di CSS

    // Remove loading class dari body (enable scroll)
    document.body.classList.remove("loading");

    // Force scroll ke atas setelah splash hilang
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });

      // Double check scroll position
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 50);

    console.log("🎬 Splash screen completed");
  }, 2000); // 2 detik splash screen (sesuaikan durasi)
});

// ===== VISIBILITY CHANGE HANDLER =====
// Hanya force scroll jika splash screen belum selesai
document.addEventListener("visibilitychange", () => {
  if (!document.hidden && !splashScreenCompleted) {
    // Hanya scroll ke atas jika splash screen masih aktif/belum selesai
    const splash = document.getElementById("splash-screen");
    if (splash && splash.style.display !== "none") {
      window.scrollTo(0, 0);
    }
  }
});

// ===== CLEANUP ON UNLOAD =====
// Jaga-jaga jika user langsung close tab/window
window.addEventListener('beforeunload', () => {
  // Jangan clear flag, biarkan untuk deteksi di page berikutnya
});

console.log("🎬 Universal splash screen script loaded");
console.log(`🎬 Is from navigation: ${isFromNavigation}`);