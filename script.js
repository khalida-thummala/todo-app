// Constants
const API_URL = 'https://jsonplaceholder.typicode.com/todos';
const STORAGE_KEY = 'todos';
const MAX_TODOS = 20;

// DOM Elements
const loadingEl = document.getElementById('loading');
const todoContainer = document.getElementById('todoContainer');
const statsEl = document.getElementById('stats');

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

/**
 * Initialize the application
 */
async function initApp() {
    const storedTodos = getTodosFromStorage();
    
    if (storedTodos && storedTodos.length > 0) {
        // Use stored todos if available
        renderTodos(storedTodos);
        hideLoading();
    } else {
        // Fetch from API if no stored todos
        await fetchAndStoreTodos();
    }
}

/**
 * Fetch todos from API and store them
 */
async function fetchAndStoreTodos() {
    try {
        showLoading();
        
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('Failed to fetch todos');
        }
        
        const allTodos = await response.json();
        const first20Todos = allTodos.slice(0, MAX_TODOS);
        
        // Store in localStorage
        storeTodos(first20Todos);
        
        // Render todos
        renderTodos(first20Todos);
        
    } catch (error) {
        console.error('Error fetching todos:', error);
        todoContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">⚠️</div>
                <h3>Error Loading Todos</h3>
                <p>Please check your internet connection and try again.</p>
            </div>
        `;
    } finally {
        hideLoading();
    }
}

/**
 * Store todos in localStorage
 * @param {Array} todos - Array of todo objects
 */
function storeTodos(todos) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
        console.error('Error storing todos:', error);
    }
}

/**
 * Get todos from localStorage
 * @returns {Array|null} Array of todos or null
 */
function getTodosFromStorage() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : null;
    } catch (error) {
        console.error('Error reading todos from storage:', error);
        return null;
    }
}

/**
 * Render todos to the DOM
 * @param {Array} todos - Array of todo objects
 */
function renderTodos(todos) {
    // Clear container
    todoContainer.innerHTML = '';
    
    // Update stats
    updateStats(todos);
    
    // Check if todos array is empty
    if (todos.length === 0) {
        renderEmptyState();
        return;
    }
    
    // Create and append todo items
    todos.forEach(todo => {
        const todoElement = createTodoElement(todo);
        todoContainer.appendChild(todoElement);
    });
}

/**
 * Create a todo element
 * @param {Object} todo - Todo object
 * @returns {HTMLElement} Todo element
 */
function createTodoElement(todo) {
    const todoDiv = document.createElement('div');
    todoDiv.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    todoDiv.dataset.id = todo.id;
    
    todoDiv.innerHTML = `
        <button class="toggle-btn" onclick="toggleTodo(${todo.id})" aria-label="${todo.completed ? 'Mark as incomplete' : 'Mark as complete'}"></button>
        
        <div class="todo-content">
            <p class="todo-title">${escapeHtml(todo.title)}</p>
            <div class="todo-meta">
                <span class="todo-id">ID: ${todo.id}</span>
                <span class="todo-status ${todo.completed ? 'completed' : 'pending'}">
                    ${todo.completed ? 'Completed' : 'Pending'}
                </span>
            </div>
        </div>
        
        <button class="delete-btn" onclick="deleteTodo(${todo.id})" aria-label="Delete todo">
            <svg class="delete-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
        </button>
    `;
    
    return todoDiv;
}

/**
 * Render empty state
 */
function renderEmptyState() {
    todoContainer.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">✨</div>
            <h3>No Todos Available</h3>
            <p>All tasks have been completed or removed!</p>
        </div>
    `;
}

/**
 * Delete a todo
 * @param {number} id - Todo ID
 */
function deleteTodo(id) {
    const todos = getTodosFromStorage();
    
    if (!todos) return;
    
    // Filter out the deleted todo
    const updatedTodos = todos.filter(todo => todo.id !== id);
    
    // Update storage
    storeTodos(updatedTodos);
    
    // Re-render
    renderTodos(updatedTodos);
}

/**
 * Toggle todo completion status
 * @param {number} id - Todo ID
 */
function toggleTodo(id) {
    const todos = getTodosFromStorage();
    
    if (!todos) return;
    
    // Toggle the completed status
    const updatedTodos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    
    // Update storage
    storeTodos(updatedTodos);
    
    // Re-render
    renderTodos(updatedTodos);
}

/**
 * Update statistics
 * @param {Array} todos - Array of todos
 */
function updateStats(todos) {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const pending = total - completed;
    
    statsEl.innerHTML = `
        <span class="stat-badge stat-total">Total: ${total}</span>
        <span class="stat-badge stat-completed">Completed: ${completed}</span>
        <span class="stat-badge stat-pending">Pending: ${pending}</span>
    `;
}

/**
 * Show loading state
 */
function showLoading() {
    loadingEl.classList.remove('hidden');
    todoContainer.style.display = 'none';
}

/**
 * Hide loading state
 */
function hideLoading() {
    loadingEl.classList.add('hidden');
    todoContainer.style.display = 'block';
}

/**
 * Escape HTML to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}