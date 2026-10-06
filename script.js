// Product Dataset with Working Images
const products = [
    { id: 1, name: "Neon Street Oversized Tee", price: 1499, category: "fashion", img: "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 2, name: "Pro Wireless Gaming Headset", price: 4299, category: "gadgets", img: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 3, name: "Minimalist Cyberpunk Watch", price: 2899, category: "accessories", img: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 4, name: "Smart Fitness Watch Ultra", price: 3499, category: "gadgets", img: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 5, name: "Vintage Urban Denim Jacket", price: 2999, category: "fashion", img: "https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 6, name: "Polarized Shield Sunglasses", price: 1199, category: "accessories", img: "https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 7, name: "Aura Stealth Street Sneakers", price: 4999, category: "footwear", img: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 8, name: "Acoustic Noise-Canceling Earbuds", price: 2499, category: "gadgets", img: "https://images.pexels.com/photos/3780104/pexels-photo-3780104.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 9, name: "Premium Leather Backpack", price: 3799, category: "accessories", img: "https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 10, name: "Retro High-Top Kicks", price: 3999, category: "footwear", img: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 11, name: "Classic Monochrome Hoodie", price: 2199, category: "fashion", img: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { id: 12, name: "RGB Mechanical Keyboard", price: 3299, category: "gadgets", img: "https://images.pexels.com/photos/8412288/pexels-photo-8412288.jpeg?auto=compress&cs=tinysrgb&w=600" }
];

let cart = [];

// DOM Elements
const productGrid = document.getElementById('productGrid');
const cartBtn = document.getElementById('cartBtn');
const closeCart = document.getElementById('closeCart');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartDrawerCount = document.getElementById('cartDrawerCount');
const cartTotal = document.getElementById('cartTotal');
const themeToggle = document.getElementById('themeToggle');
const searchInput = document.getElementById('searchInput');

// Render Products
function displayProducts(items) {
    productGrid.innerHTML = items.map(product => `
        <div class="product-card">
            <img src="${product.img}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">₹${product.price}</div>
            </div>
            <button class="add-cart-btn" onclick="addToCart(${product.id})">
                <i class="fa-solid fa-plus"></i> Add to Cart
            </button>
        </div>
    `).join('');
}

// Add to Cart Logic
function addToCart(productId) {
    const item = products.find(p => p.id === productId);
    const existingIndex = cart.findIndex(c => c.id === productId);

    if (existingIndex > -1) {
        cart[existingIndex].qty += 1;
    } else {
        cart.push({ ...item, qty: 1 });
    }

    updateCartUI();
    toggleCart(true);
}

// Update Cart UI
function updateCartUI() {
    const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

    cartCount.innerText = totalQty;
    cartDrawerCount.innerText = totalQty;
    cartTotal.innerText = `₹${totalPrice}`;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align:center; color: var(--text-secondary);">Your vault cart is empty.</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong>
                    <div style="font-size: 0.9rem; color: var(--text-secondary);">₹${item.price} x ${item.qty}</div>
                </div>
                <button onclick="removeFromCart(${item.id})" style="background:none; border:none; color: #ef4444; cursor:pointer;">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `).join('');
    }
}

// Remove Item from Cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

// Toggle Cart Drawer
function toggleCart(open) {
    if (open) {
        cartDrawer.classList.add('open');
        cartOverlay.classList.add('active');
    } else {
        cartDrawer.classList.remove('open');
        cartOverlay.classList.remove('active');
    }
}

cartBtn.addEventListener('click', () => toggleCart(true));
closeCart.addEventListener('click', () => toggleCart(false));
cartOverlay.addEventListener('click', () => toggleCart(false));

// Category Filter
document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        const cat = e.target.getAttribute('data-category');
        if (cat === 'all') {
            displayProducts(products);
        } else {
            displayProducts(products.filter(p => p.category === cat));
        }
    });
});

// Search Filter
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(term));
    displayProducts(filtered);
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
    const isLight = document.body.getAttribute('data-theme') === 'light';
    if (isLight) {
        document.body.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    } else {
        document.body.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
});

// Initial Render
displayProducts(products);