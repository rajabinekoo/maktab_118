// ================== async/await ==================

let errorMessages = {
  404: "Not Found",
};

function AppError(status) {
  this.status = status;
  this.message = errorMessages[Number(status)];
}

async function getUsers() {
  // async -> non-blocking
  //   fetch("https://reqres.in/api/users?page=1", { method: "GET" })
  //     .then((response) => {
  //       return response.json(); // trick
  //     })
  //     .then((result) => {
  //       users = [...result.data];
  //       return fetch("https://reqres.in/api/users?page=2", { method: "GET" }); // trick
  //     })
  //     .then((response) => {
  //       return response.json(); // trick
  //     })
  //     .then((result) => {
  //       users = [...users, ...result.data];
  //       console.log(users);
  //     })
  //     .catch((error) => {
  //       console.log("error", error);
  //     });

  let response1 = await fetch("https://reqres.in/api/users?page=1", {
    method: "GET",
  });
  if (response1.status !== 200) {
    throw new AppError(response1.status);
  }
  let result1 = await response1.json();
  let response2 = await fetch("https://reqres.in/api/users?page=2", {
    method: "GET",
  });
  if (response2.status !== 200) {
    throw new AppError(response2.status);
  }
  let result2 = await response2.json();
  return [...result1.data, ...result2.data];
}

// pure filter
// function filter(data, cb) {
//   let newData = [];
//   for (const element of data) {
//     if (cb(element)) {
//       newData.push(element);
//     }
//   }
//   return newData;
// }

function filterByA(users) {
  return users.filter(
    (el) => el.first_name.includes("a") || el.last_name.includes("a")
  );
}

// getUsers()
//   .then((result) => console.log(filterByA(result)))
//   .catch((reason) => console.log(reason)); // exception handling

// ================== try/catch/throw/finally ==================

// let input = prompt();
// try {
//   // throw error
//   let result = JSON.parse(input);
//   if (Array.isArray(result)) {
//     throw new Error("Man array ghabul nemikonama! :D");
//   }
//   console.log(result);
// } catch (e) {
//   console.log("Something went wrong", e.message, e.name);
// } finally {
//   console.log("Finished");
// }

// ================== combination ==================

// async function main() {
//   try {
//     let users = await getUsers();
//     console.log(users);
//   } catch (error) {
//     if (error instanceof AppError) {
//       alert(`HTTP ERROR: ${error.message}`);
//     }
//   }
// }

// main();

// ================== Promise methods ==================

// async function fetchUserById(id, signal) {
//   let response = await fetch(
//     `https://reqres.in/api/users/${id}`,
//     {
//       method: "GET",
//       signal,
//     },
//     {}
//   );
//   if (response.status !== 200) {
//     throw new AppError(response.status);
//   }
//   return response.json();
// }

// async function main() {
//   try {
//     let users = [];
//     let signals = [];
//     for (let index = 1; index <= 13; index++) {
//       let controller = new AbortController();
//       users.push(fetchUserById(index, controller.signal));
//       signals.push(controller);
//       // await fetchUserById(index);
//     }
//     // let results = await Promise.all(users);
//     // let results = await Promise.allSettled(users);
//     let results = await Promise.race(users);
//     for (const s of signals) {
//       s.abort();
//     }
//     console.log(results);
//   } catch (error) {
//     console.log(error);
//   }
// }

// main();

// ================== .map(), .filter(), .reduce() ==================

let array = [1, 2, 3, 4, 5];
console.log(array.map((el) => el * 2).filter((el) => el % 4 === 0));

async function main() {
  try {
    let users = await getUsers();
    // map usecases
    users = users.map((el) => {
      return { ...el, price: Math.floor(Math.random() * 10) };
    });
    users = users.map((el) => {
      if (el.id === 2) {
        return { ...el, first_name: "Ali" };
      }
      return el;
    });
    let cards = users.map((el) => `<p>${el.first_name}</p>`);
    document.body.innerHTML = cards.join("");
    // reduce usecases
    let priceSum = users.reduce((prev, current) => {
      return prev + current.price;
    }, 0);
    console.log(users.map((el) => el.price));
    console.log(priceSum);
  } catch (error) {}
}

main();
