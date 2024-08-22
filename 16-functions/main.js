// =============================== function - hoisting, rest operator, validation, sanitization ===============================

// invoke, call, fire
// console.log(max(1, "3", "a", "b", 2));

// hoisting
// rest -> functions parameters
function max(...numbers) {
  // sanitization and validation
  const filteredNumbers = numbers.map(Number).filter((el) => !isNaN(el));
  if (!filteredNumbers.length) {
    throw new Error("Invalid parameters");
  }

  let maxNum = -Infinity;
  filteredNumbers.forEach((num) => {
    if (num <= maxNum) return; // validation
    maxNum = num;
  });
  return maxNum;
}

// console.log(min(1, 2, 3)); // -> Uncaught ReferenceError: Cannot access 'min' before initialization
// non-hoisting function + arrow function
const min = function (...numbers) {
  let minNum = Infinity;
  numbers.forEach((num) => {
    if (num >= minNum) return; // validation
    minNum = num;
  });
  return minNum;
};

// =============================== var & const ===============================

// *********
// const
// *********
const name = "Ali";
// const a; // initialization error
// name = "test"; // assignment error

// refrence types constants
const numbers = [];
numbers.push(1, 2, 3);
// console.log(numbers);
// numbers = [3, 2]; // assignment error

const person1 = {};
person1.firstName = "Ali";
person1["position"] = "Full-stack web3 engineer";
// console.log(person1);
// person1 = { firstName: "Hassan" }; // assignment error

// *********
// var
// *********

var a = 2;
setTimeout(() => {
  //   console.log(a);
}, 2000);

// non-function scope hosting of var declaration
if (true) {
  var a = 5;
  var b = 6;
  //   console.log("inside a:", a);
}

function f() {
  var a = 7;
  //   console.log("function scope a:", a);
}
f();

// console.log(a, b);

// =============================== callback ===============================

// const operator = prompt("Operator:");

// operatorCallback as polymorphism // chand shekli ya chand rikhti
function calc(operatorCallback) {
  const num1 = Number(prompt("num1:"));
  const num2 = Number(prompt("num2:"));
  console.log(operatorCallback(num1, num2));
}

function plus(num1, num2) {
  return num1 + num2;
}

function minus(num1, num2) {
  return num1 - num2;
}

function product(num1, num2) {
  return num1 * num2;
}

function division(num1, num2) {
  return num1 / num2;
}

// switch (operator) {
//   case "+":
//     calc(plus);
//     break;
//   case "-":
//     calc(minus);
//     break;
//   case "*":
//     calc(product);
//     break;
//   case "/":
//     calc(division);
//     break;
//   default:
//     console.log("Invalid operator");
//     break;
// }

// =============================== Self involing functions, IIFE ===============================

// let a = function() {}
// a();

(function () {
  console.log("Salam");
})();

(function (name) {
  console.log("Greeting", name);
})("Ali");

// bootstrap example for IIFE usage
async function fetchUsers() {}
async function renderPage() {}
async function addListeners() {}

// (async () => {
//   try {
//     await fetchUsers();
//     await renderPage();
//     await addListeners();
//   } catch (error) {
//     console.error(error);
//   }
// })();

// =============================== Closure ==============================

// syntax
// innerFunction enclosed by outerFunction
// feature: Memoization
// function outerFunction(name) {
//   function innerFunction() {
//     // console.log("hello closure");
//     console.log("Greeting", name);
//   }
//   return innerFunction;
//   // return () => {}
//   // return function () {};
// }
// const innerFunction = outerFunction("Ali");
// innerFunction();

// validation generator example for closure usage
function validationGenerator(type) {
  if (type === "number") {
    return function (value) {
      return !isNaN(Number(value));
    };
  }
  if (type === "person") {
    return function (value) {
      return !!value?.firstName && !!value?.lastName;
    };
  }
  if (type === "car") {
    return function (value) {
      return !!value?.name && !!value?.model && !!value?.color;
    };
  }
}

const personValidator = validationGenerator("person");
const isValid = personValidator({
  firstName: "ali",
  lastName: "rajabi",
});
console.log(isValid);

// =============================== Call, Apply, Bind methods ==============================

// function constructor
// const a2 = new Function('name', "console.log(name)")
// a2("ali")

function sum(...numbers) {
  return numbers.reduce((prev, current) => prev + current, this.initialState);
}

const obj1 = {
  test: "test",
  initialState: 0,
  sum,
};

const obj2 = {
  test: "test2",
  sum,
};

// const sum2 = sum.bind({}, 3, 4);
// console.log(sum2());

const array = [3, 4, 2, 1];
// console.log(sum.apply({}, array));
console.log(obj1.sum(...array));
console.log(obj2.sum.apply({ ...obj2, initialState: 2 }, array));
console.log(obj2.sum.call({ ...obj2, initialState: 2 }, 1, 2, 3));
console.log(obj2);

// const array2 = [].push(...array);