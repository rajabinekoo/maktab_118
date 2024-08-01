function onKeyUp(event) {
  console.log("keyup", event.target.value);
}

function checkAge(key) {
  return Number(key) > 0 && Number(key) < 9;
}

document.getElementById("username-inp").addEventListener("keyup", onKeyUp);

function onKeyDown(event) {
  console.log("keydown", event.target.value);
}

document.getElementById("username-inp").addEventListener("keydown", onKeyDown);

function onKeyPress(event) {
  console.log("keypress", event.target.value);
}

document
  .getElementById("username-inp")
  .addEventListener("keypress", onKeyPress);

function onChange(event) {
  console.log("change", event.target.value);
}

document.getElementById("username-inp").addEventListener("change", onChange);

function onBlur() {
  console.log("blur");
}

document.getElementById("username-inp").addEventListener("blur", onBlur);

function onFocus() {
  console.log("focus");
}

document.getElementById("username-inp").addEventListener("focus", onFocus);

function onDblCick() {
  console.log("dblCick");
}

document.getElementById("click-me-btn").addEventListener("dblclick", onDblCick);

const box = document.getElementById("box");
box.addEventListener("mouseenter", () => {
  console.log("mouse enter");
  box.style.backgroundColor = "red";
});
box.addEventListener("mouseleave", () => {
  console.log("mouse leave");
  box.style.backgroundColor = "black";
});
box.addEventListener("mouseover", () => {
  console.log("mouse over");
});
box.addEventListener("mouseout", () => {
  console.log("mouse out");
});

// click up
box.addEventListener("mouseup", () => {
  console.log("mouse up");
});
// click down
box.addEventListener("mousedown", () => {
  console.log("mouse down");
});
