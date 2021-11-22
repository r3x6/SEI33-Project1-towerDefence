"use strict";

function makeSquare(type) {
  const square = document.createElement("div");
  square.className = "square";
  square.id = type;
  document.querySelector("#grounds").append(square);
}

function generateGrounds(len) {
  if (len % 2 !== 0) {
    for (let i = 0; i < len ** 2; i++) {
      if (i < len * Math.ceil(len / 2) && i >= len * Math.floor(len / 2)) {
        makeSquare("valley");
      } else {
        makeSquare();
      }
    }
    document.querySelector(".container").style.width = `${len * 54}px`;
  } else {
    alert("Please input an odd number!");
  }
}
generateGrounds(11);

const lit = (e) => {
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
