const users = [];

function removeUser(id) {
  const index = users.findIndex((el) => el.uid === Number(id));
  users.splice(index, 1);
  render();
}

// solution 1
//   function userRowGenerator(user) {
//   const tableBody = document.getElementById("table-body");
//   const tr = document.createElement("tr");
//   const firstName = document.createElement("td");
//   const lastName = document.createElement("td");
//   const city = document.createElement("td");
//   const position = document.createElement("td");

//   firstName.innerText = user.firstName;
//   lastName.innerText = user.lastName;
//   city.innerText = user.city;
//   position.innerText = user.position;

//   tr.appendChild(firstName);
//   tr.appendChild(lastName);
//   tr.appendChild(city);
//   tr.appendChild(position);

//   tableBody.append(tr);
// }

// solution 2
function userRowGenerator2(user) {
  return `<tr class="${user.uid === 1 ? "testtest" : "test"}">
    <td>${user.firstName}</td>
    <td>${user.lastName}</td>
    <td>${user.city}</td>
    <td>${user.position}</td>
    <td><button onclick="removeUser('${user.uid}')">Delete</button></td>
  </tr>`;
}

function render() {
  // solution 1
  //   for (const user of users) {
  //     userRowGenerator(user);
  //   }

  // solution 2
  let html = "";
  for (const user of users) {
    html += userRowGenerator2(user);
  }
  document.getElementById("table-body").innerHTML = html;
}

// function customFind(cb) {
//   for (const el of additionalPersonData) {
//     let result = cb(el);
//     if (result === true) return el;
//   }
// }

function initialization() {
  for (const pdata of personData) {
    const apdata = additionalPersonData.find((el) => el.uid === pdata.uid);
    users.push({ ...pdata, ...apdata });
  }
  render();

  //   test
  //   document.getElementById("aaa").innerHTML = "<p>hello</p>";
  //   document.getElementById("aaa").innerHTML = "<p>bye</p>";
}

document.addEventListener("DOMContentLoaded", initialization);
