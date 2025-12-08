#  Todo Application

A simple and elegant Todo application built with vanilla JavaScript that interacts with an external API and uses browser localStorage for data persistence.

##  Features

-  Fetch todos from JSONPlaceholder API
-  Store first 20 todos in localStorage
-  Clean and modern UI with responsive design
-  Toggle todo completion status
-  Delete todos with automatic re-rendering
- Real-time statistics (Total, Completed, Pending)
- Smooth animations and transitions
- Mobile-friendly responsive layout
-  Fast and lightweight (no frameworks)

_

##  Installation

1. Clone the repository:
```bash
git clone https://github.com/khalida-thummala/todo-app.git
```

2. Navigate to the project directory:
```bash
cd todo-app
```

3. Open `index.html` in your browser:
```bash
# On macOS
open index.html

# On Windows
start index.html

# On Linux
xdg-open index.html
```

Or simply drag and drop the `index.html` file into your browser.

##  Project Structure
```
todo-app/
 ├── index.html      # Main HTML file
 ├── style.css       # Styles and animations
 ├── script.js       # JavaScript logic
 └── README.md       # Project documentation
```

##  Technologies Used

- **HTML5** - Structure and semantics
- **CSS3** - Styling, animations, and responsive design
- **JavaScript (ES6+)** - Application logic and API interaction
- **localStorage** - Browser storage for data persistence
- **JSONPlaceholder API** - External REST API for todo data

## 🎯 Core Functionality

### API Integration
```javascript
// Fetches todos from JSONPlaceholder API
fetch('https://jsonplaceholder.typicode.com/todos')
```

### Data Storage
- Automatically stores first 20 todos in localStorage
- Persists user modifications (deletions, status changes)
- Retrieves data on page load

### User Actions
- **Toggle Complete**: Click the circle icon to mark todo as complete/incomplete
- **Delete Todo**: Click the trash icon to remove a todo
- **View Statistics**: See total, completed, and pending counts in real-time



##  Development

### Key Functions

- `fetchAndStoreTodos()` - Fetches todos from API
- `storeTodos(todos)` - Saves todos to localStorage
- `getTodosFromStorage()` - Retrieves todos from localStorage
- `renderTodos(todos)` - Renders todo list to DOM
- `deleteTodo(id)` - Removes a specific todo
- `toggleTodo(id)` - Toggles completion status
- `updateStats(todos)` - Updates statistics display

### Local Storage Schema
```javascript
{
  "todos": [
    {
      "userId": 1,
      "id": 1,
      "title": "delectus aut autem",
      "completed": false
    },
    // ... more todos
  ]
}
```

##  Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)



##  Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)

## Acknowledgments

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) - Free fake API for testing
- Design inspiration from modern UI trends

---

⭐ Star this repo if you found it helpful!