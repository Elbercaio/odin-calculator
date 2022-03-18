function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operator(op, num1, num2) {
  switch (op) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      if (num2 === 0) {
        pressAC();
        alert("Divisão por 0 é uma pessima ideia!");
      }
      return divide(num1, num2);
  }
}

function updateDisplay(e) {
  let character = "";
  if (typeof e != "string") {
    character = e.target.textContent;
  } else {
    character = e;
  }
  if (
    character.includes("-") ||
    character.includes("+") ||
    character.includes("/") ||
    character.includes("*")
  ) {
    if (operation !== "") {
      pressEqual();
    } else {
      operation = character.slice(0);
      storedValues.push(displayValue);
      displayValue = operation;
    }
  } else if (
    displayValue === "0" ||
    displayValue.includes("-") ||
    displayValue.includes("+") ||
    displayValue.includes("/") ||
    displayValue.includes("*")
  ) {
    displayValue = character;
  } else {
    displayValue += character;
  }
  display.textContent = displayValue;
}

function pressAC() {
  displayValue = "0";
  operation = "";
  display.textContent = displayValue;
  storedValues = [];
}

function pressEqual() {
  if (operation !== "") {
    storedValues.push(displayValue);
    let result = operator(
      operation,
      parseFloat(storedValues[storedValues.length - 2]),
      parseFloat(storedValues[storedValues.length - 1])
    );
    displayValue = result;
    display.textContent = displayValue;
    storedValues.push(displayValue);
    operation = "";
  }
}

let storedValues = [];
let operation = "";

let displayValue = "0";
const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".number");
numbers.forEach((number) => {
  number.addEventListener("click", updateDisplay);
});
const operators = document.querySelectorAll(".op");
operators.forEach((operator) => {
  operator.addEventListener("click", updateDisplay);
});

const AC = document.querySelector("#AC");
AC.addEventListener("click", pressAC);

const equal = document.querySelector(".equal");
equal.addEventListener("click", pressEqual);

document.onkeydown = function (e) {
  e = e || window.event;
  if (
    !isNaN(e.key) ||
    e.key === "." ||
    e.key === "+" ||
    e.key === "-" ||
    e.key === "/" ||
    e.key === "*"
  ) {
    updateDisplay(e.key);
  } else if (e.key === "Enter" || e.key === "") {
    pressEqual();
  } else if (
    e.key === "Delete" ||
    e.key === "Backspace" ||
    e.key === "Escape"
  ) {
    pressAC();
  }
};
