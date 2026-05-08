class Calculator {
  constructor(displayElement) {
    this.display = displayElement;
    this.currentInput = "";
  }

  updateDisplay() {
    this.display.value = this.currentInput || "0";
  }

  appendValue(value) {
    if (this.display.value === "Erro") {
      this.currentInput = "";
    }

    this.currentInput += value;
    this.updateDisplay();
  }

  clear() {
    this.currentInput = "";
    this.updateDisplay();
  }

  calculate() {
    try {
      if (!this.currentInput) return;

      const result = Function(`return ${this.currentInput}`)();

      this.currentInput = String(result);
    } catch {
      this.currentInput = "Erro";
    }

    this.updateDisplay();
  }

  handleKeyboard(key) {
    const allowedKeys = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "+",
      "-",
      "*",
      "/",
      ".",
    ];

    if (allowedKeys.includes(key)) {
      this.appendValue(key);
    }

    if (key === "Enter") {
      this.calculate();
    }

    if (key === "Backspace") {
      this.currentInput = this.currentInput.slice(0, -1);

      this.updateDisplay();
    }

    if (key === "Escape") {
      this.clear();
    }
  }
}

const display = document.getElementById("display");

const calculator = new Calculator(display);

calculator.updateDisplay();

document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;

    if (value === "C") {
      calculator.clear();
      return;
    }

    if (value === "=") {
      calculator.calculate();
      return;
    }

    calculator.appendValue(value);
  });
});

document.addEventListener("keydown", (event) => {
  calculator.handleKeyboard(event.key);
});
