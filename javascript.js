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
        return "0";
      }
      return divide(num1, num2);
  }
}

function updateDisplay(e) {
  let character = "";
  if (typeof e == "object") {
    character = e.target.textContent;
  } else if (typeof e == "string" && (e === "NaN" || e === "Infinity")) {
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
      operation = character;
      displayValue = operation;
    } else {
      operation = character;
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
    displayValue = String(character);
  } else {
    displayValue += String(character);
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
    displayValue = String(result);
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
  } else if (e.key === "Delete" || e.key === "Escape") {
    pressAC();
  } else if (e.key === "Backspace") {
    displayValue = displayValue.split("");
    displayValue.pop();
    if (displayValue.length === 1) {
      displayValue = displayValue[0];
    } else if (displayValue.length === 0) {
      displayValue = "0";
    } else {
      displayValue = displayValue.join("");
    }
    display.textContent = displayValue;
  }
};
