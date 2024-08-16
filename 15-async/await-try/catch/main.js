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

  let response1 = await fetch("https://reqres.in/api3/users?page=1", {
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

async function fetchUserById(id) {
  let response = await fetch(`https://reqres.in/api/users/${id}`, {
    method: "GET",
  });
  return response.json();
}

async function main() {
  try {
    let users = [];
    for (let index = 1; index <= 12; index++) {
        users.push(fetchUserById(index));
    //   await fetchUserById(index);
    }
    let results = await Promise.all(users);
    console.log(results);
  } catch (error) {
    console.log(error);
  }
}

main();
