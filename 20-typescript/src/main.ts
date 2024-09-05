console.log("Hello TS");

// Variable declaration syntax
// let varName: type = value;

// TS data types:
// any -> bad idea
// number
// string
// boolean
// combinational
// conceptual

let num1: number = 1;
let msg: string = "TS course";
let isHappy: boolean = true;
let numbers1: number[] = [1, 2];
let numbers2: Array<numericString> = [1, 2, "3"];

// union
let numericString: number | string;
numericString = 2;
numericString = "2";

// complex string template
type numericString = number | `${number}`;
let numericString2: numericString = "3";
let hash: `0x${string}` = "0x6367c48dd193d56ea7b0baad25b19455e529f5ee";
let email: `${string}@gmail.com` = "ali.rajabinekoo@gmail.com";

// object
let vehicle1: vehicle = {
  color: "red",
  wheelsCount: 4,
};
let vehicle2: vehicle = {
  color: "green",
  wheelsCount: 4,
};
let vehicle3 = {
  color: "black",
  wheelsCount: 2,
} as vehicle;
let vehicle4 = <vehicle>{
  color: "blue",
  wheelsCount: 2,
};

let user1: user = {
  id: 10,
  firstName: "Ali",
  lastName: "Rajabi",
  username: "rajabinekoo",
};

// ===================================================
// couting dict -> solution pattern

let wordsCount: countingObject = { a: 1 };
let text = "File change detected. Starting incremental compilation";

for (const character of text) {
  const char = character.toLowerCase();
  if (!!wordsCount[char]) {
    wordsCount[char] += 1;
  } else {
    wordsCount[char] = 1;
  }
}

console.log(wordsCount);
// ===================================================

const persons2: person[] = [
  { id: 1, firstName: "a", lastName: "a", avatar: ":)" },
  { id: 2, firstName: "c", lastName: "c", avatar: ":(" },
  { id: 3, firstName: "b", lastName: "b", avatar: ":|" },
];

const users2: pureUser[] = [
  { id: 1, username: "c" },
  { id: 2, username: "b" },
  { id: 3, username: "a" },
];

// best solution
function userMerging(
  users: pureUser[],
  persons: person[]
): Array<pureUser & person> {
  const mergedArray: Array<pureUser & person> = [];
  const usersCounting: usersCounting = {};
  for (const u of users) {
    usersCounting[u.id] = u;
  }
  for (const p of persons) {
    const targetUser = usersCounting[p.id];
    if (!targetUser) continue;
    mergedArray.push({
      ...p,
      ...targetUser,
    });
  }
  return mergedArray;
}

const userMerging2 = (
  users: pureUser[],
  persons: person[]
): Array<pureUser & person> => {
  const mergedArray: Array<pureUser & person> = [];
  const usersCounting: usersCounting = {};
  for (const u of users) {
    usersCounting[u.id] = u;
  }
  for (const p of persons) {
    const targetUser = usersCounting[p.id];
    if (!targetUser) continue;
    mergedArray.push({
      ...p,
      ...targetUser,
    });
  }
  return mergedArray;
};

type userMerging3Type = (
  _1: pureUser[],
  _2: person[]
  // _3?: (_: Array<pureUser & person>) => void
) => Array<pureUser & person>;
const userMerging3: userMerging3Type = (users, persons) => {
  const mergedArray: Array<pureUser & person> = [];
  const usersCounting: usersCounting = {};
  for (const u of users) {
    usersCounting[u.id] = u;
  }
  for (const p of persons) {
    const targetUser = usersCounting[p.id];
    if (!targetUser) continue;
    mergedArray.push({
      ...p,
      ...targetUser,
    });
  }
  return mergedArray;
};

console.log(userMerging3(users2, persons2));

// last solution
// for (const p of persons) {
//   const targetUser = users.find((el) => el.id === p.id);
//   if (!targetUser) continue;
//   mergedArray.push({
//     ...p,
//     ...targetUser,
//   });
// }
