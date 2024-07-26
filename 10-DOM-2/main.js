const user1 = prompt("Enter first user name");
const user2 = prompt("Enter second user name");
const container = document.querySelector(".container");

const user1States = [];
const user2States = [];
const userSymbol = ["X", "O"];
let turn = 0;
let stopped = false;

function checkWinner(states) {
  if (states.length < 3) return false;

  const rowsCount = {};
  const columnsCount = {};
  for (const s of states) {
    if (!rowsCount[s.x]) {
      rowsCount[s.x] = 1;
    } else {
      rowsCount[s.x] += 1;
    }
    if (!columnsCount[s.y]) {
      columnsCount[s.y] = 1;
    } else {
      columnsCount[s.y] += 1;
    }
  }
  if (
    Object.values(rowsCount).includes(3) ||
    Object.values(columnsCount).includes(3)
  ) {
    return true;
  }

  let crossCount = 0;
  for (const s of states) {
    if (s.x === s.y) {
      crossCount++;
    }
  }
  if (crossCount === 3) return true;

  crossCount = 0;
  for (const s of states) {
    if (Number(s.x) + Number(s.y) === 4) {
      crossCount++;
    }
  }

  if (crossCount === 3) return true;

  return false;
}

function result() {
  const user1Winner = checkWinner(user1States);
  const user2Winner = checkWinner(user2States);
  if (user1Winner) {
    stopped = true;
    renderTurnMessage(`${user1} barande shoooooood`);
  } else if (user2Winner) {
    stopped = true;
    renderTurnMessage(`${user2} barande shoooooood`);
  }
}

function renderTurnMessage(message) {
  document.getElementById("message").innerText = !!message
    ? message
    : `${turn === 0 ? user1 : user2}'s turn`;
}
renderTurnMessage();

container.addEventListener("click", (event) => {
  if (stopped) return;
  if (!event.target.dataset.x || !event.target.dataset.y) return;
  const symbol = userSymbol[turn];
  const states = [...user1States, ...user2States];
  const exist = states.find(
    (el) =>
      Number(el.x) === Number(event.target.dataset.x) &&
      Number(el.y) === Number(event.target.dataset.y)
  );
  if (!!exist) return;
  if (turn === 0) {
    user1States.push(event.target.dataset);
    turn = 1;
  } else {
    user2States.push(event.target.dataset);
    turn = 0;
  }
  event.target.innerHTML = `<p class="xo">${symbol}</p>`;
  renderTurnMessage();
  result();
});

// console.log(document.querySelector(".cell").dataset);
