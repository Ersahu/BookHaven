// ===================================
// Books Listing Page Functionality
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

    // Initialize page
    loadCategories();
    loadBooks();
    
    // Get URL parameters for pre-filtering
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    const categoryParam = urlParams.get('category');
    
    if (searchParam) {
        document.getElementById('searchInput').value = searchParam;
    }
    
    if (categoryParam) {
        document.getElementById('categoryFilter').value = categoryParam;
    }
    
    // Re-load books with filters applied
    if (searchParam || categoryParam) {
        loadBooks();
    }

    // Event listeners for filters
    document.getElementById('searchInput').addEventListener('input', debounce(loadBooks, 300));
    document.getElementById('categoryFilter').addEventListener('change', loadBooks);
    document.getElementById('sortOption').addEventListener('change', loadBooks);
});

// Load categories into dropdown
function loadCategories() {
    const categories = getCategories();
    const categoryFilter = document.getElementById('categoryFilter');
    
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Load and display books with filters
function loadBooks() {
    const books = getBooks();
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const selectedCategory = document.getElementById('categoryFilter').value;
    const sortOption = document.getElementById('sortOption').value;
    
    // Filter books
    let filteredBooks = books.filter(book => {
        const matchesSearch = !searchTerm || 
            book.title.toLowerCase().includes(searchTerm) || 
            book.author.toLowerCase().includes(searchTerm);
        const matchesCategory = !selectedCategory || book.category === selectedCategory;
        
        return matchesSearch && matchesCategory;
    });
    
    // Sort books
    filteredBooks.sort((a, b) => {
        switch(sortOption) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'newest':
                return b.id - a.id;
            case 'title':
            default:
                return a.title.localeCompare(b.title);
        }
    });
    
    // Update results count
    document.getElementById('resultsCount').textContent = `Showing ${filteredBooks.length} book${filteredBooks.length !== 1 ? 's' : ''}`;
    
    // Display books or no results message
    const booksGrid = document.getElementById('booksGrid');
    const noResults = document.getElementById('noResults');
    
    if (filteredBooks.length === 0) {
        booksGrid.innerHTML = '';
        noResults.classList.remove('hidden');
    } else {
        noResults.classList.add('hidden');
        booksGrid.innerHTML = filteredBooks.map(book => `
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
}

// Debounce function to limit how often a function is called
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
