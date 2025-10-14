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

    // Portfolio Auto Scroll & Background Blur
    const container = document.getElementById('portfolioContainer');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');
    const blurDivs = document.querySelectorAll('.background-blur');
    const cards = document.querySelectorAll('.portfolio-card');

    let scrollPos = 0;
    let direction = 1;
    let isAutoScrolling = true;
    let autoScrollSpeed = 0.5;

    function autoScroll() {
      if (!isAutoScrolling) return;

      const maxScroll = container.scrollWidth - container.clientWidth;
      scrollPos += autoScrollSpeed * direction;

      if (scrollPos >= maxScroll) {
        scrollPos = maxScroll;
        direction = -1;
      } else if (scrollPos <= 0) {
        scrollPos = 0;
        direction = 1;
      }

      container.style.transform = `translateX(-${scrollPos}px)`;
      requestAnimationFrame(autoScroll);
    }

    autoScroll();

    scrollLeftBtn.addEventListener('click', () => {
      isAutoScrolling = false;
      scrollPos = Math.max(0, scrollPos - 340);
      container.style.transform = `translateX(-${scrollPos}px)`;
      setTimeout(() => { isAutoScrolling = true; autoScroll(); }, 3000);
    });

    scrollRightBtn.addEventListener('click', () => {
      isAutoScrolling = false;
      const maxScroll = container.scrollWidth - container.clientWidth;
      scrollPos = Math.min(maxScroll, scrollPos + 340);
      container.style.transform = `translateX(-${scrollPos}px)`;
      setTimeout(() => { isAutoScrolling = true; autoScroll(); }, 3000);
    });

    let activeBlur = blurDivs[0];
    let inactiveBlur = blurDivs[1];

    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        const imgSrc = card.querySelector('img').getAttribute('src');
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

    const portfolioSection = document.querySelector('.portfolio-section');
    portfolioSection.addEventListener('mouseenter', () => {
      autoScrollSpeed = 0.2;
    });

    portfolioSection.addEventListener('mouseleave', () => {
      autoScrollSpeed = 0.5;
    });

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

    document.querySelectorAll('.about-container, .skills, .portfolio-section, .contact-container').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });

     // Inisialisasi EmailJS
    (function(){
      emailjs.init({
        publicKey: "Ktu04v42-NCcORf70" // ganti dengan public key kamu
      });
    })();

    // Tangani form submit
    document.getElementById('contactForm').addEventListener('submit', function(event) {
      event.preventDefault();

      emailjs.sendForm('service_5ix6gku', 'template_hey6zvs', this)
        .then(function() {
          alert('✅ Pesan berhasil dikirim!');
          document.getElementById('contactForm').reset();
        }, function(error) {
          alert('❌ Gagal mengirim pesan: ' + JSON.stringify(error));
        });
    });