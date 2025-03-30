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

// WhatsApp Integration
document.addEventListener('DOMContentLoaded', function() {
    // Create WhatsApp floating button
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = 'https://wa.me/919376457792';
    whatsappBtn.className = 'whatsapp-float';
    whatsappBtn.target = '_blank';
    whatsappBtn.innerHTML = '<i class="fab fa-whatsapp my-float"></i>';
    document.body.appendChild(whatsappBtn);

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const book = document.getElementById('book').value;
            const quantity = document.getElementById('quantity').value;
            const address = document.getElementById('address').value;
            const query = document.getElementById('query').value;
            
            // Create WhatsApp message
            let message = `New Book Order/Query from Half Tales Website:%0A%0A`;
            message += `*Name:* ${name}%0A`;
            message += `*Phone:* ${phone}%0A`;
            message += `*Email:* ${email}%0A`;
            if (book) message += `*Book Name:* ${book}%0A`;
            if (quantity) message += `*Quantity:* ${quantity}%0A`;
            message += `*Address:* ${address}%0A`;
            message += `*Query:* ${query}%0A`;
            
            // Open WhatsApp with pre-filled message
            const whatsappUrl = `https://wa.me/919376457792?text=${message}`;
            window.open(whatsappUrl, '_blank');
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.textContent = 'Thank you! Your message has been sent via WhatsApp.';
            contactForm.appendChild(successMsg);
            successMsg.style.display = 'block';
            
            // Reset form
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 5000);
        });
    }
});

// Rest of your existing JavaScript...