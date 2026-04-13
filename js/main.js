// ===================================
// Home Page Functionality
// ===================================

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }

    // Load featured books
    loadFeaturedBooks();
    
    // Load categories
    loadCategories();
});

// Load featured books (first 6 books)
function loadFeaturedBooks() {
    const books = getBooks();
    const featuredBooksContainer = document.getElementById('featuredBooks');
    
    if (!featuredBooksContainer) return;

    const featuredBooks = books.slice(0, 6);
    
    featuredBooksContainer.innerHTML = featuredBooks.map(book => `
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
}

// Load categories
function loadCategories() {
    const categories = getCategories();
    const categoriesGrid = document.getElementById('categoriesGrid');
    const footerCategories = document.getElementById('footerCategories');
    
    // Category icons mapping
    const categoryIcons = {
        'Fiction': '📚',
        'Non-Fiction': '📖',
        'Science': '🔬',
        'Technology': '💻',
        'History': '📜',
        'Biography': '👤'
    };

    if (categoriesGrid) {
        categoriesGrid.innerHTML = categories.map(category => `
            <a href="books.html?category=${encodeURIComponent(category)}" class="category-card">
                <div class="category-icon">${categoryIcons[category] || '📚'}</div>
                <div class="category-name">${category}</div>
            </a>
        `).join('');
    }

    if (footerCategories) {
        footerCategories.innerHTML = categories.map(category => `
            <li><a href="books.html?category=${encodeURIComponent(category)}">${category}</a></li>
        `).join('');
    }
}

// Search from hero section
function searchFromHero() {
    const searchInput = document.getElementById('heroSearch');
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm) {
        window.location.href = `books.html?search=${encodeURIComponent(searchTerm)}`;
    }
}

// Allow Enter key to trigger search
document.addEventListener('DOMContentLoaded', function() {
    const heroSearch = document.getElementById('heroSearch');
    if (heroSearch) {
        heroSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchFromHero();
            }
        });
    }
});
