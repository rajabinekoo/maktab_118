// ============= selectors =============

// let pageTitle = document.getElementById("page-title");
// console.log(pageTitle.id);
// console.log(pageTitle.innerText);
// console.log(pageTitle.innerHTML);
// console.log(pageTitle.classList, pageTitle.className);
// console.log(pageTitle.outerHTML);
// console.log(pageTitle.parentElement.outerText);
// console.log(pageTitle.parentElement.outerHTML);
// console.log(pageTitle.children);

// console.log(document.getElementsByName("input-name"));
// console.log(document.getElementsByTagName("div"));
// console.log(document.getElementsByClassName("colorized-box"));

// console.log(document.querySelector("div.gray-boxes-parent > div.gray-box"));
// console.log(document.querySelectorAll("div.gray-boxes-parent > div.gray-box"));

// ============= element creation =============

let root = document.getElementById("root");
let blackBox = document.createElement("div");
let redBox = document.createElement("div");

blackBox.className = "black-box";
redBox.classList.add("red-box");

root.append(blackBox);
blackBox.append(redBox);
