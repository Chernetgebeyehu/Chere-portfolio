// ===== CALCULATOR STATE =====
let currentOperand = '0';
let previousOperand = '';
let operation = null;
let shouldResetScreen = false;
let history = [];

// ===== DOM ELEMENTS =====
const currentOperandElement = document.getElementById('current-operand');
const previousOperandElement = document.getElementById('previous-operand');
const historyListElement = document.getElementById('history-list');

// ===== UPDATE DISPLAY =====
function updateDisplay() {
  currentOperandElement.textContent = formatNumber(currentOperand);
  
  if (operation != null) {
    previousOperandElement.textContent = `${formatNumber(previousOperand)} ${operation}`;
  } else {
    previousOperandElement.textContent = '';
  }
}

// ===== FORMAT NUMBER =====
function formatNumber(number) {
  if (number === '') return '0';
  
  const stringNumber = number.toString();
  const parts = stringNumber.split('.');
  const integerPart = parseFloat(parts[0]).toLocaleString('en');
  
  if (parts.length > 1) {
    return `${integerPart}.${parts[1]}`;
  }
  
  return integerPart;
}

// ===== APPEND NUMBER =====
function appendNumber(number) {
  if (shouldResetScreen) {
    currentOperand = '';
    shouldResetScreen = false;
  }
  
  if (number === '.' && currentOperand.includes('.')) return;
  if (currentOperand === '0' && number !== '.') {
    currentOperand = number;
  } else {
    currentOperand = currentOperand.toString() + number.toString();
  }
  
  updateDisplay();
}

// ===== APPEND OPERATOR =====
function appendOperator(op) {
  if (operation !== null) calculate();
  
  operation = op;
  previousOperand = currentOperand;
  shouldResetScreen = true;
  updateDisplay();
}

// ===== CALCULATE =====
function calculate() {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  
  if (isNaN(prev) || isNaN(current)) return;
  
  switch (operation) {
    case '+':
      computation = prev + current;
      break;
    case '−':
    case '-':
      computation = prev - current;
      break;
    case '×':
    case '*':
      computation = prev * current;
      break;
    case '÷':
    case '/':
      if (current === 0) {
        alert("Cannot divide by zero!");
        clearAll();
        return;
      }
      computation = prev / current;
      break;
    default:
      return;
  }
  
  // Add to history
  addToHistory(`${prev} ${operation} ${current}`, computation);
  
  currentOperand = computation.toString();
  operation = null;
  previousOperand = '';
  shouldResetScreen = true;
  updateDisplay();
}

// ===== CLEAR ALL =====
function clearAll() {
  currentOperand = '0';
  previousOperand = '';
  operation = null;
  shouldResetScreen = false;
  updateDisplay();
}

// ===== DELETE LAST =====
function deleteLast() {
  if (shouldResetScreen) return;
  
  currentOperand = currentOperand.toString().slice(0, -1);
  if (currentOperand === '') currentOperand = '0';
  updateDisplay();
}

// ===== PERCENTAGE =====
function percentage() {
  currentOperand = (parseFloat(currentOperand) / 100).toString();
  updateDisplay();
}

// ===== TOGGLE SIGN =====
function toggleSign() {
  if (currentOperand === '0') return;
  
  if (currentOperand.startsWith('-')) {
    currentOperand = currentOperand.slice(1);
  } else {
    currentOperand = '-' + currentOperand;
  }
  updateDisplay();
}

// ===== KEYBOARD SUPPORT =====
document.addEventListener('keydown', function(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === '.') appendNumber('.');
  if (e.key === '=' || e.key === 'Enter') calculate();
  if (e.key === 'Backspace') deleteLast();
  if (e.key === 'Escape') clearAll();
  if (e.key === '+') appendOperator('+');
  if (e.key === '-') appendOperator('−');
  if (e.key === '*') appendOperator('×');
  if (e.key === '/') {
    e.preventDefault();
    appendOperator('÷');
  }
  if (e.key === '%') percentage();
});

// ===== HISTORY FUNCTIONS =====
function addToHistory(calculation, result) {
  const historyItem = {
    calculation: calculation,
    result: result,
    timestamp: new Date().toLocaleTimeString()
  };
  
  history.unshift(historyItem);
  
  // Keep only last 10 calculations
  if (history.length > 10) {
    history.pop();
  }
  
  updateHistory();
}

function updateHistory() {
  historyListElement.innerHTML = '';
  
  if (history.length === 0) {
    historyListElement.innerHTML = '<p class="no-history">No calculations yet</p>';
    return;
  }
  
  history.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'history-item';
    div.innerHTML = `
      <div class="calculation">${item.calculation}</div>
      <div class="result">= ${formatNumber(item.result.toString())}</div>
    `;
    
    div.addEventListener('click', () => {
      currentOperand = item.result.toString();
      updateDisplay();
    });
    
    historyListElement.appendChild(div);
  });
}

function clearHistory() {
  if (history.length === 0) return;
  
  if (confirm('Are you sure you want to clear all history?')) {
    history = [];
    updateHistory();
  }
}

// ===== THEME TOGGLE =====
function toggleTheme() {
  const body = document.body;
  const themeIcon = document.getElementById('theme-icon');
  
  body.classList.toggle('light-theme');
  
  if (body.classList.contains('light-theme')) {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    localStorage.setItem('calculator-theme', 'light');
  } else {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    localStorage.setItem('calculator-theme', 'dark');
  }
}

// Load saved theme
function loadTheme() {
  const savedTheme = localStorage.getItem('calculator-theme');
  const themeIcon = document.getElementById('theme-icon');
  
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  }
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
  loadTheme();
  updateDisplay();
  updateHistory();
});