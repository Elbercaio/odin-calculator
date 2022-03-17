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
      return divide(num1, num2);
  }
}

function updateDisplay(e) {
  if (typeof e != "string") {
    console.log(e.target);
    displayValue += e.target.textContent;
  } else {
    displayValue += e;
  }
  display.textContent = displayValue;
}
function pressAC() {
  displayValue = "0";
  display.textContent = displayValue;
}
function pressEqual() {
  let components = displayValue.split(" ");
}

let displayValue = "";
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
  if (!isNaN(e.key) || e.key === ".") {
    updateDisplay(e.key);
  } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "*") {
    updateDisplay(` ${e.key} `);
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
