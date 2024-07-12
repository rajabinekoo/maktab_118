// ==================== everything is object ====================
// let firstName = "ali";
// console.log(firstName.toUpperCase());
// let lastName = "rajabi";
// console.log(lastName);

// ==================== factory function - for same schema ====================
// Uses for instance
function User(firstName, lastName, age) {
  return {
    name: {
      firstName: firstName,
      lastName: lastName,
    },
    age: age,
    // method
    greeting: function (message = "Hello") {
      console.log(message, this.name.firstName, this.name.lastName);
    },
  };
}

// ==================== declaration ====================
// instance
let user = User("John", "Doe", 30);
let user2 = User("John2", "Doe2", 40);
// user.greeting();
// user2.greeting();

// ==================== access ====================
// console.log(user["age"]);
// console.log(user.age);
// console.log(user.name.firstName);
// console.log(user.name.lastName);
// console.log(user["name"]["firstName"]);
// console.log(user["name"]["lastName"]);

// ==================== insert, add ====================
user.email = "example@domain.com";
// user["email"] = "";
// console.log(user.email);

// object keys format
// user["pass word"] = "123";
// user["password"] = "1234";
// user[0] = 1;
// console.log(user[0]);
// console.log(user["pass word"]);
// console.log(user.password);

// ==================== delete ====================
delete user.email;
delete user["email"];
// console.log(user);

// ==================== update -> same as insert ====================
// exist -> update
// not exist -> add

user.age = 40;
// console.log(user);

// ==================== object loop, for in ====================

// let keys = Object.keys(user2);
// console.log(keys);
// for (let index = 0; index < keys.length; index++) {
//   let key = keys[index];
//   console.log(key, user2[key]);
// }

// console.log(Object.values(user2));
// console.log(Object.entries(user2));

// for (let key in user2) {
//   console.log(key, user2[key]);
// }

// ==================== call by reference ====================
// let human = { name: "Ali" };
// let admin = human;

// admin.name = "Ahamd";
// console.log(admin, human);

// ==================== clone or copy ====================
// let admin2 = structuredClone(human);
// admin2.name = "Mobin";
// console.log(admin, human, admin2);

// let admin3 = { ...admin };
// admin3.name = "Zahra";
// console.log(admin, admin3);

// ==================== array loop, for of ====================
// let people = ["zahra", "mobin", "golshid", "sajjad", "mohammad"];
// for (let element of people) {
//   console.log(element);
// }
// for (let key in people) {
//   console.log(key, people[key]);
// }

// ==================== character counter ====================
let message = "Hello Maktab React 118".toLowerCase();
let counter = {};

for (const letter of message) {
  if (Boolean(counter[letter])) {
    counter[letter] += 1;
  } else {
    counter[letter] = 1;
  }
}

console.log(counter);
