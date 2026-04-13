// ===================================
// Book Details Page Functionality
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

    // Load book details
    loadBookDetails();
});

// Load book details from URL parameter
function loadBookDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');
    
    if (!bookId) {
        showBookNotFound();
        return;
    }
    
    const book = getBookById(bookId);
    
    if (!book) {
        showBookNotFound();
        return;
    }
    
    displayBookDetails(book);
    loadRelatedBooks(book);
}

// Display book details
function displayBookDetails(book) {
    const bookDetailsContainer = document.getElementById('bookDetails');
    const bookNotFound = document.getElementById('bookNotFound');
    
    bookDetailsContainer.innerHTML = `
        <div class="book-details-image">
            ${book.image ? `<img src="${book.image}" alt="${book.title}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">` : '📖'}
        </div>
        <div class="book-details-content">
            <h1>${book.title}</h1>
            <p class="author">by ${book.author}</p>
            <p class="price">$${book.price.toFixed(2)}</p>
            
            <div class="meta">
                <div class="meta-item">
                    <span class="meta-label">Category:</span>
                    <span>${book.category}</span>
                </div>
                ${book.isbn ? `
                <div class="meta-item">
                    <span class="meta-label">ISBN:</span>
                    <span>${book.isbn}</span>
                </div>
                ` : ''}
            </div>
            
            <div class="description">
                <h3>Description</h3>
                <p>${book.description}</p>
            </div>
            
            <button class="btn btn-primary" onclick="addToCart(${book.id})">
                🛒 Add to Cart
            </button>
        </div>
    `;
    
    bookDetailsContainer.style.display = 'grid';
    bookNotFound.classList.add('hidden');
}

// Show book not found message
function showBookNotFound() {
    const bookDetailsContainer = document.getElementById('bookDetails');
    const bookNotFound = document.getElementById('bookNotFound');
    
    bookDetailsContainer.style.display = 'none';
    bookNotFound.classList.remove('hidden');
}

// Load related books (same category)
function loadRelatedBooks(currentBook) {
    const books = getBooks();
    const relatedBooks = books
        .filter(book => book.category === currentBook.category && book.id !== currentBook.id)
        .slice(0, 4);
    
    if (relatedBooks.length === 0) {
        return;
    }
    
    const relatedBooksSection = document.getElementById('relatedBooksSection');
    const relatedBooksContainer = document.getElementById('relatedBooks');
    
    relatedBooksContainer.innerHTML = relatedBooks.map(book => `
        <div class="book-card" onclick="window.location.href='book-details.html?id=${book.id}'">
            <div class="book-image">
                ${book.image ? `<img src="${book.image}" alt="${book.title}" style="width:100%;height:100%;object-fit:cover;">` : '📖'}
            </div>
            <div class="book-content">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">by ${book.author}</p>
                <p class="book-price">$${book.price.toFixed(2)}</p>
                <span class="book-category">${book.category}</span>
            </div>
        </div>
    `).join('');
    
    relatedBooksSection.classList.remove('hidden');
}

// Add to cart (UI only - no backend)
function addToCart(bookId) {
    // Get cart from localStorage or initialize
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if book already in cart
    const existingItem = cart.find(item => item.id === bookId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        const book = getBookById(bookId);
        cart.push({
            id: book.id,
            title: book.title,
            price: book.price,
            quantity: 1
        });
    }
    
    // Save cart
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show feedback
    alert('Book added to cart!');
}
