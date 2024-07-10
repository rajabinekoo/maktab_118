// // array data structure definition

// // declaration
// let numbers = [1, 2, 3, 4];
// let letters = ["a", "b", "c"];
// let shuffle = [true, null, undefined, 5, false, "happy", "ali", [1, 2]];

// // access
// console.log(numbers[0]);
// console.log(letters[1]);
// console.log(shuffle[2]);

// // update
// numbers[0] = 5;
// console.log(numbers);

// // deletion
// delete numbers[0];
// numbers[0] = undefined;
// console.log(numbers);

// ==================== stack algorithm ========================
// // const === immutable value
// const odd = [1, 3, 5];
// odd.push(7, 9, 11);

// // length of array
// console.log("length", odd.length);

// // pop method
// let lastValue = odd.pop();
// console.log(lastValue, odd);

// // very slow shift and unshift (meaning shift to left)

// odd.unshift(-1);
// console.log(odd, odd.length);
// let firstValue = odd.shift();
// console.log(firstValue, odd);

// ==================== call by refrence ========================
// array is an iterable object
// let numbers2 = [1, 2, 3, 4, 5];
// let numbers3 = numbers2;

// console.log(numbers2, numbers3);
// numbers2[0] = 8;
// numbers3[1] = 9;
// console.log(numbers2, numbers3);
// console.log(numbers2 === numbers3);

// // let numbers41 = numbers2.concat([]); // => copy/clone
// // let numbers4 = [...numbers2] // => copy/clone
// let numbers4 = [];
// for (let index = 0; index < numbers2.length; index++) {
//   //   console.log(index, numbers2[index]);
//   numbers4.push(numbers2[index]);
// }
// console.log(numbers4);
// console.log(numbers4 === numbers2);
// console.log(numbers4.toString());
// console.log(numbers4.toString() === numbers2.toString());
// numbers4[0] = 1;
// numbers4[1] = 2;
// console.log(numbers4, numbers2);
// console.log(numbers4 === numbers2);
// console.log(numbers4.toString() === numbers2.toString());

// console.log("includes", numbers2.includes(8));
// console.log("indexOf", numbers2.indexOf(42));
// console.log(numbers2.concat([1, 2]));

// ==================== splice ====================

// let numbers22 = [1, 2, 3, 4, 5];
// copy and remove
// let numbers23 = numbers22.concat([]);
// numbers23.splice(2, 1);
// numbers23.splice(2, 0, 6, 7, 8);
// numbers23.splice(2, 1, 6, 7);
// console.log(numbers22, numbers23);

// ==================== string as an iterable object ========================

// let message = "Maktab React 118";
// let reverse = "";
// for (let i = 0; i < message.length; i++) {
//   console.log(i, message[i]);
//   reverse = message[i] + reverse;
// }
// console.log(reverse);

// ==================== strings methods and chainig methods ====================
let message2 = "Maktab React 118";
let message3 = message2.replace("React", "Javascript");
console.log(message3, message3.includes("React"));
let reversedMessage = message3.split("").reverse().join("").toLowerCase();
console.log(reversedMessage);
