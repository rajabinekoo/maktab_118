// ========== data set solution ==========
// window.onClickCard = (e) => {
//   console.log(e.target.dataset.name);
// }

// export function CardGenerator({ name }) {
//   return `<button data-name="${name}" onclick="onClickCard(event)">${name}</button>`;
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

// while
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

  if (!Boolean(lastSelectedCardElement)) {
    lastSelectedCardElement = mainDiv;
  } else if (lastSelectedCardElement?.dataset?.name === name) {
    passedCards[name] = true;
    lastSelectedCardElement = undefined;
  } else {
    if (score > 0) score--;
    avoid = true;
    setTimeout(() => {
      mainDiv.classList.remove("active");
      lastSelectedCardElement.classList.remove("active");
      lastSelectedCardElement = undefined;
      avoid = false;
    }, 1000);
  }

  if (Object.keys(passedCards).length === 6) {
    console.log(`Emtiaze shoma: ${score}`);
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
