// certificates-data.js
// Data sertifikat dalam array - mudah untuk ditambah/edit
const certificatesData = [
  {
    id: 1,
    title: "Developing Landing Pages with HTML and CSS",
    issuer: "PT Wan International",
    date: "Desember 2023",
    grade: "99",  // 👈 TAMBAHKAN INI
    images: {
      front: "assets/3.1.jpg",
      back: "assets/3.2.jpg"
    },
    description: "Pengembangan website e-commerce rumah makan menggunakan HMTL dan CSS."
  },
  {
    id: 2,
    title: "Developing a Laravel library management website with the Laravel framework.",
    issuer: "PT Kreasi Media",
    date: "Desember 2024",
    grade: "85",  // 👈 TAMBAHKAN INI
    images: {
      front: "assets/2.1.jpg",
      back: "assets/2.2.jpg"
    },
    description: "Pengembangan manejemen perpustakaan sekolah berbasis website menggunakan PHP Laravel."
  },
  {
    id: 3,
    title: "Developing full-stack mobile applications using the React Native and Laravel frameworks.",
    issuer: "PT Ginvo Indonesia Group",
    date: "Juni 2025",
    grade: "83",  // 👈 TAMBAHKAN INI
    images: {
      front: "assets/1.jpg",
      back: "assets/2.jpg"
    },
    description: "Pengembangan aplikasi Habit Tracker dengan menggunakan React Native dan juga Android Studio."
  },
  {
    id: 4,
    title: "TOEIC LISTENING AND READING OFFICIAL SCORE CERTIFICATE.",
    issuer: "Educational Testing Service",
    date: "Agustus 2025",
    grade: "440",  // 👈 TAMBAHKAN INI
    images: {
      front: "assets/ETS.pdf.jpg",
      back: null
    },
    description: "Sertifikat ini didapatkan setelah menjalani tes Toeic mendengar dan membaca, sertifikat ini digunakan untuk pembuktian kemampuan kita dalam pemahaman bahasa inggris"
  },
];

// ===== DYNAMIC CERTIFICATE RENDERING =====
function renderCertificates() {
  const certificatesGrid = document.querySelector('.certificates-grid');
  
  if (!certificatesGrid) return;
  
  certificatesGrid.innerHTML = '';
  
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
  document.getElementById('modalGrade').textContent = cert.grade || 'A';
  document.getElementById('modalDescription').textContent = cert.description;
  
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
  const handleEscape = (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  };
  
  // Remove old listener if exists
  document.removeEventListener('keydown', handleEscape);
  document.addEventListener('keydown', handleEscape);
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
  renderCertificates();
});