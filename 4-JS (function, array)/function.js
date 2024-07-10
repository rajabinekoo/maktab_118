// function funcName(parameter1, parameter2, ...parameters) {}
// let funcName = function (parameter1, parameter2, ...parameters) {};
// arrow function
// let funcName = (parameter1, parameter2, ...parameters) => {}

// ================= basic usage ====================

// 1. reusability
// 2. paradigm
// 3. jump
// 4. temp variables => garbage collector
// 5. control flow

// // declare
// // funcName (parameters or arguments)
// "bad", "ugly"
// function showMessage(message, repeat = 1) {
//   // exeption
//   if (message === "bad" || message === "ugly") {
//     // console.log("Invalid message");
//     return;
//   }

//   //   repeat = repeat || 1;
//   //   repeat = Boolean(repeat) ? repeat : 1;
//   for (let i = 1; i <= repeat; i++) {
//     console.log(message);
//   }
// }

// // invoke
// showMessage("bad");
// showMessage("salam");
// showMessage("ugly");
// console.log("end");

// ================= func scope ====================
// function greeting(firstName) {
//   showMessage(`Welcome ${firstName}`);
// }

// console.log(message);
// greeting("Ali");
// console.log(message);

// ================= return ====================

// function sum(num1, num2) {
//   return num1 + num2;
//   // return value
//   // return(num1 + num2);
// }

// let s = sum(2, 2);
// let s = 4;
// console.log(s);

// function isPrimeBad(number) {
//   let prime = true;
//   for (let i = 2; i < number; i++) {
//     if (number % i === 0) {
//       prime = false;
//       break;
//     }
//   }
//   return prime;
// }

// let n = Number(prompt("Enter n"));
// function isPrime(number) {
//   for (let i = 2; i < number; i++) {
//     if (number % i === 0) return false;
//   }
//   return true;
// }
// for (let i = 2; i <= n; i++) {
//   if (isPrime(i)) console.log(i);
// }

// let a = isPrime(13);
// console.log(a);
