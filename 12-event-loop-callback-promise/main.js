// ============== scheduling ==============

// function greeting2() {
//   console.log("hello");
// }

// function greeting() {
//   console.log("salam");
//   greeting2();
// }

// setTimeout(() => {
//   console.log("ok1");
// }, 2000);

// let timeoutId = setTimeout(() => {
//   console.log("ok2");
// }, 2000);
// // clearTimeout(timeoutId);

// let repeat = 3;
// let intervalId = setInterval(() => {
//   console.log("1 second past");
//   repeat--;
//   if (repeat === 0) {
//     clearInterval(intervalId);
//   }
// }, 1000);

// greeting();

// ============== callback hell ==============

// setTimeout(() => {
//   console.log("ok1");
//   setTimeout(() => {
//     console.log("ok2");
//     setTimeout(() => {
//       console.log("ok3");
//       setTimeout(() => {
//         console.log("ok4");
//         setTimeout(() => {
//           console.log("ok5");
//         }, 2000);
//       }, 2000);
//     }, 2000);
//   }, 2000);
// }, 2000);

// --- xhr example

// function fetchUsers(page = 1, cb) {
//   const xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function () {
//     if (this.readyState === 4 && this.status === 200) {
//       const responseBody = JSON.parse(this.responseText);
//       cb(responseBody.data);
//     } else if (this.readyState === 4) {
//       cb([]);
//     }
//   };
//   xhttp.open("GET", `https://reqres.in/api/users?page=${page}`, true);
//   xhttp.send();
// }

// fetchUsers(1, (list) => {
//   console.log(list);
//   fetchUsers(2, (list2) => {
//     console.log(list2);
//     fetchUsers(3, (list2) => {
//       console.log(list2);
//       fetchUsers(4, (list2) => {
//         console.log(list2);
//         fetchUsers(5, (list2) => {
//           console.log(list2);
//         });
//       });
//     });
//   });
// });

// ============== promise (then method chaining) ==============

// let users = [];
// fetch("https://reqres.in/api/users?page=1", { method: "GET" })
//   .then((response) => {
//     return response.json(); // trick
//   })
//   .then((result) => {
//     users = [...result.data];
//     return fetch("https://reqres.in/api/users?page=2", { method: "GET" }); // trick
//   })
//   .then((response) => {
//     return response.json(); // trick
//   })
//   .then((result) => {
//     users = [...users, ...result.data];
//     console.log(users);
//   })
//   .catch((error) => {
//     console.log("error", error);
//   });

// ============== promisify ==============
// deal: new Promise((resolve, reject) => {})

function fetchUsers2(page = 1) {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const responseBody = JSON.parse(this.responseText);
        resolve(responseBody.data);
      } else if (this.readyState === 4) {
        reject("Something went wrong");
      }
    };
    xhttp.open("GET", `https://reqres.in/api/users?page=${page}`, true);
    xhttp.send();
  });
}

let users2 = [];
fetchUsers2(1)
  .then((result) => {
    users2.push(...result);
    return fetchUsers2(2);
  })
  .then((result) => {
    users2.push(...result);
    console.log(users2);
  })
  .catch((error) => console.log("error", error));
