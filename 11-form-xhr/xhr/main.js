// ===================== JSON FUNCTIONS =====================

// const responseBody = `{"page":1,"per_page":6,"total":12,"total_pages":2,"data":[{"id":1,"email":"george.bluth@reqres.in","first_name":"George","last_name":"Bluth","avatar":"https://reqres.in/img/faces/1-image.jpg"},{"id":2,"email":"janet.weaver@reqres.in","first_name":"Janet","last_name":"Weaver","avatar":"https://reqres.in/img/faces/2-image.jpg"},{"id":3,"email":"emma.wong@reqres.in","first_name":"Emma","last_name":"Wong","avatar":"https://reqres.in/img/faces/3-image.jpg"},{"id":4,"email":"eve.holt@reqres.in","first_name":"Eve","last_name":"Holt","avatar":"https://reqres.in/img/faces/4-image.jpg"},{"id":5,"email":"charles.morris@reqres.in","first_name":"Charles","last_name":"Morris","avatar":"https://reqres.in/img/faces/5-image.jpg"},{"id":6,"email":"tracey.ramos@reqres.in","first_name":"Tracey","last_name":"Ramos","avatar":"https://reqres.in/img/faces/6-image.jpg"}],"support":{"url":"https://reqres.in/#support-heading","text":"To keep ReqRes free, contributions towards server costs are appreciated!"}}`;
// console.log(responseBody);
// const data = JSON.parse(responseBody);
// console.log(data.data);

// const person1 = { name: "Ali" };
// console.log(person1);
// const person1Json = JSON.stringify(person1);
// console.log(person1Json);

// ===================== Constructor =====================

// // factory function
// function Book1(name, isbn) {
//   return { name, isbn };
// }
// console.log(Book1("Skin in the game", 123123));

// // constructor function
// function Book2(_name, _isbn) {
//   this.name = _name;
//   this.isbn = _isbn;
// }
// console.log(new Book2("Antifragile", 321321));

// ===================== XHR =====================

const root = document.getElementById("root");

function Card({ first_name, last_name, email, avatar }) {
  return `<div class="card">
    <p>${first_name} ${last_name}</p>
    <p>${email}</p>
    <img
      alt="User Avatar"
      src="${avatar}"
    />
  </div>`;
}

function render(usersList) {
  let html = "";
  for (const user of usersList) {
    html += Card(user);
  }
  root.innerHTML = html;
}

const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    const responseBody = JSON.parse(this.responseText);
    render(responseBody.data);

    // ======== deconstruction, destruction: start ========
    // const user1 = responseBody.data[0];
    // console.log(user1);
    // const {first_name: firstName, last_name: lastName} = user1;
    // console.log(firstName, lastName);
    // ======== deconstruction, destruction: end ========
  } else if (this.readyState === 4) {
    console.log("Something went wrong");
  }
};
xhttp.open("GET", "https://reqres.in/api/users", true);
xhttp.send();
