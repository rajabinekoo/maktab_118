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

let exit = false;
let round = 1;
while (!exit) {
  let command = prompt();
  exit = command === "exit";
  //   if (!exit) {
  //     console.log(round);
  //     round++;
  //   }
  //   if (exit) break;
  if (exit || command === "a") continue;
  console.log(round);
  //   let oldValue = round++;
  //   let currentValue = ++round;
  round++;
}
