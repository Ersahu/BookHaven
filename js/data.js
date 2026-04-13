// ===================================
// Data Layer - localStorage Management
// ===================================

// Sample book data to initialize the store
const sampleBooks = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 12.99,
        category: "Fiction",
        description: "A story of the mysteriously wealthy Jay Gatsby and his quixotic passion and obsession for the beautiful former debutante Daisy Buchanan.",
        image: "",
        isbn: "978-0743273565"
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        price: 14.99,
        category: "Fiction",
        description: "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it. Through the young eyes of Scout and Jem Finch, Harper Lee explores with rich humor and unswerving morality the nature of human beings.",
        image: "",
        isbn: "978-0061120084"
    },
    {
        id: 3,
        title: "A Brief History of Time",
        author: "Stephen Hawking",
        price: 18.99,
        category: "Science",
        description: "A landmark volume in science writing by one of the great minds of our time, Stephen Hawking's book explores such profound questions as: How did the universe begin? What made its start possible?",
        image: "",
        isbn: "978-0553380163"
    },
    {
        id: 4,
        title: "Clean Code",
        author: "Robert C. Martin",
        price: 42.99,
        category: "Technology",
        description: "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees. This book is a must for any developer, software engineer, or project manager.",
        image: "",
        isbn: "978-0132350884"
    },
    {
        id: 5,
        title: "Sapiens: A Brief History of Humankind",
        author: "Yuval Noah Harari",
        price: 24.99,
        category: "History",
        description: "In Sapiens, Dr. Yuval Noah Harari spans the whole of human history, from the very first humans to walk the earth to the radical breakthroughs of the Cognitive, Agricultural, and Scientific Revolutions.",
        image: "",
        isbn: "978-0062316097"
    },
    {
        id: 6,
        title: "Steve Jobs",
        author: "Walter Isaacson",
        price: 19.99,
        category: "Biography",
        description: "Based on more than forty interviews with Steve Jobs conducted over two years, as well as interviews with more than a hundred family members, friends, adversaries, competitors, and colleagues.",
        image: "",
        isbn: "978-1451648539"
    },
    {
        id: 7,
        title: "1984",
        author: "George Orwell",
        price: 11.99,
        category: "Fiction",
        description: "Among the seminal texts of the 20th century, Nineteen Eighty-Four is a rare work that grows more haunting as its dystopian proscriptions have become a reality.",
        image: "",
        isbn: "978-0451524935"
    },
    {
        id: 8,
        title: "The Selfish Gene",
        author: "Richard Dawkins",
        price: 16.99,
        category: "Science",
        description: "Professor Dawkins articulates a gene's eye view of evolution, putting the gene at the center of the action and showing how individual genes shape the behavior of animals and humans.",
        image: "",
        isbn: "978-0198788607"
    },
    {
        id: 9,
        title: "Introduction to Algorithms",
        author: "Thomas H. Cormen",
        price: 89.99,
        category: "Technology",
        description: "A comprehensive textbook covering the full spectrum of modern algorithms: from the fastest algorithms and data structures to polynomial-time algorithms for seemingly intractable problems.",
        image: "",
        isbn: "978-0262033848"
    },
    {
        id: 10,
        title: "Guns, Germs, and Steel",
        author: "Jared Diamond",
        price: 17.99,
        category: "History",
        description: "Winner of the Pulitzer Prize, Guns, Germs, and Steel is a brilliant work answering the question of why the peoples of certain continents succeeded in invading other continents and conquering or displacing their peoples.",
        image: "",
        isbn: "978-0393354324"
    },
    {
        id: 11,
        title: "Becoming",
        author: "Michelle Obama",
        price: 21.99,
        category: "Biography",
        description: "In her memoir, a work of deep reflection and mesmerizing storytelling, Michelle Obama invites readers into her world, chronicling the experiences that have shaped her.",
        image: "",
        isbn: "978-1524763138"
    },
    {
        id: 12,
        title: "Educated",
        author: "Tara Westover",
        price: 16.99,
        category: "Non-Fiction",
        description: "An unforgettable memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.",
        image: "",
        isbn: "978-0399590504"
    },
    {
        id: 13,
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        price: 13.99,
        category: "Fiction",
        description: "The hero-narrator of The Catcher in the Rye is an ancient child of sixteen, a native New Yorker named Holden Caulfield. Through circumstances that tend to preclude adult, secondhand description, he leaves his prep school in Pennsylvania and goes underground in New York City for three days.",
        image: "",
        isbn: "978-0316769488"
    },
    {
        id: 14,
        title: "Thinking, Fast and Slow",
        author: "Daniel Kahneman",
        price: 19.99,
        category: "Non-Fiction",
        description: "In this international bestseller, Daniel Kahneman, the renowned psychologist and winner of the Nobel Prize in Economics, takes us on a groundbreaking tour of the mind and explains the two systems that drive the way we think.",
        image: "",
        isbn: "978-0374533557"
    },
    {
        id: 15,
        title: "The Art of War",
        author: "Sun Tzu",
        price: 9.99,
        category: "History",
        description: "The Art of War is an ancient Chinese military treatise dating from the Late Spring and Autumn Period. The work, attributed to the ancient Chinese military strategist Sun Tzu, is composed of 13 chapters.",
        image: "",
        isbn: "978-1599869773"
    }
];

// Initialize sample data if localStorage is empty
function initializeSampleData() {
    if (!localStorage.getItem('books')) {
        localStorage.setItem('books', JSON.stringify(sampleBooks));
    }
}

// Get all books from localStorage
function getBooks() {
    const books = localStorage.getItem('books');
    return books ? JSON.parse(books) : [];
}

// Save books array to localStorage
function saveBooks(books) {
    localStorage.setItem('books', JSON.stringify(books));
}

// Get a single book by ID
function getBookById(id) {
    const books = getBooks();
    return books.find(book => book.id === parseInt(id));
}

// Add a new book
function addBook(bookData) {
    const books = getBooks();
    const newId = books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;
    const newBook = {
        id: newId,
        ...bookData
    };
    books.push(newBook);
    saveBooks(books);
    return newBook;
}

// Update an existing book
function updateBook(id, bookData) {
    const books = getBooks();
    const index = books.findIndex(book => book.id === parseInt(id));
    if (index !== -1) {
        books[index] = { id: parseInt(id), ...bookData };
        saveBooks(books);
        return books[index];
    }
    return null;
}

// Delete a book
function deleteBook(id) {
    const books = getBooks();
    const filteredBooks = books.filter(book => book.id !== parseInt(id));
    if (filteredBooks.length < books.length) {
        saveBooks(filteredBooks);
        return true;
    }
    return false;
}

// Get all unique categories
function getCategories() {
    const books = getBooks();
    const categories = [...new Set(books.map(book => book.category))];
    return categories.sort();
}

// Initialize data on page load
initializeSampleData();
