function createAiGrid() {
  let container = document.querySelector(".aiContainer");
  let num = 10; // to change and addapt it to gameboard hight

  document.documentElement.style.setProperty("--columns-row", num);

  for (let i = 0; i < num ** 2; i++) {
    let div = document.createElement("div");
    div.setAttribute("data-row", Math.floor(i / num));
    div.setAttribute("data-column", i % num);
    div.classList = "square";
    container.appendChild(div);
  }
}

module.exports = createAiGrid;
