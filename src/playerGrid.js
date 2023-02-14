function createPlayerGrid() {
  let container = document.querySelector(".playerContainer");
  let num = 10; // to change and addapt it to gameboard hight

  document.documentElement.style.setProperty("--columns-row", num);

  for (let i = 0; i < num ** 2; i++) {
    let div = document.createElement("div");
    div.classList = "square";
    div.setAttribute("data-row", Math.floor(i / num));
    div.setAttribute("data-column", i % num);
    container.appendChild(div);
  }
}

module.exports = createPlayerGrid;
