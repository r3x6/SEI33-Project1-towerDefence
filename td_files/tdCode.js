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
        if (i === len * Math.floor(len / 2)) {
          makeSquare("endPt");
        } else if (i === len * Math.ceil(len / 2) - 1) {
          makeSquare("startPt");
        } else makeSquare("valley");
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

const rect = document.getElementById("startPt").getBoundingClientRect();

const spawnEnemy = () => {
  const enemy = document.createElement("div");
  enemy.className = "enemy";
  const enemyHp = document.createElement("div");
  enemyHp.className = "enemyHp";
  const enemyLostHp = document.createElement("div");
  enemyLostHp.className = "enemyLostHp";
  const enemySprite = document.createElement("div");
  enemySprite.className = "enemySprite";
  enemy.append(enemyHp);
  enemy.append(enemyLostHp);
  enemy.append(enemySprite);
  enemy.className = "mob";
  enemy.style.top = `${rect.y + 12}px`;
  enemy.style.left = `${rect.x + 15}px`;

  document.body.append(enemy);
};
spawnEnemy();
