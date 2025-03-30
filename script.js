document.addEventListener('DOMContentLoaded', function() {
     // Theme Toggle Functionality
     const themeToggle = document.getElementById('theme-toggle');
     const currentTheme = localStorage.getItem('theme') || 'light';
     
     // Set the initial theme
     document.documentElement.setAttribute('data-theme', currentTheme);
     updateThemeIcon(currentTheme);
     
     themeToggle.addEventListener('click', function() {
         const currentTheme = document.documentElement.getAttribute('data-theme');
         const newTheme = currentTheme === 'light' ? 'dark' : 'light';
         
         document.documentElement.setAttribute('data-theme', newTheme);
         localStorage.setItem('theme', newTheme);
         updateThemeIcon(newTheme);
     });
     
     function updateThemeIcon(theme) {
         const icon = themeToggle.querySelector('i');
         if (theme === 'dark') {
             icon.classList.remove('fa-moon');
             icon.classList.add('fa-sun');
         } else {
             icon.classList.remove('fa-sun');
             icon.classList.add('fa-moon');
         }
     }
     
     // Hamburger menu functionality
     const hamburger = document.querySelector('.hamburger');
     const navMenu = document.querySelector('nav ul');
     
     if (hamburger && navMenu) {
         hamburger.addEventListener('click', function() {
             hamburger.classList.toggle('active');
             navMenu.classList.toggle('active');
         });
         
         // Close menu when clicking on a link
         document.querySelectorAll('nav ul li a').forEach(link => {
             link.addEventListener('click', function() {
                 hamburger.classList.remove('active');
                 navMenu.classList.remove('active');
             });
         });
     }
     
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active link highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Form submission
    
    
    // Book card hover effect enhancement
    const bookCards = document.querySelectorAll('.book-card');
    bookCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = 'var(--shadow)';
        });
    });
});
// Your existing JavaScript remains the same

// WhatsApp Order Form Integration
document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('whatsappOrderForm');
    
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const book = document.getElementById('book').value;
            const quantity = document.getElementById('quantity').value;
            const address = document.getElementById('address').value;
            
            // Create WhatsApp message
            const message = `📚 *New Book Order/Query* 📚\n\n` +
                            `👤 *Name:* ${name}\n` +
                            `📱 *Phone:* ${phone}\n` +
                            `📧 *Email:* ${email || 'Not provided'}\n` +
                            `📖 *Book/Query:* ${book}\n` +
                            `🔢 *Quantity:* ${quantity || '1'}\n` +
                            `🏠 *Address/Message:* ${address}\n\n` +
                            `_Sent via Half Tales Website_`;
            
            // Encode message for URL
            const encodedMessage = encodeURIComponent(message);
            
            // WhatsApp API URL
            const whatsappNumber = '919376457792'; // Your WhatsApp number without '+'
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            // Open WhatsApp in a new tab
            window.open(whatsappUrl, '_blank');
            
            // Optional: Reset form after submission
            orderForm.reset();
        });
    }
});