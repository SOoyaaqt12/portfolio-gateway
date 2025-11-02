// ===== SPLASH SCREEN LOGIC =====
// HANYA UNTUK HOMEPAGE - Jangan include di halaman lain!
// Include di: index.html ONLY

// Prevent browser scroll restoration
if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
}

// Force scroll to top saat script dijalankan
window.scrollTo(0, 0);
document.documentElement.scrollTop = 0;

// Flag untuk track apakah splash screen sudah selesai
let splashScreenCompleted = false;

// ===== SPLASH SCREEN ANIMATION =====
window.addEventListener("load", () => {
  const splash = document.getElementById("splash-screen");

  if (!splash) {
    console.warn("⚠️ Splash screen element not found");
    return;
  }

  // Pastikan scroll di atas saat load
  window.scrollTo(0, 0);

  setTimeout(() => {
    // Tambah class fade-out untuk animasi
    splash.classList.add("fade-out");

    // Tunggu animasi selesai baru display none
    setTimeout(() => {
      splash.style.display = "none";
      splashScreenCompleted = true; // Set flag ke true setelah splash selesai
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

    // Update active navbar ke Home
    const navLinks = document.querySelectorAll(".navbar ul li a");
    navLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");
      if (href === "#home" || href === "index.html" || href === "#") {
        link.classList.add("active");
      }
    });

    console.log("🎬 Splash screen completed");
  }, 3000); // 3 detik splash screen
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

console.log("🎬 Splash screen script loaded");
