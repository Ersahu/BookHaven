// ===================================
// Contact Page Functionality
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
});

// Handle contact form submission
function handleContactForm(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validate form
    if (!name || !email || !subject || !message) {
        showFormMessage('Please fill in all fields.', 'error');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Create message object
    const contactMessage = {
        id: Date.now(),
        name: name,
        email: email,
        subject: subject,
        message: message,
        date: new Date().toISOString()
    };
    
    // Save to localStorage
    let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    messages.push(contactMessage);
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    
    // Show success message
    showFormMessage('Thank you! Your message has been sent successfully. We will get back to you soon.', 'success');
    
    // Reset form
    document.getElementById('contactForm').reset();
    
    // Clear message after 5 seconds
    setTimeout(() => {
        const formMessage = document.getElementById('formMessage');
        formMessage.classList.add('hidden');
        formMessage.className = 'form-message hidden';
    }, 5000);
}

// Show form message
function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.classList.remove('hidden');
}
