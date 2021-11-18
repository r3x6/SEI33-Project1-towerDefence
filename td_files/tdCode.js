"use strict";

function makeSquare() {
  const square = document.createElement("div");
  square.className = "square";
  square.id = "square";
  document.querySelector("#grounds").append(square);
}

function generateGrounds(num) {
  for (let i = 0; i < num; i++) {
    makeSquare();
  }
  document.querySelector(".container").style.width = `${Math.sqrt(num) * 54}px`;
}
generateGrounds(100);

const lit = (e) => {
  console.log(e.target);
  if (e.target.className === "square") {
    e.target.classList.add("lit");
  }
};
const unlit = (e) => {
  if (e.target.className === "square lit") {
    e.target.classList.remove("lit");
  }
};

document.getElementById("grounds").addEventListener("mouseover", lit);
document.getElementById("grounds").addEventListener("mouseout", unlit);
