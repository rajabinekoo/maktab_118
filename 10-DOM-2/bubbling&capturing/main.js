document.getElementById("div").addEventListener(
  "click",
  (e) => {
    // if (e.target.tagName !== "DIV") return;
    console.log("div", e.target.tagName);
  },
  { capture: true /* false -> bubbling | true -> capturing */ }
);

document.getElementById("button").addEventListener(
  "click",
  () => {
    console.log("button");
  }
  // { once: true }
);
