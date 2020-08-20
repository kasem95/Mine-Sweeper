let squares = [];
let width = 10;
let bombs = Array(20).fill("bomb");
console.log("bomb = " + bombs);
let empty = Array(80).fill("empty");
console.log("empty = " + empty);
let shuffledBombsWithEmptySquares = empty.concat(bombs).sort(() => {
  return Math.random() - 0.5;
});
console.log("shuffled = " + shuffledBombsWithEmptySquares);
const grid = document.querySelector(".Grid");

const settings = () => {
  for (let i = 0; i < width * width; i++) {
    console.log(i + " == " + shuffledBombsWithEmptySquares[i]);
    const square = new Square(shuffledBombsWithEmptySquares[i] === "bomb");
    square.makeElement(i, shuffledBombsWithEmptySquares[i]);
    grid.appendChild(square.getElement());
    squares.push(square);
    square.squareElement.onclick = () => click(i);
  }
  fillNumbers();
  let harvestBtn = document.getElementById("harvest");
  harvestBtn.style.backgroundColor = "red";
};

const harvestClicked = () => {
  let harvestBtn = document.getElementById("harvest");
  harvestBtn.style.backgroundColor = "red";
  let flagBtn = document.getElementById("flag");
  flagBtn.style.backgroundColor = "";
  for (let i = 0; i<squares.length; i++) {
    squares[i].squareElement.onclick = () => click(squares[i].id);
  } 
};

const flagClicked = () => {
  let flagBtn = document.getElementById("flag");
  flagBtn.style.backgroundColor = "red";
  let harvestBtn = document.getElementById("harvest");
  harvestBtn.style.backgroundColor = "";
  for (let i = 0; i<squares.length; i++) {
    squares[i].squareElement.onclick = () => markAsFlagged(squares[i].id);
  }
};

const fillNumbers = () => {
  let leftEdge;
  let rightEdge;
  let upperEdge;
  let downEdge;
  for (let i = 0; i < width * width; i++) {
    if (!squares[i].isBomb) {
      leftEdge = i % width === 0;
      rightEdge = i % width === 9;
      upperEdge = i < 10;
      downEdge = i > 89;
      if (!leftEdge && squares[i - 1].isBomb) squares[i].bombsSurround++;
      if (!rightEdge && squares[i + 1].isBomb) squares[i].bombsSurround++;
      if (!upperEdge && squares[i - 10].isBomb) squares[i].bombsSurround++;
      if (!downEdge && squares[i + 10].isBomb) squares[i].bombsSurround++;
      if (!leftEdge && !upperEdge && squares[i - 11].isBomb)
        squares[i].bombsSurround++;
      if (!rightEdge && !upperEdge && squares[i - 9].isBomb)
        squares[i].bombsSurround++;
      if (!leftEdge && !downEdge && squares[i + 9].isBomb)
        squares[i].bombsSurround++;
      if (!rightEdge && !downEdge && squares[i + 11].isBomb)
        squares[i].bombsSurround++;
    }
  }
};

