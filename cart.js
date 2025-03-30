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
    
    // Sample book data
    const books = [
        {
            id: 1,
            title: "Gunahon Ka Devta",
            author: "Dharamvir Bharati",
            originalPrice: 260,
            discountedPrice: 100,
            image: "book1.jpg"
        },
        {
            id: 2,
            title: "Godaan",
            author: "Premchand",
            originalPrice: 249,
            discountedPrice: 100,
            image: "book2.jpg"
        },
        {
            id: 3,
            title: "Maila Aanchal",
            author: "Phanishwar Nath 'Renu'",
            originalPrice: 160,
            discountedPrice: 100,
            image: "book3.jpg"
        },
        {
            id: 4,
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            originalPrice: 329,
            discountedPrice: 160,
            image: "booke2.jpg"
        }
    ];
    
    // Initialize cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Add to cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const bookId = parseInt(this.getAttribute('data-id'));
            const book = books.find(b => b.id === bookId);
            
            // Check if book already in cart
            const existingItem = cart.find(item => item.id === bookId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: book.id,
                    title: book.title,
                    author: book.author,
                    price: book.discountedPrice,
                    quantity: 1,
                    image: book.image
                });
            }
            
            // Save to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Update cart count
            updateCartCount();
            
            // Show success message
            alert(`${book.title} added to cart!`);
        });
    });
    
    // Update cart count
    function updateCartCount() {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        document.getElementById('cart-count').textContent = count;
    }
    
    // Initialize cart count
    updateCartCount();
});