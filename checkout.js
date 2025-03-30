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
    
    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Display cart items
    function displayCartItems() {
        const orderItemsContainer = document.getElementById('order-items');
        orderItemsContainer.innerHTML = '';
        
        let subtotal = 0;
        
        if (cart.length === 0) {
            orderItemsContainer.innerHTML = '<p>Your cart is empty</p>';
            document.getElementById('subtotal').textContent = '₹0';
            document.getElementById('total').textContent = '₹0';
            document.getElementById('cart-count').textContent = '0';
            return;
        }
        
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'order-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="item-details">
                    <h4>${item.title}</h4>
                    <p class="author">${item.author}</p>
                    <div class="price">₹${item.price * item.quantity}</div>
                    <div class="item-quantity">
                        <button class="quantity-btn minus" data-index="${index}">-</button>
                        <input type="number" value="${item.quantity}" min="1" data-index="${index}">
                        <button class="quantity-btn plus" data-index="${index}">+</button>
                    </div>
                </div>
                <button class="remove-item" data-index="${index}"><i class="fas fa-times"></i></button>
            `;
            orderItemsContainer.appendChild(itemElement);
            
            subtotal += item.price * item.quantity;
        });
        
        // Update prices
        const shipping = 0;
        const total = subtotal + shipping;
        
        document.getElementById('subtotal').textContent = `₹${subtotal}`;
        document.getElementById('total').textContent = `₹${total}`;
        document.getElementById('cart-count').textContent = cart.reduce((total, item) => total + item.quantity, 0);
        
        // Add event listeners to quantity buttons
        document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                updateQuantity(index, -1);
            });
        });
        
        document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                updateQuantity(index, 1);
            });
        });
        
        document.querySelectorAll('.item-quantity input').forEach(input => {
            input.addEventListener('change', function() {
                const index = parseInt(this.getAttribute('data-index'));
                const newQuantity = parseInt(this.value);
                
                if (newQuantity > 0) {
                    cart[index].quantity = newQuantity;
                    saveCart();
                    displayCartItems();
                } else {
                    this.value = cart[index].quantity;
                }
            });
        });
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                cart.splice(index, 1);
                saveCart();
                displayCartItems();
            });
        });
    }
    
    // Update quantity function
    function updateQuantity(index, change) {
        const newQuantity = cart[index].quantity + change;
        
        if (newQuantity > 0) {
            cart[index].quantity = newQuantity;
            saveCart();
            displayCartItems();
        }
    }
    
    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    // WhatsApp Order Functionality
    const whatsappOrderBtn = document.getElementById('whatsapp-order');
    
    whatsappOrderBtn.addEventListener('click', function() {
        const name = document.getElementById('fullname').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const state = document.getElementById('state').value;
        const pincode = document.getElementById('pincode').value;
        
        if (!name || !phone || !address || !city || !state || !pincode) {
            alert('Please fill in all required fields');
            return;
        }
        
        if (cart.length === 0) {
            alert('Your cart is empty');
            return;
        }
        
        // Format WhatsApp message
        let message = `*New Order from Half Tales*%0A%0A`;
        message += `*Customer Details:*%0A`;
        message += `Name: ${name}%0A`;
        message += `Phone: ${phone}%0A`;
        message += `Address: ${address}%0A`;
        message += `City: ${city}%0A`;
        message += `State: ${state}%0A`;
        message += `Pincode: ${pincode}%0A%0A`;
        
        message += `*Order Items:*%0A`;
        cart.forEach(item => {
            message += `- ${item.title} (${item.author}) - ${item.quantity} x ₹${item.price} = ₹${item.quantity * item.price}%0A`;
        });
        
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const shipping = 0;
        const total = subtotal + shipping;
        
        message += `%0A*Order Summary:*%0A`;
        message += `Subtotal: ₹${subtotal}%0A`;
        message += `Shipping: ₹${shipping}%0A`;
        message += `*Total: ₹${total}*%0A%0A`;
        message += `Payment Method: Cash on Delivery`;
        
        // Open WhatsApp with the order details
        window.open(`https://wa.me/919376457792?text=${message}`, '_blank');
    });
    
    // Initialize page
    displayCartItems();
});