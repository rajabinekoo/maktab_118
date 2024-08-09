import "./style.css";
import { CardGenerator, initListenersOnCards } from "./entities/card";

const app = document.getElementById("app");

const cardObjects = [
  { name: "angular", image: "angular.svg" },
  { name: "angular", image: "angular.svg" },
  { name: "aurelia", image: "aurelia.svg" },
  { name: "aurelia", image: "aurelia.svg" },
  { name: "backbone", image: "backbone.svg" },
  { name: "backbone", image: "backbone.svg" },
  { name: "ember", image: "ember.svg" },
  { name: "ember", image: "ember.svg" },
  { name: "react", image: "react.svg" },
  { name: "react", image: "react.svg" },
  { name: "vue", image: "vue.svg" },
  { name: "vue", image: "vue.svg" },
];

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    const swapValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = swapValue;
  }
}

function render() {
  let html = "";
  for (const card of cardObjects) {
    // concat html strings
    html += CardGenerator(card);
  }
  app.innerHTML = html;
  initListenersOnCards()
}

shuffle(cardObjects);
render();
