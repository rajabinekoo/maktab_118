let depositBalance = 0;

let coffeeListTemplate = `
1. espresso - 2$
2. latte - 4$
3. cappuccino - 6$
`;
function calcPrice(item) {
  switch (item) {
    case 1:
      return 2;
    case 2:
      return 4;
    case 3:
      return 6;
  }
}

function charge() {
  let price = Number(prompt("Enter your price"));
  // validation
  if (price <= 0) {
    console.log("Invalid price amount");
    return;
  }
  let lowPrice = calcPrice(1);
  // validation
  if (price < lowPrice) {
    console.log("Invalid price amount");
    return;
  }
  depositBalance += price;
}

function checkBalance(price) {
  if (price > depositBalance) {
    console.log(
      "You have to charge your account.",
      "Insufficient funds",
      depositBalance
    );
    return false;
  }
  return true;
}

function buy() {
  console.log(coffeeListTemplate);
  console.log("Deposit balance:", depositBalance);
  let item = Number(prompt("Enter item number"));
  // validation
  if (item > 3 || item < 1) {
    console.log("Invalid item number");
    return;
  }
  let price = calcPrice(item);
  if (!price) {
    price = calcPrice(Math.floor(item));
  }
  if (!checkBalance(price)) return;
  depositBalance -= price;
  console.log("Here you are!");
  console.log(`${price} amount used, new balance: ${depositBalance}`);
}

while (true) {
  let mode = prompt("Enter your mode: (charge, buy)");

  if (mode === "charge") {
    charge();
  } else if (mode === "buy") {
    buy();
  }
}
