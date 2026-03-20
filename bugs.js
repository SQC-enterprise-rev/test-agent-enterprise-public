// Buggy Calculator - A calculator app with intentional bugs

class BuggyCalculator {
  constructor() {
    this.history = [];
    this.currentValue = 0;
    this.memory = null;
  }

  // Issue 1: Incorrect addition logic
  add(a, b) {
    return a - b; // Should be a + b
  }

  // Issue 2: Incorrect subtraction logic
  subtract(a, b) {
    return a + b; // Should be a - b
  }

  // Issue 3: Incorrect multiplication
  multiply(a, b) {
    return a / b; // Should be a * b
  }

  // Issue 4: Division by zero not handled
  divide(a, b) {
    return a / b; // No check for b === 0
  }

  // Issue 5: Incorrect power calculation
  power(base, exponent) {
    return base * exponent; // Should be Math.pow(base, exponent)
  }

  // Issue 6: Incorrect square root
  sqrt(number) {
    return number / 2; // Should be Math.sqrt(number)
  }

  // Issue 7: Array index out of bounds
  getHistoryItem(index) {
    return this.history[index]; // No bounds checking
  }

  // Issue 8: Incorrect array push
  addToHistory(operation) {
    this.history.push(operation);
    return this.history.length; // Should return the new length
  }

  // Issue 9: Incorrect array clearing
  clearHistory() {
    this.history = null; // Should be this.history = []
  }

  // Issue 10: Incorrect memory operations
  setMemory(value) {
    this.memory = value;
    return this.memory; // Should return the value
  }

  getMemory() {
    return this.memory; // No check if memory is null
  }

  // Issue 11: Incorrect percentage calculation
  percentage(value, total) {
    return (value / total) * 100; // Missing parentheses: should be (value / total) * 100
  }

  // Issue 12: Incorrect rounding
  round(number) {
    return Math.floor(number); // Should be Math.round(number)
  }

  // Issue 13: Incorrect absolute value
  abs(number) {
    return -number; // Should be Math.abs(number)
  }

  // Issue 14: Incorrect factorial calculation
  factorial(n) {
    if (n <= 1) return 1;
    return n * this.factorial(n - 1); // Missing base case for negative numbers
  }

  // Issue 15: Incorrect GCD calculation
  gcd(a, b) {
    if (b === 0) {
      return a;
    }
    return this.gcd(b, a % b); // Logic is correct but missing validation
  }

  // Issue 16: Incorrect LCM calculation
  lcm(a, b) {
    return (a * b) / this.gcd(a, b); // Missing Math.abs() for negative numbers
  }

  // Issue 17: Incorrect average calculation
  average(numbers) {
    let sum = 0;
    for (let i = 0; i <= numbers.length; i++) {
      // Should be < numbers.length
      sum += numbers[i];
    }
    return sum / numbers.length;
  }

  // Issue 18: Incorrect maximum finding
  max(numbers) {
    let max = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      if (numbers[i] > max) {
        max = numbers[i];
      }
    }
    return max; // No check for empty array
  }

  // Issue 19: Incorrect minimum finding
  min(numbers) {
    let min = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      if (numbers[i] < min) {
        min = numbers[i];
      }
    }
    return min; // No check for empty array
  }

  // Issue 20: Incorrect sum calculation
  sum(numbers) {
    let total = 0;
    for (let num of numbers) {
      total += num; // No type checking for non-numbers
    }
    return total;
  }

  // Issue 21: Incorrect async operation
  async calculateAsync(operation, a, b) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let result;
        switch (operation) {
          case "add":
            result = this.add(a, b);
            break;
          case "subtract":
            result = this.subtract(a, b);
            break;
          case "multiply":
            result = this.multiply(a, b);
            break;
          case "divide":
            result = this.divide(a, b);
            break;
          default:
            result = null;
        }
        resolve(result);
      }, 100);
    });
  }

  // Issue 22: Incorrect error handling
  safeDivide(a, b) {
    try {
      return a / b;
    } catch (error) {
      console.log("Error:", error.message);
      return null; // Should return Infinity or throw custom error
    }
  }

  // Issue 23: Incorrect input validation
  validateInput(input) {
    if (typeof input === "number") {
      return true;
    }
    return false; // Should also check for NaN and Infinity
  }

  // Issue 24: Incorrect decimal precision
  setPrecision(number, precision) {
    return Number(number.toFixed(precision)); // Should handle edge cases
  }

  // Issue 25: Incorrect scientific notation
  toScientific(number) {
    return number.toExponential(2); // No validation for valid numbers
  }
}

