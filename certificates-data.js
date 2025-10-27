// certificates-data.js
// Data sertifikat dalam array - mudah untuk ditambah/edit
const certificatesData = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    issuer: "Dicoding Indonesia",
    date: "September 2023",
    images: {
      front: "assets/certificate1.jpg",
      back: "assets/certificate1-back.jpg" // opsional
    },
    description: "Sertifikat dasar pengembangan web mencakup HTML, CSS, dan JavaScript",
    credentialId: "DICT-12345",
    credentialUrl: "https://dicoding.com/certificates/xxx"
  },
  {
    id: 2,
    title: "JavaScript Advanced",
    issuer: "Coursera",
    date: "November 2023",
    images: {
      front: "assets/certificate2.jpg",
      back: "assets/certificate2-back.jpg"
    },
    description: "JavaScript lanjutan termasuk ES6+, Async/Await, dan OOP",
    credentialId: "COURS-67890",
    credentialUrl: "https://coursera.org/verify/xxx"
  },
  {
    id: 3,
    title: "React.js Professional",
    issuer: "Udemy",
    date: "Januari 2024",
    images: {
      front: "assets/certificate3.jpg",
      back: null // jika tidak ada bagian belakang
    },
    description: "Pengembangan aplikasi React.js profesional dengan Hooks dan Redux",
    credentialId: "UC-REACT-001",
    credentialUrl: "https://udemy.com/certificate/xxx"
  },
  {
    id: 4,
    title: "PHP & Laravel Development",
    issuer: "Laracasts",
    date: "Maret 2024",
    images: {
      front: "assets/certificate4.jpg",
      back: "assets/certificate4-back.jpg"
    },
    description: "Pengembangan web menggunakan framework Laravel",
    credentialId: "LC-PHP-123",
    credentialUrl: "https://laracasts.com/certificates/xxx"
  },
  {
    id: 5,
    title: "UI/UX Design Fundamentals",
    issuer: "Google Design",
    date: "Mei 2024",
    images: {
      front: "assets/certificate5.jpg",
      back: "assets/certificate5-back.jpg"
    },
    description: "Fundamental desain UI/UX dengan prinsip Google Material Design",
    credentialId: "GOOG-UX-456",
    credentialUrl: "https://design.google/certificate/xxx"
  },
  {
    id: 6,
    title: "Full Stack Web Development",
    issuer: "FreeCodeCamp",
    date: "Juli 2024",
    images: {
      front: "assets/certificate6.jpg",
      back: "assets/certificate6-back.jpg"
    },
    description: "Sertifikat full stack developer mencakup frontend dan backend",
    credentialId: "FCC-FULL-789",
    credentialUrl: "https://freecodecamp.org/certification/xxx"
  }
  // Tambah sertifikat baru cukup copy-paste format di atas
];

// ===== DYNAMIC CERTIFICATE RENDERING =====
function renderCertificates() {
  const certificatesGrid = document.querySelector('.certificates-grid');
  
  if (!certificatesGrid) return;
  
  // Kosongkan grid terlebih dahulu
  certificatesGrid.innerHTML = '';
  
  // Render setiap sertifikat
  certificatesData.forEach(cert => {
    const certCard = document.createElement('div');
    certCard.className = 'certificate-card';
    certCard.setAttribute('data-cert-id', cert.id);
    
    certCard.innerHTML = `
      <div class="certificate-image">
        <img src="${cert.images.front}" alt="${cert.title}" loading="lazy" />
        <div class="certificate-overlay">
          <button class="view-certificate-btn" data-cert-id="${cert.id}">
            Lihat Detail
          </button>
        </div>
      </div>
      <div class="certificate-content">
        <h3>${cert.title}</h3>
        <p class="certificate-issuer">${cert.issuer}</p>
        <p class="certificate-date">${cert.date}</p>
      </div>
    `;
    
    certificatesGrid.appendChild(certCard);
  });
  
  // Attach event listeners untuk modal
  attachCertificateModalListeners();
}

