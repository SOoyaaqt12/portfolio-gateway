// Particle Background Animation
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 100;

// Get CSS variable for particle color
const rootStyles = getComputedStyle(document.documentElement);

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > canvas.width || this.x < 0) {
      this.speedX = -this.speedX;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.speedY = -this.speedY;
    }
  }

  draw() {
    ctx.fillStyle = rootStyles.getPropertyValue('--particle-color');
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  particlesArray = [];
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function connect() {
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      const dx = particlesArray[a].x - particlesArray[b].x;
      const dy = particlesArray[a].y - particlesArray[b].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 120) {
        const opacity = 1 - (distance / 120);
        ctx.strokeStyle = `rgba(0, 119, 255, ${opacity * 0.3})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
  connect();
  requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

// Toggle Mobile Menu
function toggleMenu() {
  const navMenu = document.getElementById('navMenu');
  navMenu.classList.toggle('active');
}

// Active Navigation on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar ul li a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navMenu').classList.remove('active');
  });
});

// Portfolio Background Blur Effect
const blurDivs = document.querySelectorAll('.background-blur');
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

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Scroll reveal animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.about-container, .skills, .contact-container').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Web3Forms dengan AJAX handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Mengirim...';
    submitBtn.disabled = true;
    
    const formData = new FormData(this);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      });
      
      const result = await response.json();
      
      if (result.success) {
        console.log('Success:', result);
        alert('✅ Pesan berhasil dikirim! Terima kasih telah menghubungi saya.');
        contactForm.reset();
      } else {
        console.error('Error:', result);
        alert('❌ Gagal mengirim pesan. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Terjadi kesalahan. Silakan coba lagi atau hubungi via email langsung.');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

// Certificate Modal Viewer
const certificateImages = document.querySelectorAll('.certificate-image img');
const viewCertificateLinks = document.querySelectorAll('.view-certificate');

// Create modal for viewing certificates
function createCertificateModal() {
  const modal = document.createElement('div');
  modal.className = 'certificate-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-modal">&times;</span>
      <img src="" alt="Certificate" class="modal-image">
    </div>
  `;
  
  // Add modal styles
  const style = document.createElement('style');
  style.textContent = `
    .certificate-modal {
      display: none;
      position: fixed;
      z-index: 1000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.9);
      overflow: auto;
    }
    
    .modal-content {
      position: relative;
      margin: auto;
      padding: 0;
      width: 90%;
      max-width: 900px;
      top: 50%;
      transform: translateY(-50%);
    }
    
    .modal-image {
      width: 100%;
      height: auto;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    }
    
    .close-modal {
      position: absolute;
      top: 15px;
      right: 35px;
      color: #f1f1f1;
      font-size: 40px;
      font-weight: bold;
      transition: 0.3s;
      cursor: pointer;
    }
    
    .close-modal:hover,
    .close-modal:focus {
      color: #bbb;
      text-decoration: none;
    }
    
    @media (max-width: 768px) {
      .modal-content {
        width: 95%;
      }
      
      .close-modal {
        top: 10px;
        right: 15px;
        font-size: 30px;
      }
    }
  `;
  
  document.head.appendChild(style);
  document.body.appendChild(modal);
  
  return modal;
}

// Initialize modal
const modal = createCertificateModal();
const modalImg = modal.querySelector('.modal-image');
const closeModal = modal.querySelector('.close-modal');

// Open modal when clicking on view certificate link
viewCertificateLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const imgSrc = this.closest('.certificate-card').querySelector('.certificate-image img').src;
    modal.style.display = 'block';
    modalImg.src = imgSrc;
    document.body.style.overflow = 'hidden';
  });
});

// Close modal when clicking on X
closeModal.addEventListener('click', function() {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
});

// Close modal when clicking outside of the image
window.addEventListener('click', function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// Add certificates to navigation menu
const navMenu = document.getElementById('navMenu');
const certificatesLink = document.createElement('li');
certificatesLink.innerHTML = '<a href="#certificates">Sertifikat</a>';
navMenu.insertBefore(certificatesLink, navMenu.children[3]);

// Update active navigation on scroll for certificates section
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
});