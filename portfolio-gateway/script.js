// Ambil semua link menu navbar
const navLinks = document.querySelectorAll(".navbar ul li a");
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    // Hapus class active dari semua link
    navLinks.forEach((l) => l.classList.remove("active"));
    // Tambahkan class active ke link yang diklik
    this.classList.add("active");
  });
});

// Inisialisasi VANTA.GLOBE pada section #home
window.addEventListener("DOMContentLoaded", function () {
  VANTA.GLOBE({
    el: "#home",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 1.0,
    color: 0x0077ff,
    color2: 0x00e1ff,
    backgroundColor: 0xffffff,
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar ul li a");

  window.addEventListener("scroll", () => {
    let currentSection = null;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollY = window.pageYOffset;

      // Tambahkan batas atas bawah (misalnya 150px buffer)
      if (scrollY >= sectionTop - 150 && scrollY < sectionTop + sectionHeight - 150) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");

      if (currentSection && link.getAttribute("href").includes(currentSection)) {
        link.classList.add("active");
      }
    });
  });
});

// fitur hover card porto backgroud sesuai card
document.addEventListener("DOMContentLoaded", () => {
  const portfolioSection = document.querySelector('.portfolio-section');

  // Buat 2 div blur di portfolio section secara dinamis
  const blur1 = document.createElement('div');
  blur1.classList.add('background-blur');
  portfolioSection.prepend(blur1);

  const blur2 = document.createElement('div');
  blur2.classList.add('background-blur');
  portfolioSection.prepend(blur2);

  let activeBlur = blur1;
  let inactiveBlur = blur2;

  const cards = document.querySelectorAll('.portfolio-card');

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const imgSrc = card.querySelector('img').getAttribute('src');

      // Set gambar di inactive blur
      inactiveBlur.style.backgroundImage = `url(${imgSrc})`;

      // Fade in inactive blur, fade out active blur
      inactiveBlur.classList.add('active');
      activeBlur.classList.remove('active');

      // Swap active dan inactive refs
      [activeBlur, inactiveBlur] = [inactiveBlur, activeBlur];
    });

    card.addEventListener('mouseleave', () => {
      // Fade out blur saat mouse keluar semua cards
      activeBlur.classList.remove('active');
      inactiveBlur.classList.remove('active');
    });
  });
});

// auto scroll portofolio
document.addEventListener("DOMContentLoaded", () => {
      const container = document.getElementById('portfolioContainer');
      const scrollLeftBtn = document.getElementById('scroll-left');
      const scrollRightBtn = document.getElementById('scroll-right');
      const blurDiv = document.querySelector('.background-blur');
      const cards = document.querySelectorAll('.portfolio-card');

      let scrollAmount = 0;
      let autoScrollDirection = 1; // 1 = scroll right, -1 = scroll left

      function updateMaxScroll() {
        return container.scrollWidth - container.clientWidth;
      }

      let maxScrollLeft = updateMaxScroll();

      // Auto scroll function using requestAnimationFrame for smoothness
      function autoScroll() {
        maxScrollLeft = updateMaxScroll();

        scrollAmount += 2 * autoScrollDirection; // kecepatan scroll

        if (scrollAmount >= maxScrollLeft) {
          scrollAmount = maxScrollLeft;
          autoScrollDirection = -1; // balik scroll kiri
        } else if (scrollAmount <= 0) {
          scrollAmount = 0;
          autoScrollDirection = 1; // balik scroll kanan
        }

        container.scrollLeft = scrollAmount;
        requestAnimationFrame(autoScroll);
      }

      autoScroll();

      // Tombol scroll kiri
      scrollLeftBtn.addEventListener('click', () => {
        scrollAmount -= 150;
        if (scrollAmount < 0) scrollAmount = 0;
        container.scrollLeft = scrollAmount;
      });

      // Tombol scroll kanan
      scrollRightBtn.addEventListener('click', () => {
        scrollAmount += 150;
        maxScrollLeft = updateMaxScroll();
        if (scrollAmount > maxScrollLeft) scrollAmount = maxScrollLeft;
        container.scrollLeft = scrollAmount;
      });

      window.addEventListener('resize', () => {
        maxScrollLeft = updateMaxScroll();
      });

      // Blur background on hover card
      cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          const imgSrc = card.querySelector('img').getAttribute('src');
          blurDiv.style.backgroundImage = `url(${imgSrc})`;
          blurDiv.classList.add('active');
        });

        card.addEventListener('mouseleave', () => {
          blurDiv.classList.remove('active');
        });
      });
    });
