// ===== CONTACT FORM HANDLER =====
// Include di: contact.html
// Menggunakan Web3Forms untuk handling form submission

// ===== WEB3FORMS SUBMISSION =====
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector(".submit-btn");
    const originalText = submitBtn.textContent;

    // Show loading state
    submitBtn.textContent = "Mengirim...";
    submitBtn.disabled = true;

    // Get form data
    const formData = new FormData(this);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      // Send to Web3Forms
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const result = await response.json();

      if (result.success) {
        console.log("✅ Success:", result);

        // Show success message
        showMessage(
          "success",
          "✅ Pesan berhasil dikirim! Terima kasih telah menghubungi saya."
        );

        // Reset form
        contactForm.reset();

        // Optional: Redirect to thank you page after 2 seconds
        // setTimeout(() => {
        //   window.location.href = 'thank-you.html';
        // }, 2000);
      } else {
        console.error("❌ Error:", result);
        showMessage("error", "❌ Gagal mengirim pesan. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      showMessage(
        "error",
        "❌ Terjadi kesalahan. Silakan coba lagi atau hubungi via email langsung."
      );
    } finally {
      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

// ===== SHOW MESSAGE =====
function showMessage(type, message) {
  // Remove existing message
  const existingMessage = document.querySelector(".form-message");
  if (existingMessage) {
    existingMessage.remove();
  }

  // Create message element
  const messageDiv = document.createElement("div");
  messageDiv.className = `form-message form-message-${type}`;
  messageDiv.textContent = message;

  // Style message
  messageDiv.style.cssText = `
    padding: 15px 20px;
    margin-top: 20px;
    border-radius: 8px;
    font-weight: 600;
    text-align: center;
    animation: slideDown 0.3s ease;
    ${
      type === "success"
        ? "background: #d4edda; color: #155724; border: 2px solid #c3e6cb;"
        : "background: #f8d7da; color: #721c24; border: 2px solid #f5c6cb;"
    }
  `;

  // Insert after form
  contactForm.insertAdjacentElement("afterend", messageDiv);

  // Auto remove after 5 seconds
  setTimeout(() => {
    messageDiv.style.animation = "slideUp 0.3s ease";
    setTimeout(() => messageDiv.remove(), 300);
  }, 5000);
}

// ===== REAL-TIME VALIDATION (Optional) =====
function setupFormValidation() {
  const inputs = contactForm.querySelectorAll("input, textarea");

  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this);
    });

    input.addEventListener("input", function () {
      // Remove error on input
      if (this.classList.contains("error")) {
        this.classList.remove("error");
        const errorMsg = this.parentElement.querySelector(".error-message");
        if (errorMsg) errorMsg.remove();
      }
    });
  });
}

function validateField(field) {
  const value = field.value.trim();
  const fieldName = field.getAttribute("name");
  let errorMessage = "";

  // Check if required field is empty
  if (field.hasAttribute("required") && value === "") {
    errorMessage = `${getFieldLabel(fieldName)} wajib diisi`;
  }

  // Email validation
  if (fieldName === "email" && value !== "") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      errorMessage = "Format email tidak valid";
    }
  }

  // Show error
  if (errorMessage) {
    showFieldError(field, errorMessage);
    return false;
  }

  return true;
}

function showFieldError(field, message) {
  // Remove existing error
  const existingError = field.parentElement.querySelector(".error-message");
  if (existingError) existingError.remove();

  // Add error class
  field.classList.add("error");

  // Create error message
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = message;
  errorDiv.style.cssText = `
    color: #dc3545;
    font-size: 0.85rem;
    margin-top: 5px;
    animation: fadeIn 0.3s ease;
  `;

  // Insert after input
  field.parentElement.appendChild(errorDiv);
}

function getFieldLabel(fieldName) {
  const labels = {
    name: "Nama",
    email: "Email",
    subject: "Subjek",
    message: "Pesan",
  };
  return labels[fieldName] || fieldName;
}

// ===== ADD ANIMATIONS CSS =====
const style = document.createElement("style");
style.textContent = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideUp {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-20px);
    }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .form-group input.error,
  .form-group textarea.error {
    border-color: #dc3545 !important;
    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1) !important;
  }
`;
document.head.appendChild(style);

// ===== INITIALIZE =====
document.addEventListener("DOMContentLoaded", () => {
  if (contactForm) {
    setupFormValidation();
    console.log("📧 Contact form initialized");
  }
});

// ===== EMAIL VALIDATION HELPER =====
// Export function jika butuh digunakan di tempat lain
window.validateEmail = function (email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// ===== PHONE VALIDATION HELPER =====
window.validatePhone = function (phone) {
  // Indonesia phone number format
  const regex = /^(\+62|62|0)[0-9]{9,12}$/;
  return regex.test(phone.replace(/[\s-]/g, ""));
};