const click = (id) => {
  if (!squares[id].isChecked && !squares[id].isFlaged) {
    console.log(id);
    if (!squares[id].isBomb) {
      if (squares[id].bombsSurround !== 0) {
        squares[id].isChecked = true;
        let elem = document.getElementById(id);
        elem.innerText = squares[id].bombsSurround;
        elem.style.backgroundColor = "#858481";
        if (elem.innerText === "1") {
          elem.style.color = "blue";
        } else if (elem.innerText === "2") {
          elem.style.color = "green";
        } else if (elem.innerText === "3") {
          elem.style.color = "red";
        } else if (elem.innerText === "4") {
          elem.style.color = "purple";
        } else if (elem.innerText === "5") {
          elem.style.color = "black";
        } else if (elem.innerText === "6") {
          elem.style.color = "maroon";
        } else if (elem.innerText === "7") {
          elem.style.color = "gray";
        } else if (elem.innerText === "8") {
          elem.style.color = "turquoise";
        }
        elem.onclick = "";
      } else {
        noBombsSurroundClick(id);
      }
    } else {
      for (let i = 0; i < width * width; i++) {
        squares[i].isChecked = true;
        let elem = document.getElementById(i);
        elem.innerText =
          squares[i].bombsSurround !== 0 ? squares[i].bombsSurround : "";
        if (elem.innerText === "1") {
          elem.style.color = "blue";
        } else if (elem.innerText === "2") {
          elem.style.color = "green";
        } else if (elem.innerText === "3") {
          elem.style.color = "red";
        } else if (elem.innerText === "4") {
          elem.style.color = "purple";
        } else if (elem.innerText === "5") {
          elem.style.color = "black";
        } else if (elem.innerText === "6") {
          elem.style.color = "maroon";
        } else if (elem.innerText === "7") {
          elem.style.color = "gray";
        } else if (elem.innerText === "8") {
          elem.style.color = "turquoise";
        } else if (squares[i].isBomb) {
          let bombElement = document.createElement("img");
          bombElement.src = "./images/bomb.jpg";
          bombElement.height = "44";
          bombElement.width = "44";
          bombElement.alt = "bomb";
          bombElement.style.backgroundColor = "red";
          elem.appendChild(bombElement);
        }
        elem.style.backgroundColor = "#858481";
        elem.onclick = "";
      }
      alert("BOOOOOOOOM");
    }
  }
};

const markAsFlagged = (id) => {
  if (!squares[id].isFlaged) {
    squares[id].isFlaged = true;
    let flagElement = document.createElement("img");
    flagElement.id = "flag" + id;
    flagElement.src = "./images/flag.png";
    flagElement.height = "44";
    flagElement.width = "44";
    flagElement.alt = "flag";
    flagElement.style.backgroundColor = "#e0ded7";
    document.getElementById(id).appendChild(flagElement);
  }else {
    squares[id].isFlaged = false;
    let flagElement = document.getElementById("flag" + id);
    document.getElementById(id).removeChild(flagElement);
  }
};

const noBombsSurroundClick = (id) => {
  if (!squares[id].isChecked && !squares[id].isFlaged) {
    setTimeout(() => {
      if (!squares[id].isBomb && squares[id].bombsSurround === 0) {
        squares[id].isChecked = true;
        let elem = document.getElementById(id);
        elem.style.backgroundColor = "#858481";
        elem.onclick = "";
        let leftEdge = id % width === 0;
        let rightEdge = id % width === 9;
        let upperEdge = id < 10;
        let downEdge = id > 89;

        if (!leftEdge) noBombsSurroundClick(id - 1);
        if (!rightEdge) noBombsSurroundClick(id + 1);
        if (!upperEdge) noBombsSurroundClick(id - 10);
        if (!downEdge) noBombsSurroundClick(id + 10);
        if (!leftEdge && !upperEdge) noBombsSurroundClick(id - 11);
        if (!rightEdge && !upperEdge) noBombsSurroundClick(id - 9);
        if (!leftEdge && !downEdge) noBombsSurroundClick(id + 9);
        if (!rightEdge && !downEdge) noBombsSurroundClick(id + 11);
      } else if (!squares[id].isBomb) {
        squares[id].isChecked = true;
        let elem = document.getElementById(id);
        elem.innerText = squares[id].bombsSurround;
        elem.style.backgroundColor = "#858481";
        if (elem.innerText === "1") {
          elem.style.color = "blue";
        } else if (elem.innerText === "2") {
          elem.style.color = "green";
        } else if (elem.innerText === "3") {
          elem.style.color = "red";
        } else if (elem.innerText === "4") {
          elem.style.color = "purple";
        } else if (elem.innerText === "5") {
          elem.style.color = "black";
        } else if (elem.innerText === "6") {
          elem.style.color = "maroon";
        } else if (elem.innerText === "7") {
          elem.style.color = "gray";
        } else if (elem.innerText === "8") {
          elem.style.color = "turquoise";
        }
        elem.onclick = "";
        return;
      } else {
        return;
      }
    });
  }
};
