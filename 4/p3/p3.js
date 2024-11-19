let displayValue = "0";
let memoryValue = 0;
let newNumber = true;
const PI = Math.PI;

function updateDisplay() {
  document.getElementById("display").textContent = displayValue;
  document.getElementById("memoryDisplay").textContent = memoryValue ? "M" : "";
}

function appendNumber(num) {
  if (newNumber) {
    displayValue = num;
    newNumber = false;
  } else {
    displayValue = displayValue === "0" ? num : displayValue + num;
  }
  updateDisplay();
}

function appendOperator(operator) {
  if (!displayValue.endsWith(operator)) {
    displayValue += operator;
    newNumber = false;
  }
  updateDisplay();
}

function clearDisplay() {
  displayValue = "0";
  newNumber = true;
  updateDisplay();
}

function deleteLastChar() {
  displayValue = displayValue.slice(0, -1) || "0";
  updateDisplay();
}

function calculate() {
  try {
    displayValue = eval(displayValue.replace(/×/g, "*")).toString();
    newNumber = true;
    updateDisplay();
  } catch (error) {
    displayValue = "Error";
    newNumber = true;
    updateDisplay();
  }
}

// // Memory Functions
// function memoryClear() {
//   memoryValue = 0;
//   updateDisplay();
// }

// function memoryRecall() {
//   displayValue = memoryValue.toString();
//   newNumber = true;
//   updateDisplay();
// }

// function memoryAdd() {
//   memoryValue += parseFloat(displayValue);
//   newNumber = true;
//   updateDisplay();
// }

// function memorySubtract() {
//   memoryValue -= parseFloat(displayValue);
//   newNumber = true;
//   updateDisplay();
// }

// function memoryStore() {
//   memoryValue = parseFloat(displayValue);
//   newNumber = true;
//   updateDisplay();
// }

// Scientific Functions
function calculateSquare() {
  const num = parseFloat(displayValue);
  displayValue = (num * num).toString();
  newNumber = true;
  updateDisplay();
}

function calculateSquareRoot() {
  const num = parseFloat(displayValue);
  if (num >= 0) {
    displayValue = Math.sqrt(num).toString();
    newNumber = true;
    updateDisplay();
  } else {
    displayValue = "Error";
    updateDisplay();
  }
}

function calculateSin() {
  const num = parseFloat(displayValue);
  displayValue = Math.sin((num * Math.PI) / 180).toString();
  newNumber = true;
  updateDisplay();
}

function calculateCos() {
  const num = parseFloat(displayValue);
  displayValue = Math.cos((num * Math.PI) / 180).toString();
  newNumber = true;
  updateDisplay();
}

function calculateTan() {
  const num = parseFloat(displayValue);
  displayValue = Math.tan((num * Math.PI) / 180).toString();
  newNumber = true;
  updateDisplay();
}

function calculateLog() {
  const num = parseFloat(displayValue);
  if (num > 0) {
    displayValue = Math.log10(num).toString();
    newNumber = true;
    updateDisplay();
  } else {
    displayValue = "Error";
    updateDisplay();
  }
}

function calculateFactorial() {
  const num = parseInt(displayValue);
  if (num >= 0 && num <= 170) {
    let result = 1;
    for (let i = 2; i <= num; i++) {
      result *= i;
    }
    displayValue = result.toString();
    newNumber = true;
    updateDisplay();
  } else {
    displayValue = "Error";
    updateDisplay();
  }
}

function calculatePi() {
  displayValue = PI.toString();
  newNumber = true;
  updateDisplay();
}

function toggleSign() {
  const num = parseFloat(displayValue);
  displayValue = (-num).toString();
  updateDisplay();
}

function calculatePower() {
  appendOperator("**");
}