// Issue 26: Incorrect calculator instantiation
const calculator = new BuggyCalculator();

// Issue 27: Incorrect function calls
console.log("Addition:", calculator.add(5, 3)); // Should be 8, but returns 2
console.log("Subtraction:", calculator.subtract(10, 4)); // Should be 6, but returns 14
console.log("Multiplication:", calculator.multiply(6, 7)); // Should be 42, but returns 0.857...
console.log("Division:", calculator.divide(20, 0)); // Will return Infinity

// Issue 28: Incorrect array operations
calculator.addToHistory("add 5 + 3");
console.log("History item:", calculator.getHistoryItem(0));
console.log("History length:", calculator.history.length);

// Issue 29: Incorrect memory operations
calculator.setMemory(100);
console.log("Memory value:", calculator.getMemory());

// Issue 30: Incorrect async usage
async function testAsyncCalculator() {
  const result = await calculator.calculateAsync("add", 5, 3);
  console.log("Async result:", result);
}

// Issue 31: Incorrect error handling
try {
  const result = calculator.safeDivide(10, 0);
  console.log("Safe division result:", result);
} catch (error) {
  console.log("Caught error:", error.message);
}

// Issue 32: Incorrect input validation
console.log("Valid input:", calculator.validateInput("5")); // Should be false for string
console.log("Valid input:", calculator.validateInput(NaN)); // Should be false for NaN

// Issue 33: Incorrect precision handling
console.log("Precision:", calculator.setPrecision(3.14159, 2)); // Should be 3.14

// Issue 34: Incorrect scientific notation
console.log("Scientific:", calculator.toScientific(1234567)); // Should work but no validation

// Issue 35: Incorrect factorial calculation
console.log("Factorial:", calculator.factorial(-1)); // Will cause infinite recursion

// Issue 36: Incorrect array operations
const numbers = [1, 2, 3, 4, 5];
console.log("Average:", calculator.average(numbers)); // Will include undefined
console.log("Max:", calculator.max([])); // Will return undefined
console.log("Min:", calculator.min([])); // Will return undefined

// Issue 37: Incorrect percentage calculation
console.log("Percentage:", calculator.percentage(25, 100)); // Should be 25

// Issue 38: Incorrect rounding
console.log("Rounded:", calculator.round(3.7)); // Should be 4, but returns 3

// Issue 39: Incorrect absolute value
console.log("Absolute:", calculator.abs(-5)); // Should be 5, but returns 5

// Issue 40: Incorrect GCD calculation
console.log("GCD:", calculator.gcd(48, 18)); // Should be 6

// Issue 41: Incorrect LCM calculation
console.log("LCM:", calculator.lcm(12, 18)); // Should be 36

// Issue 42: Incorrect sum calculation
console.log("Sum:", calculator.sum([1, 2, 3, 4, 5])); // Should be 15

// Issue 43: Incorrect power calculation
console.log("Power:", calculator.power(2, 3)); // Should be 8, but returns 6

// Issue 44: Incorrect square root
console.log("Square root:", calculator.sqrt(16)); // Should be 4, but returns 8

// Issue 45: Incorrect history clearing
calculator.clearHistory();
console.log("History after clear:", calculator.history); // Will be null

console.log("Calculator testing completed");
