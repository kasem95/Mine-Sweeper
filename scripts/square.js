class Square {

  constructor(isbomb) {
    this.isBomb = isbomb;
    this.bombsSurround = 0;
    this.id = 0;
    this.className = "";
    this.squareElement = document.createElement("button");
    this.isChecked = false;
    this.isFlaged = false;
  }

  makeElement(id, className) {
    this.id = id;
    this.className = className;
    this.squareElement = document.createElement("button");
    this.squareElement.setAttribute("id", id);
    this.squareElement.setAttribute("class", className);
  }
  
  getElement() {
    return this.squareElement;
  }
}