// ===================================
// Admin Panel Functionality
// ===================================

let deleteBookId = null;

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

    // Check if admin is already logged in
    checkAdminLogin();

    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // Add book button
    const addBookBtn = document.getElementById('addBookBtn');
    if (addBookBtn) {
        addBookBtn.addEventListener('click', () => openBookModal());
    }

    // Close modal buttons
    const closeModal = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelBtn');
    if (closeModal) closeModal.addEventListener('click', closeBookModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeBookModal);

    // Book form submission
    const bookForm = document.getElementById('bookForm');
    if (bookForm) {
        bookForm.addEventListener('submit', handleBookForm);
    }

    // Delete confirmation
    const confirmDelete = document.getElementById('confirmDelete');
    const cancelDelete = document.getElementById('cancelDelete');
    if (confirmDelete) confirmDelete.addEventListener('click', confirmDeleteBook);
    if (cancelDelete) cancelDelete.addEventListener('click', closeDeleteModal);

    // Admin search
    const adminSearch = document.getElementById('adminSearch');
    if (adminSearch) {
        adminSearch.addEventListener('input', debounce(loadBooksTable, 300));
    }
});

// Check admin login status
function checkAdminLogin() {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
    const adminLogin = document.getElementById('adminLogin');
    const adminPanel = document.getElementById('adminPanel');

    if (isLoggedIn === 'true') {
        adminLogin.classList.add('hidden');
        adminPanel.classList.remove('hidden');
        loadStatistics();
        loadBooksTable();
    } else {
        adminLogin.classList.remove('hidden');
        adminPanel.classList.add('hidden');
    }
}

// Handle admin login
function handleLogin(e) {
    e.preventDefault();
    const password = document.getElementById('adminPassword').value;

    if (password === 'admin123') {
        sessionStorage.setItem('adminLoggedIn', 'true');
        checkAdminLogin();
    } else {
        alert('Incorrect password. Please try again.');
    }
}

// Handle admin logout
function handleLogout() {
    sessionStorage.removeItem('adminLoggedIn');
    checkAdminLogin();
}

// Load statistics
function loadStatistics() {
    const books = getBooks();
    const categories = getCategories();
    
    document.getElementById('totalBooks').textContent = books.length;
    document.getElementById('totalCategories').textContent = categories.length;
    
    const avgPrice = books.length > 0 
        ? (books.reduce((sum, book) => sum + book.price, 0) / books.length).toFixed(2)
        : '0.00';
    document.getElementById('avgPrice').textContent = `$${avgPrice}`;
}

// Load books table
function loadBooksTable() {
    const books = getBooks();
    const searchTerm = document.getElementById('adminSearch').value.toLowerCase();
    
    // Filter books by search
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm) || 
        book.author.toLowerCase().includes(searchTerm) ||
        book.category.toLowerCase().includes(searchTerm)
    );
    
    const tbody = document.getElementById('booksTableBody');
    
    if (filteredBooks.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No books found</td></tr>';
        return;
    }
    
    tbody.innerHTML = filteredBooks.map(book => `
        <tr>
            <td>
                <div class="table-image">
                    ${book.image ? `<img src="${book.image}" alt="${book.title}" style="width:100%;height:100%;object-fit:cover;border-radius:4px;">` : '📖'}
                </div>
            </td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td><span class="book-category">${book.category}</span></td>
            <td>$${book.price.toFixed(2)}</td>
            <td>
                <div class="table-actions">
                    <button class="btn btn-primary btn-small" onclick="editBook(${book.id})">Edit</button>
                    <button class="btn btn-danger btn-small" onclick="openDeleteModal(${book.id})">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Open book modal (for add or edit)
function openBookModal(bookId = null) {
    const modal = document.getElementById('bookModal');
    const modalTitle = document.getElementById('modalTitle');
    const form = document.getElementById('bookForm');
    
    form.reset();
    document.getElementById('bookId').value = '';
    
    if (bookId) {
        // Edit mode
        const book = getBookById(bookId);
        if (book) {
            modalTitle.textContent = 'Edit Book';
            document.getElementById('bookId').value = book.id;
            document.getElementById('title').value = book.title;
            document.getElementById('author').value = book.author;
            document.getElementById('price').value = book.price;
            document.getElementById('category').value = book.category;
            document.getElementById('isbn').value = book.isbn || '';
            document.getElementById('image').value = book.image || '';
            document.getElementById('description').value = book.description;
        }
    } else {
        // Add mode
        modalTitle.textContent = 'Add New Book';
    }
    
    modal.classList.remove('hidden');
}

// Close book modal
function closeBookModal() {
    const modal = document.getElementById('bookModal');
    modal.classList.add('hidden');
}

// Handle book form submission
function handleBookForm(e) {
    e.preventDefault();
    
    const bookId = document.getElementById('bookId').value;
    const bookData = {
        title: document.getElementById('title').value.trim(),
        author: document.getElementById('author').value.trim(),
        price: parseFloat(document.getElementById('price').value),
        category: document.getElementById('category').value,
        isbn: document.getElementById('isbn').value.trim(),
        image: document.getElementById('image').value.trim(),
        description: document.getElementById('description').value.trim()
    };
    
    // Validate
    if (!bookData.title || !bookData.author || !bookData.price || !bookData.category || !bookData.description) {
        alert('Please fill in all required fields.');
        return;
    }
    
    if (bookId) {
        // Update existing book
        updateBook(bookId, bookData);
        alert('Book updated successfully!');
    } else {
        // Add new book
        addBook(bookData);
        alert('Book added successfully!');
    }
    
    closeBookModal();
    loadBooksTable();
    loadStatistics();
}

// Edit book
function editBook(bookId) {
    openBookModal(bookId);
}

// Open delete confirmation modal
function openDeleteModal(bookId) {
    deleteBookId = bookId;
    const modal = document.getElementById('deleteModal');
    modal.classList.remove('hidden');
}

// Close delete modal
function closeDeleteModal() {
    deleteBookId = null;
    const modal = document.getElementById('deleteModal');
    modal.classList.add('hidden');
}

// Confirm delete book
function confirmDeleteBook() {
    if (deleteBookId) {
        deleteBook(deleteBookId);
        alert('Book deleted successfully!');
        closeDeleteModal();
        loadBooksTable();
        loadStatistics();
    }
}

// Debounce function
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
