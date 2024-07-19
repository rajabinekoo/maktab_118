// event handler
function onSubmit() {
  let inputsDiv = document.getElementById("inputs-div");
  let valuesObject = {};
  for (const input of inputsDiv.children) {
    valuesObject[input.name] = input.value;
  }
  console.log(valuesObject);
}

let button = document.getElementById("submit-btn");
// button.onclick = function (event) {
//   onSubmit(event, 1);
// };

button.addEventListener("click", onSubmit);

// let a = { onclick: function () {} };
// a.onclick = onscroll

setTimeout(() => {
  console.log("ok2");
}, 3000);

// ==================== callback ====================

// function formExtractor(inputsParentId, cb) {
//   let inputsDiv = document.getElementById(inputsParentId);
//   let valuesObject = {};
//   for (const input of inputsDiv.children) {
//     valuesObject[input.name] = input.value;
//   }
//   cb(valuesObject);
// }

// let firstName = prompt("Enter first name");
// let lastName = prompt("Enter last name");

// function licenseGenerator(firstName, lastName, cb) {
//   if (
//     !firstName.length ||
//     !lastName.length ||
//     typeof firstName !== "string" ||
//     typeof lastName !== "string"
//   ) {
//     return null;
//   }
//   let result = cb(`${firstName} - ${lastName}`);
//   console.log(`Message: ${result}`);
// }

// licenseGenerator(firstName, lastName, (fullName) => {
//   return `Hi ${fullName}, Your license will expire at ${new Date()}`;
// });

// licenseGenerator(firstName, lastName, (fullName) => {
//   return `Salam ${fullName}, License shoma dar tarikhe zekr shode gheyre faal mishavad ${new Date()}`;
// });
