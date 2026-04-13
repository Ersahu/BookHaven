# 📚 BookHaven - Online Book Store

A modern, responsive online bookstore built with pure HTML, CSS, and JavaScript. Features a complete admin panel for managing books, search and filter functionality, and a beautiful user interface.

## ✨ Features

### User Features
- **Home Page**: Hero section with search, featured books, and category browsing
- **Book Catalog**: Browse all books with advanced filtering and sorting
  - Search by title or author
  - Filter by category (Fiction, Non-Fiction, Science, Technology, History, Biography)
  - Sort by title, price (low/high), or newest
- **Book Details**: View complete book information including title, author, price, category, ISBN, and description
- **Related Books**: Discover similar books in the same category
- **Contact Form**: Send messages with validated form fields
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Add to Cart**: UI-based shopping cart functionality

### Admin Features
- **Secure Login**: Password-protected admin panel (Password: `admin123`)
- **Dashboard Statistics**: View total books, categories, and average price
- **Book Management**:
  - Add new books with complete details
  - Edit existing book information
  - Delete books with confirmation dialog
  - Search and filter books in admin table
- **Data Persistence**: All changes saved to browser's localStorage

## 📸 Preview
<img width="1919" height="1139" alt="Screenshot 2026-04-13 165445" src="https://github.com/user-attachments/assets/75e96dea-ed06-48bf-bad5-ba3d05edcbcb" />
<img width="1918" height="1150" alt="Screenshot 2026-04-13 165456" src="https://github.com/user-attachments/assets/ba370da0-d4f0-41f8-9038-3af3e6da5268" />
<img width="1915" height="1151" alt="Screenshot 2026-04-13 165512" src="https://github.com/user-attachments/assets/50c6a625-6ee0-4658-8d6b-6d46edf24909" />


## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server or backend required!

### Installation

1. **Clone or download** the project files
2. **Open** `index.html` in your web browser
3. **Start browsing!** The bookstore comes pre-loaded with 15 sample books

### Quick Start
```bash
# Simply open the index.html file in your browser
# On Windows:
start index.html

# On macOS:
open index.html

# On Linux:
xdg-open index.html
```

## 📁 Project Structure

```
bookstore/
├── index.html              # Home page with featured books
├── books.html              # Book listing with search & filters
├── book-details.html       # Single book detail view
├── contact.html            # Contact form page
├── admin.html              # Admin panel for book management
├── css/
│   └── style.css           # Complete stylesheet (978 lines)
└── js/
    ├── data.js             # Data layer with localStorage helpers
    ├── main.js             # Home page functionality
    ├── books.js            # Book listing & filtering logic
    ├── book-details.js     # Book detail page logic
    ├── contact.js          # Contact form validation
    └── admin.js            # Admin panel CRUD operations
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and modern web standards
- **CSS3**: Flexbox, Grid, CSS Variables, Responsive Design
- **Vanilla JavaScript**: ES6+ features, no frameworks
- **localStorage**: Client-side data persistence
- **sessionStorage**: Admin session management

## 📖 Sample Data

The bookstore comes pre-loaded with 15 books across 6 categories:

| Category | Books |
|----------|-------|
| Fiction | The Great Gatsby, To Kill a Mockingbird, 1984, The Catcher in the Rye |
| Non-Fiction | Educated, Thinking Fast and Slow |
| Science | A Brief History of Time, The Selfish Gene |
| Technology | Clean Code, Introduction to Algorithms |
| History | Sapiens, Guns Germs and Steel, The Art of War |
| Biography | Steve Jobs, Becoming |

## 🔧 How to Use

### Browsing Books
1. Navigate to the **Books** page from the header
2. Use the search bar to find books by title or author
3. Filter by category using the dropdown
4. Sort books by your preference
5. Click any book card to view details

### Admin Panel
1. Click **Admin** in the navigation
2. Login with password: `admin123`
3. Use the dashboard to:
   - **Add Book**: Click "+ Add New Book" and fill in the form
   - **Edit Book**: Click the "Edit" button on any book row
   - **Delete Book**: Click "Delete" and confirm the action
   - **Search**: Use the search box to filter books in the table

### Contact Form
1. Navigate to the **Contact** page
2. Fill in all required fields (Name, Email, Subject, Message)
3. Submit the form
4. Messages are stored in localStorage

## 💾 Data Storage

All data is stored in the browser's localStorage:

- **`books`**: Array of book objects
- **`contactMessages`**: Array of submitted contact form messages
- **`cart`**: Shopping cart items (UI only)
- **`adminLoggedIn`**: Admin session flag (sessionStorage)


## 🎨 Design Features

- **Modern UI**: Clean, professional design with smooth transitions
- **Responsive Layout**: Mobile-first approach with breakpoints at 480px and 768px
- **CSS Variables**: Easy theme customization
- **Emoji Book Covers**: Fallback icons when no image URL is provided
- **Hover Effects**: Interactive cards and buttons
- **Modal Dialogs**: For admin forms and confirmations
- **Form Validation**: Client-side validation with user feedback

## 🌐 Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 Customization

### Adding Your Own Books
1. Go to Admin Panel
2. Login with `admin123`
3. Click "+ Add New Book"
4. Fill in all required fields
5. Click "Save Book"


## 🔒 Security Notes

⚠️ **Important**: This is a frontend-only demonstration project.

- Admin password is stored in plaintext (`admin123`)
- No server-side validation
- localStorage is not secure for sensitive data
- For production use, implement:
  - Backend authentication
  - Server-side validation
  - Database storage
  - HTTPS encryption
  - CSRF protection

## 🐛 Troubleshooting

**Books not showing?**
- Check browser console for errors
- Clear localStorage and reload to reset sample data

**Admin login not working?**
- Password is case-sensitive: `admin123`
- Clear the sessionStorage and try again

**Changes not persisting?**
- Ensure localStorage is enabled in your browser
- Check if you're in private/incognito mode (limits storage)

## 🤝 Contributions
We welcome pull requests! For major changes, please open an issue to discuss what you'd like to improve or add.

## 📧 Contact
**Developer**: Vaibhav

**Email**: sahuvaibhav064@gmail.com

**LinkedIn**: https://www.linkedin.com/in/vaibhav-chaudhary-615712272/

## 📜 License
MIT License © 2025 Vaibhav