// ===== MODAL SYSTEM =====
function createCertificateModal() {
  const modal = document.createElement('div');
  modal.id = 'certificateModal';
  modal.className = 'certificate-modal';
  
  modal.innerHTML = `
    <div class="modal-backdrop"></div>
    <div class="modal-content-wrapper">
      <div class="modal-header">
        <h2 id="modalTitle"></h2>
        <button class="modal-close">&times;</button>
      </div>
      
      <div class="modal-body">
        <div class="certificate-images-viewer">
          <div class="main-image-container">
            <img id="modalMainImage" src="" alt="Certificate" />
          </div>
          
          <div class="thumbnail-container">
            <button class="thumbnail-btn active" data-side="front">
              <img id="modalThumbFront" src="" alt="Front" />
              <span>Depan</span>
            </button>
            <button class="thumbnail-btn" data-side="back" style="display: none;">
              <img id="modalThumbBack" src="" alt="Back" />
              <span>Belakang</span>
            </button>
          </div>
        </div>
        
        <div class="certificate-details">
          <div class="detail-item">
            <span class="detail-label">Penerbit:</span>
            <span id="modalIssuer"></span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Tanggal:</span>
            <span id="modalDate"></span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Nilai:</span>
            <span id="modalGrade" class="grade-badge"></span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Deskripsi:</span>
            <p id="modalDescription"></p>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  return modal;
}

// Attach event listeners untuk modal
function attachCertificateModalListeners() {
  const viewButtons = document.querySelectorAll('.view-certificate-btn');
  
  viewButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const certId = parseInt(btn.getAttribute('data-cert-id'));
      openCertificateModal(certId);
    });
  });
}

// Buka modal dengan data sertifikat
function openCertificateModal(certId) {
  const cert = certificatesData.find(c => c.id === certId);
  if (!cert) return;
  
  const modal = document.getElementById('certificateModal') || createCertificateModal();
  
  // Isi data ke modal
  document.getElementById('modalTitle').textContent = cert.title;
  document.getElementById('modalIssuer').textContent = cert.issuer;
  document.getElementById('modalDate').textContent = cert.date;
  document.getElementById('modalCredentialId').textContent = cert.credentialId;
  document.getElementById('modalDescription').textContent = cert.description;
  document.getElementById('modalCredentialUrl').href = cert.credentialUrl;
  
  // Set gambar
  const mainImage = document.getElementById('modalMainImage');
  const thumbFront = document.getElementById('modalThumbFront');
  const thumbBack = document.getElementById('modalThumbBack');
  const backBtn = document.querySelector('.thumbnail-btn[data-side="back"]');
  
  mainImage.src = cert.images.front;
  thumbFront.src = cert.images.front;
  
  // Handle gambar belakang
  if (cert.images.back) {
    thumbBack.src = cert.images.back;
    backBtn.style.display = 'block';
  } else {
    backBtn.style.display = 'none';
  }
  
  // Show modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  // Setup thumbnail switching
  setupThumbnailSwitching();
  
  // Setup close handlers
  setupModalCloseHandlers(modal);
}

// Switch antara gambar depan dan belakang
function setupThumbnailSwitching() {
  const thumbnailBtns = document.querySelectorAll('.thumbnail-btn');
  const mainImage = document.getElementById('modalMainImage');
  
  thumbnailBtns.forEach(btn => {
    btn.onclick = () => {
      thumbnailBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const side = btn.getAttribute('data-side');
      const imgSrc = btn.querySelector('img').src;
      mainImage.src = imgSrc;
    };
  });
}

// Setup modal close handlers
function setupModalCloseHandlers(modal) {
  const closeBtn = modal.querySelector('.modal-close');
  const backdrop = modal.querySelector('.modal-backdrop');
  
  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  };
  
  closeBtn.onclick = closeModal;
  backdrop.onclick = closeModal;
  
  // Close dengan ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
  renderCertificates();
});

// Export untuk digunakan di file lain jika perlu
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { certificatesData, renderCertificates };
}