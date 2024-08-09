// ========== data set solution ==========
// window.onClickCard = (e) => {
//   console.log(e.target.dataset.name);
// }

// export function CardGenerator({ name }) {
//   return `<button onclick="onClickCard(event)">${name}</button>`;
// }

// ========== data binding solution ==========
// window.onClickCard = (e) => {
//   console.log(e);
// };

// export function CardGenerator({ name }) {
//   return `<button onclick="onClickCard('${name}')">${name}</button>`;
// }

// ========== add event listener solution ==========

let lastSelectedCardElement = undefined;
let lastSelectedCard = "";
let passedCards = {};
let score = 20;
let avoid = false;

// recursive
// function getMainParent(element) {
//   if (element.className.split(" ").includes("flip-card")) {
//     return element;
//   }
//   return getMainParent(element.parentElement);
// }

// white
function getMainParent(element) {
  let flipCard = null;
  let targetElement = element;
  while (!flipCard) {
    if (targetElement.className.split(" ").includes("flip-card")) {
      flipCard = targetElement;
    } else {
      targetElement = targetElement.parentElement;
    }
  }
  return flipCard;
}

const onClickCard = (e) => {
  const mainDiv = getMainParent(e.target);
  const name = mainDiv.dataset.name;

  if (passedCards[name] || avoid) return;

  mainDiv.classList.add("active");

  if (!Boolean(lastSelectedCard)) {
    lastSelectedCard = name;
    lastSelectedCardElement = mainDiv;
    console.log("set shod");
  } else if (lastSelectedCard === name) {
    console.log("affffarinnnnn che kardiiiiii");
    passedCards[name] = true;
    lastSelectedCard = "";
    lastSelectedCardElement = undefined;
  } else {
    if (score > 0) score--;
    console.log("dobare emtahan kon");
    avoid = true;
    setTimeout(() => {
      mainDiv.classList.remove("active");
      lastSelectedCardElement.classList.remove("active");
      lastSelectedCard = "";
      lastSelectedCardElement = undefined;
      avoid = false;
    }, 1000);
  }

  console.log(passedCards);
  if (Object.keys(passedCards).length === 6) {
    alert("Emtiaze shoma", score);
  }
};

export function CardGenerator({ name, image }) {
  return `<div data-name="${name}" class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <img src="/js.svg" alt="Avatar" style="width: 300px; height: 300px" />
      </div>
      <div class="flip-card-back">
        <img
          src="${image}"
          alt="Avatar"
          style="width: 300px; height: 300px"
        />
      </div>
    </div>
  </div>`;
}

export function initListenersOnCards() {
  const cardsList = document.querySelectorAll(".flip-card");
  for (const card of cardsList) {
    card.addEventListener("click", onClickCard);
  }
}
