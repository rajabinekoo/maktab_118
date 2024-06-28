// ============================ if else, switch case ============================

// let type = prompt("Enter calculator type: (simple | advanced)");
// if (!calcType) {
//   calcType = "simple";
// }
// Ternary operator
// let calcType = Boolean(type) ? type : "simple";
// Nullish operators ?? ||
// Nullish values: false, 0, "", undefined, null
// ?? uses: undefined, null
// let calcType = type || "simple";
// console.log("Your calc mode:", calcType);

// let num1 = Number(prompt("Enter your first number:"));
// let num2 = Number(prompt("Enter your second number:"));
// let op = prompt("Enter your operation:");
// let age = Number(prompt("Enter your age:"));

// advanced calculator operators
// ^ power
// % remaining

// let result = `${num1} ${op} ${num2} = `;
// let advanced = calcType === "advanced";

// if (age < 15 && advanced) {
//   console.log("Movazeb bashia! :D");
// }

// if (isNaN(num1) || isNaN(num2)) {
//   result = "Invalid numbers";
// } else if (op === "+") {
//   result += num1 + num2;
// } else if (op === "-") {
//   result += num1 - num2;
// } else if (op === "x") {
//   result += num1 * num2;
// } else if (op === "/") {
//   result += num1 / num2;
// } else if (op === "^" && advanced) {
//   result += num1 ** num2;
// } else if (op === "%" && advanced) {
//   result += num1 % num2;
// } else {
//   result = "Invalid operator";
// }

// switch (op) {
//   case "+": {
//     result += num1 + num2;
//     break;
//   }
//   case "-": {
//     result += num1 - num2;
//     break;
//   }
//   case "x": {
//     result += num1 * num2;
//     break;
//   }
//   case "/": {
//     result += num1 / num2;
//     break;
//   }
//   default: {
//     result = "Invalid operator";
//   }
// }

// console.log(result);

// ============================ while ============================

// let exit = false;
// let round = 1;
// while (!exit) {
//   let command = prompt();
//   exit = command === "exit";
//   //   if (!exit) {
//   //     console.log(round);
//   //     round++;
//   //   }
//   //   if (exit) break;
//   if (exit || command === "a") continue;
//   console.log(round);
//   //   let oldValue = round++;
//   //   let currentValue = ++round;
//   round++;
// }

// ============================ for ============================
// for (start; stop; step)

// iterator
// increament
// for (let i = 0; i < 5; i++) {
//   console.log("The number is " + i);
// }
// iterator =        0 1 2 3 4 5
// scope execution = 1 2 3 4 5 -

// decreament
// for (let i = 3; i >= 0; i--) {
//   console.log("The number is " + i);
// }
// iterator =        3 2 1 0
// scope execution = 1 2 3 4

// ---------- IsPrime solution ----------
// let number = Number(prompt("Enter your number:"));

// let isPrime = true;
// for (let i = 2; i < number; i++) {
//   if (number % i === 0) {
//     isPrime = false;
//     break;
//   }
// }

// bad idea - just continue example
// for (let i = 1; i <= number; i++) {
//   if (i === 1 || i === number) {
//     continue;
//   }
//   if (number % i === 0) {
//     isPrime = false;
//     break;
//   }
// }

// console.log(isPrime ? "Prime" : "Not prime");

// if (isPrime) {
//   console.log("prime");
// } else {
//   console.log("not prime");
// }

// ---------- for / while comparision ----------

// let i = 1; //expression 1
// //expression 2
// for (; i <= 10; ) {
//   console.log(i);
//   i++; //expression 3
// }

// let i2 = 1; //expression 1
// //expression 2
// while (i2 <= 10) {
//   console.log(i2);
//   i2++; //expression 3
// }
